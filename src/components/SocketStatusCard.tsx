import { useEffect } from "react";
import { useSocketStatus } from "../hooks/useSocketStatus";
import { cn, socketClient } from "@/lib/utils";
import { toast } from "sonner";

const SocketStatusCard = () => {
  const status = useSocketStatus();

  useEffect(() => {
    if (status) {
      toast.success("Connected to server");
    } else {
      toast.error("Disconnected from server");
    }

    return () => {
      toast.dismiss();
    };
  }, [status]);

  return (
    <div
      className="bg-white px-4 py-2 max-w-max mx-auto flex items-center gap-2 rounded-lg shadow cursor-pointer"
      onClick={(e) => {
        e.preventDefault();
        if (status) {
          socketClient.disconnect();
        } else {
          socketClient.connect();
        }
      }}
    >
      <span
        className={cn(
          "w-3 h-3 rounded-full absolute animate-ping",
          status ? "bg-green-600" : "bg-red-600",
        )}
      ></span>
      <div className={cn("w-3 h-3 rounded-full", status ? "bg-green-600" : "bg-red-600")}></div>
      {status ? "Connected" : "Disconnected"}
    </div>
  );
};

export default SocketStatusCard;
