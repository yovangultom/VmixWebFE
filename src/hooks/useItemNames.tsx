import itemNames from "../lib/items.json";

const useItemNames = () => {
  return itemNames.map((item) => {
    return {
      label: item,
      value: item,
    };
  });
};

export default useItemNames;
