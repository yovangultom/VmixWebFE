import useXML from "@/hooks/useXML";
import { SelectedValue, Team } from "@/types/interfaces";
import { createContext, useContext, useEffect, useState } from "react";

type BlueTeamContextType = {
  blueTeam: Team | undefined;
  setBlueTeam: (team: Team) => void;
  selectedBlueTeam: SelectedValue | undefined;
  setSelectedBlueTeam: (team: SelectedValue) => void;
};

const blueTeamContext = createContext<BlueTeamContextType>({} as BlueTeamContextType);

const playersText = [
  "1STNICKKIRI.Text",
  "2NDNICKKIRI.Text",
  "3RDNICKKIRI.Text",
  "4THNICKKIRI.Text",
  "5THNICKKIRI.Text",
];

// eslint-disable-next-line react-refresh/only-export-components
export const useBlueTeam = () => {
  return useContext(blueTeamContext);
};

export const BlueTeamProvider = ({ children }: { children: React.ReactNode }) => {
  const [blueTeam, setBlueTeam] = useState<Team>();
  const [selectedBlueTeam, setSelectedBlueTeam] = useState<SelectedValue>();

  const xml = useXML();

  useEffect(() => {
    if (!xml) return;

    const xmlDoc = new DOMParser().parseFromString(xml, "text/xml");

    const blueTeamName =
      xmlDoc.querySelector(`text[name='${import.meta.env.VITE_BLUE_TEAM_TEXT}']`)?.textContent ??
      "";

    const blueTeamPlayers = playersText.map((playerText) => {
      return xmlDoc.querySelector(`text[name='${playerText}']`)?.textContent ?? "";
    });

    setSelectedBlueTeam({
      value: blueTeamName,
      label: blueTeamName,
    });

    setBlueTeam({
      id: 1,
      name: blueTeamName,
      players: blueTeamPlayers.map((player, index) => ({
        id: index + 1,
        name: player,
        teamId: 1,
      })),
    } as Team);

    return () => {};
  }, [xml, setSelectedBlueTeam, setBlueTeam]);

  return (
    <blueTeamContext.Provider
      value={{
        blueTeam,
        setBlueTeam,
        selectedBlueTeam,
        setSelectedBlueTeam,
      }}
    >
      {children}
    </blueTeamContext.Provider>
  );
};
