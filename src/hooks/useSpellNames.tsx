import spellNames from "../lib/spell.json";

const useSpellNames = () => {
  return spellNames.map((spell) => {
    return {
      label: spell,
      value: spell,
    };
  });
};

export default useSpellNames;
