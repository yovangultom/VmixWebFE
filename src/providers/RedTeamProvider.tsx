import useXML from "@/hooks/useXML";
import { SelectedValue, Team } from "@/types/interfaces";
import { createContext, useContext, useEffect, useState } from "react";

type RedTeamContextType = {
  redTeam: Team | undefined;
  setRedTeam: (team: Team) => void;
  selectedRedTeam: SelectedValue | undefined;
  setSelectedRedTeam: (team: SelectedValue) => void;
};

const redTeamContext = createContext<RedTeamContextType>({} as RedTeamContextType);

const playersText = [
  "5THNICKKANAN.Text",
  "4THNICKKANAN.Text",
  "3RDNICKKANAN.Text",
  "2NDNICKKANAN.Text",
  "1STNICKKANAN.Text",
];

// eslint-disable-next-line react-refresh/only-export-components
export const useRedTeam = () => {
  return useContext(redTeamContext);
};

export const RedTeamProvider = ({ children }: { children: React.ReactNode }) => {
  const [redTeam, setRedTeam] = useState<Team>();
  const [selectedRedTeam, setSelectedRedTeam] = useState<SelectedValue>();

  const xml = useXML();

  useEffect(() => {
    if (!xml) return;

    const xmlDoc = new DOMParser().parseFromString(xml, "text/xml");

    const redTeamName =
      xmlDoc.querySelector(`text[name='${import.meta.env.VITE_RED_TEAM_TEXT}']`)?.textContent ?? "";

    const redTeamPlayers = playersText.map((playerText) => {
      return xmlDoc.querySelector(`text[name='${playerText}']`)?.textContent ?? "";
    });

    setSelectedRedTeam({
      value: redTeamName,
      label: redTeamName,
    });

    setRedTeam({
      id: 2,
      name: redTeamName,
      players: redTeamPlayers.map((player, index) => ({
        id: index + 1,
        name: player,
        teamId: 2,
      })),
    } as Team);

    return () => {};
  }, [xml, setSelectedRedTeam, setRedTeam]);

  return (
    <redTeamContext.Provider value={{ redTeam, setRedTeam, selectedRedTeam, setSelectedRedTeam }}>
      {children}
    </redTeamContext.Provider>
  );
};
