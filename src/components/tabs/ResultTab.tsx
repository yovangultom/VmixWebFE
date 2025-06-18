import { TabsContent } from "@radix-ui/react-tabs";
import VersusText from "../VersusText";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import { cn, socketClient } from "@/lib/utils";
import useScore from "@/hooks/useScore";
import {
  sendChangePointKill,
  sendChangeScore,
  sendChangeWaktuMatch,
  sendSyncCommandGeneral,
} from "@/lib/commands/commands";
import { Button } from "../ui/button";
import { useBlueTeam } from "@/providers/BlueTeamProvider";
import { useRedTeam } from "@/providers/RedTeamProvider";
import useWaktuMatch from "@/hooks/useWaktuMatch";
import usePointKill from "@/hooks/usePointKill";

const blueTeamSide = (index: number): boolean => index === 0;

const ResultTab = () => {
  const { scores, setScores } = useScore();
  const { waktuMatch, setWaktuMatch } = useWaktuMatch();

  const { blueTeam, setBlueTeam, selectedBlueTeam, setSelectedBlueTeam } = useBlueTeam();
  const { redTeam, setRedTeam, selectedRedTeam, setSelectedRedTeam } = useRedTeam();

  const { pointKill, setPointKill } = usePointKill();

  const handleSwitchTeam = () => {
    if (selectedBlueTeam && selectedRedTeam) {
      setSelectedBlueTeam(selectedRedTeam);
      setSelectedRedTeam(selectedBlueTeam);

      if (blueTeam && redTeam) {
        setBlueTeam(redTeam);
        setRedTeam(blueTeam);
      }
    }
  };

  // TODO: pisahin comand ke folder commands
  const handleSync = () => {
    if (!socketClient.connected) return;

    sendSyncCommandGeneral(blueTeam, redTeam);
  };

  return (
    <TabsContent value="result">
      <div className="p-4 max-w-screen-md mx-auto text-center">
        <h1 className="text-2xl font-bold">Result</h1>
        <VersusText />
      </div>

      <section className="max-w-max mx-auto mt-6 flex gap-2">
        <Button className="mx-auto mt-2" onClick={handleSwitchTeam} variant="outline">
          Tukar
        </Button>
        <Button className="mx-auto mt-2" variant="default" onClick={handleSync}>
          Sync
        </Button>
      </section>

      {/* waktu */}
      <form
        className="max-w-max mx-auto mt-2"
        onSubmit={(e) => {
          e.preventDefault();
          sendChangeWaktuMatch(waktuMatch ?? "00:00");
        }}
      >
        <p className="text-center font-semibold">Waktu</p>
        <Input
          type="text"
          className="w-full p-2 border rounded"
          value={waktuMatch ?? ""}
          onChange={(e) => {
            setWaktuMatch(e.target.value);
          }}
        />
      </form>

      <form
        className="max-w-max mx-auto mt-2 flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          sendChangeScore(scores);
        }}
      >
        <div>
          <Label htmlFor="scoreBlue">Score Blue Team</Label>
          <Input
            type="number"
            className="w-full p-2 border rounded"
            value={scores?.blue || 0}
            max={3}
            min={0}
            onChange={(e) => {
              setScores({
                blue: Number(e.target.value),
                red: scores.red,
              });
            }}
          />
        </div>
        <div>
          <Label htmlFor="scoreRed">Score Red Team</Label>
          <Input
            type="number"
            className="w-full p-2 border rounded"
            value={scores?.red || 0}
            max={3}
            min={0}
            onChange={(e) => {
              setScores({
                blue: scores.blue,
                red: Number(e.target.value),
              });
            }}
          />
        </div>

        <button className="space-x-2 hidden"></button>
      </form>

      {/* point kill */}
      <div className="flex flex-col sm:flex-row justify-between sm:divide-x-2 max-w-screen-md  mx-auto">
        {Array.from({ length: 2 }).map((_, i) => (
          <section
            className={cn("flex-1 p-2", blueTeamSide(i) ? "" : "text-right")}
            key={`result-sectionTeam-${i}`}
          >
            <h2 className="text-lg font-semibold">{blueTeamSide(i) ? "Blue Team" : "Red Team"}</h2>

            <form
              className="mt-5"
              onSubmit={(e) => {
                e.preventDefault();
                sendChangePointKill(pointKill);
              }}
            >
              <Label htmlFor="scoreBlue">Point Kill</Label>
              <Input
                type="number"
                className="w-full p-2 border rounded"
                value={blueTeamSide(i) ? pointKill.blue : pointKill.red}
                onChange={(e) => {
                  setPointKill({
                    blue: blueTeamSide(i) ? Number(e.target.value) : pointKill.blue,
                    red: blueTeamSide(i) ? pointKill.red : Number(e.target.value),
                  });
                }}
              />
            </form>
          </section>
        ))}
      </div>
    </TabsContent>
  );
};

export default ResultTab;
