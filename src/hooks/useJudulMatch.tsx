import { useEffect, useState } from "react";
import useXML from "./useXML";

export const useJudulMatch = () => {
  const [judulMatch, setJudulMatch] = useState<string | null>(null);
  const xml = useXML();

  useEffect(() => {
    const xmlDoc = new DOMParser().parseFromString(xml, "text/xml");

    const judulMatch =
      xmlDoc.querySelector(`text[name='${import.meta.env.VITE_JUDUL_MATCH_TEXT}']`)?.textContent ??
      "";
    setJudulMatch(judulMatch);

    return () => {};
  }, [xml]);

  return [judulMatch, setJudulMatch] as const;
};
