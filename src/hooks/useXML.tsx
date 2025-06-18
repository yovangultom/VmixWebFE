import { useEffect } from "react";
import { socketClient } from "@/lib/utils";
import { useLocalStorage } from "usehooks-ts";

const useXML = () => {
  const [xml, setXml] = useLocalStorage("xml", "");

  useEffect(() => {
    socketClient.on("xml", (data) => {
      if (!data) return;
      if (data === xml) return;

      console.log("XML");
      setXml(data);
    });

    return () => {
      socketClient.off("xml");
    };
  }, [setXml, xml]);

  return xml;
};

export default useXML;
