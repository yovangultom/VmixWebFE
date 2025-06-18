import { useEffect, useState } from "react";
import useXML from "./useXML";

const useWaktuMatch = () => {
  const xml = useXML();

  const [waktuMatch, setWaktuMatch] = useState<string | null>(null);

  useEffect(() => {
    const xmlDoc = new DOMParser().parseFromString(xml, "text/xml");
    const waktuMatch =
      xmlDoc.querySelector(`text[name='${import.meta.env.VITE_WAKTU_MATCH_RESULT_TEXT}']`)
        ?.textContent ?? "";

    if (waktuMatch) {
      setWaktuMatch(waktuMatch);
    } else {
      setWaktuMatch(null);
    }

    return () => {};
  }, [xml]);

  return {
    waktuMatch,
    setWaktuMatch,
  };
};

export default useWaktuMatch;
