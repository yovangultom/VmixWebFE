import { socketClient } from "@/lib/utils";
import { useEffect, useState } from "react";

export const useSocketStatus = () => {
  const [status, setStatus] = useState<boolean>(socketClient.connected);

  useEffect(() => {
    socketClient.on("connect", () => {
      setStatus(socketClient.connected);
      console.log("Connected to server");
    });

    socketClient.on("disconnect", () => {
      setStatus(socketClient.connected);
      console.log("Disconnected from server");
    });

    return () => {
      socketClient.off("connect");
      socketClient.off("disconnect");
    };
  }, [setStatus]);

  return status;
};
