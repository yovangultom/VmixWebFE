import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import useXML from "./useXML";
import { banVMixImageNames, sendClearBanHeroCommand } from "@/lib/commands/commands";
import useHeroNames from "./useHeroNames";

const useBanHeroes = () => {
  const xml = useXML();
  const heroNames = useHeroNames();

  const [blueBanHeroes, setBlueBanHeroes, clearBlueBanHeroes] = useLocalStorage<string[]>(
    "blueBanHeroes",
    [],
  );

  const [redBanHeroes, setRedBanHeroes, clearRedBanHeroes] = useLocalStorage<string[]>(
    "redBanHeroes",
    [],
  );

  const clearBanHeroes = () => {
    sendClearBanHeroCommand();

    clearBlueBanHeroes();
    clearRedBanHeroes();
  };

  function normalizeString(str) {
    return str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  }

  useEffect(() => {
    if (!xml) return;

    const xmlDoc = new DOMParser().parseFromString(xml, "text/xml");

    const banHeroNames = banVMixImageNames.map((banHero) => {
      const heroNameElement = xmlDoc.querySelector(`image[name='${banHero}']`);
      const heroName = heroNameElement?.textContent ?? "";
      if (!heroName) return "";

      return heroName.split("\\").pop()?.replace(".png", "") ?? "";
    });

    banHeroNames.forEach((banHeroName, index) => {
      if (!banHeroName) {
        if (index < 5) {
          setBlueBanHeroes((banHeroes) => {
            const newBanHeroes = [...banHeroes];
            newBanHeroes[index] = "";
            return newBanHeroes;
          });
        } else {
          setRedBanHeroes((banHeroes) => {
            const newBanHeroes = [...banHeroes];
            newBanHeroes[index - 5] = "";
            return newBanHeroes;
          });
        }
        return;
      }

      heroNames.map((hero) => {
        if (normalizeString(hero.value) === normalizeString(banHeroName)) {
          if (index < 5) {
            setBlueBanHeroes((banHeroes) => {
              const newBanHeroes = [...banHeroes];
              newBanHeroes[index] = hero.value;
              return newBanHeroes;
            });
          } else {
            setRedBanHeroes((banHeroes) => {
              const newBanHeroes = [...banHeroes];
              newBanHeroes[index - 5] = hero.value;
              return newBanHeroes;
            });
          }
        }
      });
    });
    return () => {};
  }, [xml]);

  return {
    blueBanHeroes,
    setBlueBanHeroes,
    redBanHeroes,
    setRedBanHeroes,
    clearBanHeroes,
  };
};

export default useBanHeroes;
