import { socketClient } from "@/lib/utils";
import { Team } from "@/types/interfaces";
import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";

const useTeams = () => {
  const [teams, setTeams, clearTeamsT] = useLocalStorage<Team[] | []>("teams", []);

  useEffect(() => {
    socketClient.on("teams", (data) => {
      setTeams(data);
    });

    return () => {
      socketClient.off("teams");
    };
  }, [setTeams]);

  const clearTeams = () => {
    socketClient.emit("deleteAllTeams");
    clearTeamsT();
  };

  return {
    teams,
    setTeams,
    clearTeams,
  };
};

export default useTeams;
