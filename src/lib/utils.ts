import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { io } from "socket.io-client";
import GeneralTab from "@/components/tabs/GeneralTab";
import DraftTab from "@/components/tabs/DraftTab";
import { InGameTab } from "@/components/tabs/InGameTab";
import { XMLParser } from "fast-xml-parser";
import PengaturanTab from "@/components/tabs/PengaturanTab";
import { vMixApiFunctionCommand } from "node-vmix";
import ResultTab from "@/components/tabs/ResultTab";
import MvpTab from "@/components/tabs/MvpTab";
import WaitingTab from "@/components/tabs/WaitingTab";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const socketClient = io(import.meta.env.VITE_SOCKETCLIENT, {});

export const xmlParser = new XMLParser();

export const sendVMixCommand = (
  command: string | string[] | vMixApiFunctionCommand | vMixApiFunctionCommand[],
) => {
  socketClient.emit("command", command);
};

export const tabs = [
  {
    value: "waiting",
    label: "Waiting",
    content: WaitingTab,
  },
  {
    value: "general",
    label: "General",
    content: GeneralTab,
  },
  {
    value: "draft",
    label: "Draft",
    content: DraftTab,
  },
  {
    value: "in-game",
    label: "In Game",
    content: InGameTab,
  },
  {
    value: "mvp",
    label: "MVP",
    content: MvpTab,
  },
  {
    value: "result",
    label: "Result",
    content: ResultTab,
  },
  {
    value: "pengaturan",
    label: "Pengaturan",
    content: PengaturanTab,
  },
];
