import { useLocalStorage } from "usehooks-ts";
import useXML from "./useXML";
import useHeroNames from "./useHeroNames";
import { useEffect } from "react";
import { pickVMixImageNames, sendClearPickHeroCommand } from "@/lib/commands/commands";

const usePickHeroes = () => {
  const xml = useXML();
  const heroNames = useHeroNames();

  const [bluePickHeroes, setBluePickHeroes, clearBluePickHeroes] = useLocalStorage<string[]>(
    "bluePickHeroes",
    [],
  );

  const [redPickHeroes, setRedPickHeroes, clearRedPickHeroes] = useLocalStorage<string[]>(
    "redPickHeroes",
    [],
  );

  const clearPickHeroes = () => {
    sendClearPickHeroCommand();

    clearBluePickHeroes();
    clearRedPickHeroes();
  };

  function normalizeString(str) {
    return str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  }

  useEffect(() => {
    if (!xml) return;

    const xmlDoc = new DOMParser().parseFromString(xml, "text/xml");

    const pickHeroNames = pickVMixImageNames.map((pickHero) => {
      const heroNameElement = xmlDoc.querySelector(`image[name='${pickHero}']`);
      const heroName = heroNameElement?.textContent ?? "";
      if (!heroName) return "";

      return heroName.split("\\").pop()?.replace(".png", "") ?? "";
    });

    pickHeroNames.forEach((pickHeroName, index) => {
      if (!pickHeroName) {
        if (index < 5) {
          setRedPickHeroes((pickHeroes) => {
            const newPickHeroes = [...pickHeroes];
            newPickHeroes[index] = "";
            return newPickHeroes;
          });
        } else {
          setBluePickHeroes((pickHeroes) => {
            const newPickHeroes = [...pickHeroes];
            newPickHeroes[index - 5] = "";
            return newPickHeroes;
          });
        }

        return;
      }

      heroNames.map((hero) => {
        if (normalizeString(hero.value) === normalizeString(pickHeroName)) {
          if (index < 5) {
            setRedPickHeroes((pickHeroes) => {
              const newPickHeroes = [...pickHeroes];
              newPickHeroes[index] = hero.value;
              return newPickHeroes;
            });
          } else {
            setBluePickHeroes((pickHeroes) => {
              const newPickHeroes = [...pickHeroes];
              newPickHeroes[index - 5] = hero.value;
              return newPickHeroes;
            });
          }
        }
      });
    });
  }, [xml]);

  return {
    bluePickHeroes,
    setBluePickHeroes,
    redPickHeroes,
    setRedPickHeroes,
    clearPickHeroes,
  };
};

export default usePickHeroes;
