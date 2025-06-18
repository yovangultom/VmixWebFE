const role = ["EXP.png", "GOLD.png", "JUNGLE.png", "MID.png", "ROAM.png"];

const useRoleNames = () => {
  return role.map((role) => {
    return {
      value: role,
      label: role,
    };
  });
};

export default useRoleNames;
