import { useEffect, useState } from "react";
import useXML from "./useXML";

const useTextBerjalan = () => {
  const [textBerjalan, setTextBerjalan] = useState<string | null>(null);
  const xml = useXML();

  useEffect(() => {
    const xmlDoc = new DOMParser().parseFromString(xml, "text/xml");

    const judulMatch = xmlDoc.querySelector(`text[name='RUNNING TEKS.Text']`)?.textContent ?? "";
    setTextBerjalan(judulMatch);

    return () => {};
  }, [xml]);

  return [textBerjalan, setTextBerjalan] as const;
};

export default useTextBerjalan;
