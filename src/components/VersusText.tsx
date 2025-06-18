import { useBlueTeam } from "@/providers/BlueTeamProvider";
import { useRedTeam } from "@/providers/RedTeamProvider";

const VersusText = () => {
  const { blueTeam } = useBlueTeam();
  const { redTeam } = useRedTeam();

  return (
    <section className="max-w-max mx-auto space-x-3">
      <span>{blueTeam?.name || "Team Blue"}</span>
      <span>VS</span>
      <span>{redTeam?.name || "Red Team"}</span>
    </section>
  );
};

export default VersusText;
