import { useLocalStorage } from "usehooks-ts";
import useXML from "./useXML";
import { useEffect } from "react";

const redColorScores = ["BO5KANAN.Fill.Color", "KANAN.Fill.Color", "BO3KANAN.Fill.Color"];

const blueColorScores = ["BO3KIRI.Fill.Color", "KIRI.Fill.Color", "BO5KIRI.Fill.Color"];

const defaultColorValue = "#C0C0C0";

const useScore = () => {
  const xml = useXML();

  const [scores, setScores] = useLocalStorage<{
    blue: number;
    red: number;
  }>("scores", {
    blue: 0,
    red: 0,
  });

  useEffect(() => {
    const xmlDoc = new DOMParser().parseFromString(xml, "text/xml");

    const blueScore = blueColorScores
      .map((value) => xmlDoc.querySelector(`color[name='${value}']`)?.textContent)
      .filter((value) => value !== defaultColorValue).length;

    const redScore = redColorScores
      .map((value) => xmlDoc.querySelector(`color[name='${value}']`)?.textContent)
      .filter((value) => value !== defaultColorValue).length;

    setScores({
      blue: blueScore,
      red: redScore,
    });

    return () => {};
  }, [setScores, xml]);

  return {
    scores,
    setScores,
  };
};

export default useScore;
