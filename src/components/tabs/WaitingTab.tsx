import useTeams from "@/hooks/useTeams";
import { TabsContent } from "@radix-ui/react-tabs";
import Select from "react-select";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import useWaitingData from "@/hooks/useWaitingData";
import { sendWaitingImage, sendWaitingText } from "@/lib/commands/commands";

const WaitingTab = () => {
  const { teams } = useTeams();

  const [waitingData, setWaitingData] = useWaitingData();

  return (
    <TabsContent value="waiting">
      <div className="p-4 max-w-screen-md mx-auto text-center">
        <h1 className="text-2xl font-bold">Waiting</h1>
      </div>

      <section className="max-w-screen-md mx-auto">
        <h1 className="font-bold text-center">BRONZE MATCH</h1>
        <div className="flex gap-2">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="timBlue">Nama Kiri</Label>
            <Select
              placeholder="Nama Tim Blue"
              options={teams.map((team) => {
                return {
                  value: team.name,
                  label: team.name,
                };
              })}
              value={{
                value: waitingData.bronzeKiri,
                label: waitingData.bronzeKiri,
              }}
              onChange={(e) => {
                setWaitingData((prev) => {
                  return {
                    ...prev,
                    bronzeKiri: e?.value as string,
                  };
                });

                sendWaitingImage(e?.value, "LOGOKIRIBRONZE.Source");
              }}
            />
          </div>
          <div className="text-center">
            <Label htmlFor="vsbronze">VS TEXT</Label>
            <Input
              type="text"
              autoComplete="off"
              name="vsbronze"
              className="w-full p-2 border rounded"
              value={waitingData.vsBronze}
              onChange={(e) => {
                setWaitingData((prev) => {
                  return {
                    ...prev,
                    vsBronze: e.target.value,
                  };
                });

                sendWaitingText(e.target.value, "VS BRONZE.Text");
              }}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 text-right">
            <Label htmlFor="timBlue">Nama Kiri</Label>
            <Select
              placeholder="Nama Tim Blue"
              options={teams.map((team) => {
                return {
                  value: team.name,
                  label: team.name,
                };
              })}
              value={{
                value: waitingData.bronzeKanan,
                label: waitingData.bronzeKanan,
              }}
              onChange={(e) => {
                setWaitingData((prev) => {
                  return {
                    ...prev,
                    bronzeKanan: e?.value as string,
                  };
                });

                sendWaitingImage(e?.value, "LOGOKANANBRONZE.Source");
              }}
            />
          </div>
        </div>
      </section>
      <section className="max-w-screen-md mx-auto mt-5">
        <h1 className="font-bold text-center">GRAND FINAL</h1>
        <div className="flex gap-2">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="timBlue">Nama Kiri</Label>
            <Select
              placeholder="Nama Tim Blue"
              options={teams.map((team) => {
                return {
                  value: team.name,
                  label: team.name,
                };
              })}
              value={{
                value: waitingData.finalKiri,
                label: waitingData.finalKiri,
              }}
              onChange={(e) => {
                setWaitingData((prev) => {
                  return {
                    ...prev,
                    finalKiri: e?.value as string,
                  };
                });

                sendWaitingImage(e?.value, "LOGOKIRIFINAL.Source");
              }}
            />
          </div>
          <div className="text-center">
            <Label htmlFor="vsbronze">VS TEXT</Label>
            <Input
              type="text"
              autoComplete="off"
              name="vsbronze"
              className="w-full p-2 border rounded"
              value={waitingData.vsFinal}
              onChange={(e) => {
                setWaitingData((prev) => {
                  return {
                    ...prev,
                    vsFinal: e.target.value,
                  };
                });

                sendWaitingText(e.target.value, "VS FINAL.Text");
              }}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5 text-right">
            <Label htmlFor="timBlue">Nama Kiri</Label>
            <Select
              placeholder="Nama Tim Blue"
              options={teams.map((team) => {
                return {
                  value: team.name,
                  label: team.name,
                };
              })}
              value={{
                value: waitingData.finalKanan,
                label: waitingData.finalKanan,
              }}
              onChange={(e) => {
                setWaitingData((prev) => {
                  return {
                    ...prev,
                    finalKanan: e?.value as string,
                  };
                });

                sendWaitingImage(e?.value, "LOGOKANANFINAL.Source");
              }}
            />
          </div>
        </div>

        <div className="w-[200px] mt-5">
          <Label htmlFor="vsbronze">START IN</Label>
          <Input
            type="text"
            autoComplete="off"
            name="vsbronze"
            className="w-full p-2 border rounded"
            value={waitingData.startIn}
            onChange={(e) => {
              setWaitingData((prev) => {
                return {
                  ...prev,
                  startIn: e.target.value,
                };
              });

              sendWaitingText(e.target.value, "STARTIN.Text");
            }}
          />
        </div>

        <div className="w-[200px] mt-5">
          <Label htmlFor="vsbronze">COUNTDOWN</Label>
          <Input
            type="text"
            autoComplete="off"
            name="vsbronze"
            className="w-full p-2 border rounded"
            value={waitingData.waktu}
            onChange={(e) => {
              setWaitingData((prev) => {
                return {
                  ...prev,
                  waktu: e.target.value,
                };
              });

              sendWaitingText(e.target.value, "COUNTDOWN.Text");
            }}
          />
        </div>
      </section>
    </TabsContent>
  );
};

export default WaitingTab;
