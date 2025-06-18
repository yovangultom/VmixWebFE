import { TabsContent } from "@/components/ui/tabs";
import DraftCountDown from "../ui/draftcountdown";
import { cn } from "@/lib/utils";
import VersusText from "../VersusText";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import useTurtle from "@/hooks/useTurtle";
import { sendSwitchPickHeroCommand, sendTurtleCommand } from "@/lib/commands/commands";
import { DndContext } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import usePickHeroes from "@/hooks/usePickHeroes";
import Sortable from "../Sortable";
import { Card, CardContent, CardDescription } from "../ui/card";
import { Button } from "../ui/button";

const blueTeam = (index: number): boolean => index === 0;

const handleDragEnd = (event, setter) => {
  const { active, over } = event;

  if (active.id !== over.id) {
    setter((players) => {
      const o = players.indexOf(active.id);
      const n = players.indexOf(over.id);

      return arrayMove(players, o, n);
    });
  }
};

export const InGameTab = () => {
  const [turtle, setTurtle] = useTurtle();
  const { bluePickHeroes, redPickHeroes, setBluePickHeroes, setRedPickHeroes } = usePickHeroes();

  return (
    <TabsContent value="in-game">
      <div className="p-4 max-w-screen-md mx-auto text-center">
        <h1 className="text-2xl font-bold">In Game</h1>
        <VersusText />
        <DraftCountDown />
      </div>

      <div className="flex flex-col sm:flex-row justify-between sm:divide-x-2 max-w-screen-md  mx-auto">
        {Array.from({ length: 2 }).map((_, i) => (
          <section
            className={cn("flex-1 p-2", blueTeam(i) ? "" : "text-right")}
            key={`sectionTeam-${i}`}
          >
            <h2 className="text-lg font-semibold">{blueTeam(i) ? "Blue Team" : "Red Team"}</h2>

            <div className="mt-5">
              <Label htmlFor="scoreBlue">Point Kill</Label>
              <Input type="number" className="w-full p-2 border rounded" />
            </div>
            <div className="mt-5">
              <Label htmlFor="scoreBlue">Gold</Label>
              <Input type="number" className="w-full p-2 border rounded" />
            </div>
            <div className="mt-5">
              <Label htmlFor="scoreBlue">Turret</Label>
              <Input type="number" className="w-full p-2 border rounded" />
            </div>
            <div className="mt-5">
              <Label htmlFor="scoreBlue">Lord</Label>
              <Input type="number" className="w-full p-2 border rounded" />
            </div>
            <form
              className="mt-5"
              onSubmit={(e) => {
                e.preventDefault();

                sendTurtleCommand(
                  blueTeam(i) ? "blue" : "red",
                  blueTeam(i) ? turtle.blue : turtle.red,
                );
              }}
            >
              <Label htmlFor="scoreBlue">Turtle</Label>
              <Input
                type="number"
                className="w-full p-2 border rounded"
                value={blueTeam(i) ? turtle.blue : turtle.red}
                onChange={(e) => {
                  setTurtle({
                    blue: blueTeam(i) ? parseInt(e.target.value, 10) : turtle.blue,
                    red: blueTeam(i) ? turtle.red : parseInt(e.target.value, 10),
                  });
                }}
              />
            </form>
          </section>
        ))}
      </div>

      <h1 className="text-center mt-5 mb-2">URUTAN ITEM HERO</h1>

      <div className="max-w-screen-sm mx-auto flex justify-center items-center my-2">
        <Button
          onClick={() => {
            sendSwitchPickHeroCommand(bluePickHeroes, redPickHeroes);
          }}
        >
          Save
        </Button>
      </div>

      <div className="flex gap-2  justify-center items-start max-w-screen-sm mx-auto mb-10">
        <DndContext onDragEnd={(e) => handleDragEnd(e, setBluePickHeroes)}>
          <SortableContext items={bluePickHeroes || []}>
            <div className={cn("bg-zinc-200 rounded-lg p-2 grid grid-row-5 gap-1")}>
              {bluePickHeroes?.map((player, index) => (
                <Sortable key={player + index} id={player}>
                  <Card className="rounded-md h-full">
                    <CardContent className="p-2">
                      <CardDescription>{player}</CardDescription>
                    </CardContent>
                  </Card>
                </Sortable>
              ))}
            </div>
          </SortableContext>
        </DndContext>
        <DndContext onDragEnd={(e) => handleDragEnd(e, setRedPickHeroes)}>
          <SortableContext items={redPickHeroes || []}>
            <div className={cn("bg-zinc-200 rounded-lg p-2 grid grid-row-5 gap-1 ")}>
              {redPickHeroes?.map((player, index) => (
                <Sortable key={player + index} id={player}>
                  <Card className="rounded-md h-full">
                    <CardContent className="p-2">
                      <CardDescription>{player}</CardDescription>
                    </CardContent>
                  </Card>
                </Sortable>
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </TabsContent>
  );
};
