import { Label } from "@radix-ui/react-label";
import { TabsContent } from "@radix-ui/react-tabs";
import { Input } from "../ui/input";
import useMVP from "@/hooks/useMVP";
import useHeroNames from "@/hooks/useHeroNames";
import Select from "react-select";
import { useEffect, useState } from "react";
import { useBlueTeam } from "@/providers/BlueTeamProvider";
import { useRedTeam } from "@/providers/RedTeamProvider";
import { SelectedValue } from "@/types/interfaces";
import { itemImageNames, sendChangeMVP, sendChangeMVPImage } from "@/lib/commands/commands";
import SelectItem from "../SelectItem";
import useItemNames from "@/hooks/useItemNames";
import useSpellNames from "@/hooks/useSpellNames";
import useEmblemNames from "@/hooks/useEmblemNames";
import useRoleNames from "@/hooks/useRoleNames";

const MvpTab = () => {
  const { mvpData, setMvpData } = useMVP();
  const heroNames = useHeroNames();
  const itemNames = useItemNames();
  const spellNames = useSpellNames();
  const emblemNames = useEmblemNames();
  const roleNames = useRoleNames();

  const { blueTeam } = useBlueTeam();
  const { redTeam } = useRedTeam();

  const [options, setOptions] = useState<{
    timOptions: SelectedValue[];
    nickOptions: SelectedValue[];
  }>({
    timOptions: [],
    nickOptions: [],
  });

  const [selectedHero, setSelectedHero] = useState({
    label: "",
    value: "",
  });

  useEffect(() => {
    if (!mvpData.hero) return;

    const hero = heroNames.find((hero) => hero.value === mvpData.hero);

    if (hero) {
      setSelectedHero(hero);
    }

    return () => {
      setSelectedHero({
        label: "",
        value: "",
      });
    };
  }, [mvpData]);

  useEffect(() => {
    if (!blueTeam || !redTeam) return;

    const redTeamOptions = redTeam.players.map((player) => ({
      label: player.name,
      value: player.name,
    }));

    const blueTeamOptions = blueTeam.players.map((player) => ({
      label: player.name,
      value: player.name,
    }));

    setOptions((prev) => {
      return {
        ...prev,
        timOptions: [
          { label: blueTeam.name, value: blueTeam.name },
          { label: redTeam.name, value: redTeam.name },
        ],
        nickOptions: [...blueTeamOptions, ...redTeamOptions] as { label: string; value: string }[],
      };
    });
  }, [blueTeam, redTeam]);

  return (
    <TabsContent value="mvp">
      <div className="p-4 max-w-screen-md mx-auto text-center">
        <h1 className="text-2xl font-bold">MVP</h1>
      </div>

      <section className="max-w-screen-sm mx-auto space-y-2">
        <div className="flex flex-col">
          <Label htmlFor="hero">TIM</Label>
          <Select
            placeholder="Nama Tim"
            options={options.timOptions}
            value={{
              label: mvpData.selectedTeam,
              value: mvpData.selectedTeam,
            }}
            onChange={(e) => {
              setMvpData({
                ...mvpData,
                selectedTeam: e?.value as string,
              });

              sendChangeMVPImage(e?.value as string, "LOGOTIM.Source", "tim");
            }}
          />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="hero">NICKNAME</Label>
          <Select
            placeholder="Nama Tim Blue"
            options={options.nickOptions}
            value={{
              label: mvpData.nickname,
              value: mvpData.nickname,
            }}
            onChange={(e) => {
              //   console.log(e);
              setMvpData({
                ...mvpData,
                nickname: e?.value as string,
              });

              sendChangeMVP(e?.value as string, "NICKNAME.Text");
            }}
          />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="hero">ROLE</Label>
          <Select
            placeholder="Nama Tim Blue"
            options={roleNames}
            value={{
              label: mvpData.role,
              value: mvpData.role,
            }}
            onChange={(e) => {
              //   console.log(e);
              setMvpData({
                ...mvpData,
                role: e?.value as string,
              });

              sendChangeMVPImage(e?.value as string, "ROLE.Source", "role");
            }}
          />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="hero">HERO</Label>
          <Select
            placeholder="Hero MVP"
            options={heroNames}
            value={selectedHero}
            onChange={(e) => {
              setMvpData({
                ...mvpData,
                hero: e?.value as string,
              });

              sendChangeMVPImage(e?.value as string, "HERO.Source", "hero");
            }}
          />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendChangeMVP(mvpData.dmg, "DAMAGE.Text");
          }}
        >
          <Label htmlFor={`dmg`}>DMG DEALT</Label>
          <Input
            type="text"
            autoComplete="off"
            id="dmg"
            name="dmg"
            value={mvpData.dmg || ""}
            onChange={(e) => {
              setMvpData({
                ...mvpData,
                dmg: e.target.value,
              });
            }}
            className="w-full p-2 border rounded"
          />
          <button className="hidden"></button>
        </form>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendChangeMVP(mvpData.gold, "GOLD.Text");
          }}
        >
          <Label htmlFor="GOLD">GOLD</Label>
          <Input
            type="text"
            autoComplete="off"
            id="GOLD"
            name="GOLD"
            value={mvpData.gold || ""}
            className="w-full p-2 border rounded"
            onChange={(e) => {
              setMvpData({
                ...mvpData,
                gold: e.target.value,
              });
            }}
          />
          <button className="hidden"></button>
        </form>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendChangeMVP(mvpData.kda, "KDA.Text");
          }}
        >
          <Label htmlFor="KDA">KDA</Label>
          <Input
            type="text"
            autoComplete="off"
            id="KDA"
            name="KDA"
            value={mvpData.kda || ""}
            className="w-full p-2 border rounded"
            onChange={(e) => {
              setMvpData({
                ...mvpData,
                kda: e.target.value,
              });
            }}
          />
          <button className="hidden"></button>
        </form>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendChangeMVP(mvpData.teamfight, "TEAMFIGHT.Text");
          }}
        >
          <Label htmlFor="TEAMFIGHT">TEAM FIGHT</Label>
          <Input
            type="text"
            autoComplete="off"
            id="TEAMFIGHT"
            name="TEAMFIGHT"
            value={mvpData.teamfight || ""}
            className="w-full p-2 border rounded"
            onChange={(e) => {
              setMvpData({
                ...mvpData,
                teamfight: e.target.value,
              });
            }}
          />

          <button className="hidden"></button>
        </form>

        <p className="mt-4">BUILD</p>
        <section className="flex gap-2">
          <div className="flex-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex flex-col">
                <Label htmlFor={`item${i}`}>Item {i + 1}</Label>
                <SelectItem
                  value={mvpData.item[i]}
                  setValue={(value) => {
                    setMvpData({
                      ...mvpData,
                      item: mvpData.item.map((item, index) => (index === i ? value : item)),
                    });

                    sendChangeMVPImage(value, itemImageNames[i], "item");
                  }}
                  options={itemNames}
                />
              </div>
            ))}
          </div>
          <div className="flex-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex flex-col">
                <Label htmlFor={`item${i + 4}`}>Item {i + 4}</Label>
                <SelectItem
                  value={mvpData.item[i + 3]}
                  setValue={(value) => {
                    setMvpData({
                      ...mvpData,
                      item: mvpData.item.map((item, index) => (index === i + 3 ? value : item)),
                    });

                    sendChangeMVPImage(value, itemImageNames[i + 3], "item");
                  }}
                  options={itemNames}
                />
              </div>
            ))}
          </div>
        </section>

        <div className="flex flex-col">
          <Label htmlFor="spell">SPELL</Label>
          <Select
            placeholder="SPELL"
            options={spellNames}
            value={{
              label: mvpData.spell,
              value: mvpData.spell,
            }}
            onChange={(e) => {
              setMvpData({
                ...mvpData,
                spell: e?.value as string,
              });

              sendChangeMVPImage(e?.value as string, "SPELL.Source", "spell");
            }}
          />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="emblem">EMBLEM</Label>
          <Select
            placeholder="EMBLEM"
            options={emblemNames}
            value={{
              label: mvpData.emblem,
              value: mvpData.emblem,
            }}
            onChange={(e) => {
              setMvpData({
                ...mvpData,
                emblem: e?.value as string,
              });
              sendChangeMVPImage(e?.value as string, "EMBLEM.Source", "emblem");
            }}
          />
        </div>
      </section>
    </TabsContent>
  );
};

export default MvpTab;
