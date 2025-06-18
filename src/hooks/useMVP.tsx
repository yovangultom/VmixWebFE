import { useEffect, useState } from "react";
import useXML from "./useXML";
import useHeroNames from "./useHeroNames";
import { itemImageNames } from "@/lib/commands/commands";

interface MVPData {
  selectedTeam: string;
  nickname: string;
  role: string;
  hero: string;
  dmg: string;
  kda: string;
  gold: string;
  teamfight: string;
  spell: string;
  emblem: string;
  item: string[];
}

const useMVP = () => {
  const xml = useXML();

  const heroNames = useHeroNames();

  const [mvpData, setMvpData] = useState<MVPData>({
    selectedTeam: "",
    nickname: "",
    role: "",
    hero: "",
    dmg: "",
    kda: "",
    gold: "",
    teamfight: "",
    spell: "",
    emblem: "",
    item: [],
  });

  function normalizeString(str) {
    return str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  }

  useEffect(() => {
    if (!xml) return;

    const xmlDoc = new DOMParser().parseFromString(xml, "text/xml");

    let mvpHeroName = xmlDoc.querySelector(`image[name='HERO.Source']`)?.textContent ?? "";

    mvpHeroName = mvpHeroName.split("\\").pop()?.replace(".png", "") ?? "";

    heroNames.map((hero) => {
      if (normalizeString(hero.value) === normalizeString(mvpHeroName)) {
        setMvpData({
          ...mvpData,
          hero: hero.label,
        });
      }
    });

    const items = itemImageNames.map((item) => {
      const itemElement = xmlDoc.querySelector(`image[name='${item}']`);
      const itemName = itemElement?.textContent ?? "";
      if (!itemName) return "";

      return itemName.split("\\").pop() ?? "";
    });

    setMvpData((prev) => {
      return {
        ...prev,
        item: items,
      };
    });

    const spellName = xmlDoc.querySelector(`image[name='SPELL.Source']`)?.textContent ?? "";

    setMvpData((prev) => {
      return {
        ...prev,
        spell: spellName.split("\\").pop() ?? "",
      };
    });

    const emblemName = xmlDoc.querySelector(`image[name='EMBLEM.Source']`)?.textContent ?? "";

    setMvpData((prev) => {
      return {
        ...prev,
        emblem: emblemName.split("\\").pop() ?? "",
      };
    });

    const teamName = xmlDoc.querySelector(`image[name='LOGOTIM.Source']`)?.textContent ?? "";

    setMvpData((prev) => {
      return {
        ...prev,
        selectedTeam: teamName.split("\\").pop() ?? "",
      };
    });

    const roleName = xmlDoc.querySelector(`image[name='ROLE.Source']`)?.textContent ?? "";

    setMvpData((prev) => {
      return {
        ...prev,
        role: roleName.split("\\").pop() ?? "",
      };
    });

    setMvpData((prev) => {
      return {
        ...prev,
        nickname: xmlDoc.querySelector(`text[name='NICKNAME.Text']`)?.textContent ?? "",
        dmg: xmlDoc.querySelector(`text[name='DAMAGE.Text']`)?.textContent ?? "",
        gold: xmlDoc.querySelector(`text[name='GOLD.Text']`)?.textContent ?? "",
        kda: xmlDoc.querySelector(`text[name='KDA.Text']`)?.textContent ?? "",
        teamfight: xmlDoc.querySelector(`text[name='TEAMFIGHT.Text']`)?.textContent ?? "",
      };
    });

    return () => {};
  }, [xml]);

  return {
    mvpData,
    setMvpData,
  };
};

export default useMVP;
