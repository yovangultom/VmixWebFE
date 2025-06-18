import { useEffect, useState } from "react";
import useXML from "./useXML";

const usePointKill = () => {
  const xml = useXML();

  const [pointKill, setPointKill] = useState<{ blue: number; red: number }>({ blue: 0, red: 0 });

  useEffect(() => {
    const xmlDoc = new DOMParser().parseFromString(xml, "text/xml");
    const bluePointKill = parseInt(
      xmlDoc.querySelector(`text[name='skor kiri.Text']`)?.textContent ?? "0",
    );
    const redPointKill = parseInt(
      xmlDoc.querySelector(`text[name='skor kanan.Text']`)?.textContent ?? "0",
    );
    setPointKill({ blue: bluePointKill, red: redPointKill });

    return () => {};
  }, [xml]);

  return {
    pointKill,
    setPointKill,
  };
};

export default usePointKill;
