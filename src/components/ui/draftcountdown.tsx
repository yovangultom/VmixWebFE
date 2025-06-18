import { socketClient } from "@/lib/utils";
import { useEffect, useRef } from "react";

const DraftCountDown = () => {
  const countDownRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (socketClient.connected) {
      socketClient.on("countDownDraft", (data) => {
        if (countDownRef.current) {
          countDownRef.current.textContent = data;
        }
      });
    }

    return () => {
      socketClient.off("countDownDraft");
    };
  }, []);

  return (
    <p className="text-gray-500" ref={countDownRef}>
      00
    </p>
  );
};

export default DraftCountDown;
