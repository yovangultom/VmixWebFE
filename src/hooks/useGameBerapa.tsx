import { useEffect, useState } from "react";
import useXML from "./useXML";

const useGameBerapa = () => {
  const [gameBerapa, setGameBerapa] = useState<string | null>(null);
  const xml = useXML();

  useEffect(() => {
    const xmlDoc = new DOMParser().parseFromString(xml, "text/xml");

    const judulMatch = xmlDoc.querySelector(`text[name='game.Text']`)?.textContent ?? "";
    setGameBerapa(judulMatch);

    return () => {};
  }, [xml]);

  return [gameBerapa, setGameBerapa] as const;
};

export default useGameBerapa;
