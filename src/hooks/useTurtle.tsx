import { useEffect, useState } from "react";
import useXML from "./useXML";

const useTurtle = () => {
  const [turtle, setTurtle] = useState({
    blue: 0,
    red: 0,
  });

  const xml = useXML();

  useEffect(() => {
    const xmlDoc = new DOMParser().parseFromString(xml, "text/xml");

    setTurtle({
      blue: parseInt(xmlDoc.querySelector(`text[name='turtlekiri.Text']`)?.textContent ?? "0", 10),
      red: parseInt(xmlDoc.querySelector(`text[name='turtle kanan.Text']`)?.textContent ?? "0", 10),
    });

    return () => {};
  }, [xml]);

  return [turtle, setTurtle] as const;
};

export default useTurtle;
