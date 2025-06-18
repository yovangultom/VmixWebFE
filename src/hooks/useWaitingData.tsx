import { useEffect, useState } from "react";
import useXML from "./useXML";

const useWaitingData = () => {
  const [waitingData, setWaitingData] = useState({
    bronzeKiri: "",
    bronzeKanan: "",
    vsBronze: "",
    finalKiri: "",
    finalKanan: "",
    vsFinal: "",
    startIn: "",
    waktu: "",
  });

  const xml = useXML();

  useEffect(() => {
    if (!xml) return;

    const xmlDoc = new DOMParser().parseFromString(xml, "text/xml");

    const bronzeKiri =
      xmlDoc.querySelector(`image[name='LOGOKIRIBRONZE.Source']`)?.textContent ?? "";

    const bronzeKanan =
      xmlDoc.querySelector(`image[name='LOGOKANANBRONZE.Source']`)?.textContent ?? "";

    const vsBronze = xmlDoc.querySelector(`text[name='VS BRONZE.Text']`)?.textContent ?? "";

    const finalKiri = xmlDoc.querySelector(`image[name='LOGOKIRIFINAL.Source']`)?.textContent ?? "";

    const finalKanan =
      xmlDoc.querySelector(`image[name='LOGOKANANFINAL.Source']`)?.textContent ?? "";

    const vsFinal = xmlDoc.querySelector(`text[name='VS FINAL.Text']`)?.textContent ?? "";

    const startIn = xmlDoc.querySelector(`text[name='STARTIN.Text']`)?.textContent ?? "";

    // const waktu = xmlDoc.querySelector(`text[name='COUNTDOWN.Text']`)?.textContent ?? "";

    setWaitingData((prev) => {
      return {
        ...prev,
        bronzeKiri: bronzeKiri.split("\\").pop() ?? "",
        bronzeKanan: bronzeKanan.split("\\").pop() ?? "",
        vsBronze,
        finalKiri: finalKiri.split("\\").pop() ?? "",
        finalKanan: finalKanan.split("\\").pop() ?? "",
        vsFinal,
        startIn,
        // waktu,
      };
    });

    return () => {};
  }, [xml]);

  return [waitingData, setWaitingData] as const;
};

export default useWaitingData;
