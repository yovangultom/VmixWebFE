import heroNames from "../lib/heroNames.json";

const useHeroNames = () => {
  return heroNames.map((hero) => {
    return {
      label: hero.name,
      value: hero.name,
    };
  });
};

export default useHeroNames;
