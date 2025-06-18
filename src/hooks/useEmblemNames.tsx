const emblems = [
  "Custom Assassin Emblem.png",
  "Custom Fighter Emblem.png",
  "Custom Mage Emblem.png",
  "Custom Marksman Emblem.png",
  "Custom Support Emblem.png",
  "Custom Tank Emblem.png",
  "Basic Common Emblem.png",
];

const useEmblemNames = () => {
  return emblems.map((e) => {
    return {
      label: e,
      value: e,
    };
  });
};

export default useEmblemNames;
