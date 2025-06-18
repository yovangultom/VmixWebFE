import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import SocketStatusCard from "./components/SocketStatusCard";
import { socketClient, tabs } from "./lib/utils";
import { useLocalStorage } from "usehooks-ts";
import { useEffect } from "react";
import { toast } from "sonner";
import { BlueTeamProvider } from "./providers/BlueTeamProvider";
import { RedTeamProvider } from "./providers/RedTeamProvider";

const App = () => {
  const [activeTab, setActiveTab] = useLocalStorage("activeTab", "general");

  useEffect(() => {
    socketClient.on("function", (data) => {
      toast.info(data);
    });

    return () => {
      socketClient.off("function");
    };
  }, []);

  return (
    <div className="bg-zinc-100 min-h-screen p-2">
      <SocketStatusCard />
      <BlueTeamProvider>
        <RedTeamProvider>
          <Tabs
            defaultValue={activeTab ?? "general"}
            onValueChange={setActiveTab}
            className="w-full bg-white p-4 mt-2 rounded-lg shadow"
          >
            <div className="mx-auto max-w-max">
              <TabsList>
                {tabs.map((tab) => (
                  <TabsTrigger key={tab.value} value={tab.value}>
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
            {tabs.map((tab) => {
              const TabContent = tab.content ? tab.content : () => null;
              return <TabContent key={tab.value} />;
            })}
          </Tabs>
        </RedTeamProvider>
      </BlueTeamProvider>
    </div>
  );
};

export default App;
