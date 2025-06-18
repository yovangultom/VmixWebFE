import { cn, socketClient } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useContext, useState } from "react";
import { createContext } from "react";

interface DialogContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const DialogContext = createContext<DialogContextType>({
  open: false,
  setOpen: () => {},
});

export const TambahTeamDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Tambah Team</Button>
        </DialogTrigger>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>Tambah Team</DialogTitle>
            <DialogDescription>
              Masukan nama dan player tim yang ingin di masukan lorem
            </DialogDescription>
          </DialogHeader>
          <TeamForm />
        </DialogContent>
      </Dialog>
    </DialogContext.Provider>
  );
};

function TeamForm({ className }: React.ComponentProps<"form">) {
  // const [teams, setTeams] = useLocalStorage<Team[] | []>("teams", []);
  const { setOpen } = useContext<DialogContextType>(DialogContext);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    if (!formData.get("namaTim") || !formData.get("aliasTim")) {
      setOpen(false);
      return;
    }

    const namaTim = formData.get("namaTim") as string;
    const aliasTim = formData.get("aliasTim") as string;
    const players = Array.from(formData.keys())
      .filter((key) => key.startsWith("player"))
      .map((key) => formData.get(key));

    const newTeam = {
      name: namaTim,
      alias: aliasTim,
      players: players as string[],
    };

    socketClient.emit("addTeam", newTeam);

    form.reset();
    setOpen(false);
  };

  return (
    <form className={cn("grid items-start gap-4", className)} onSubmit={handleSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="namaTim">Nama Tim</Label>
        <Input name="namaTim" placeholder="Tim A" autoComplete="off" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="aliasTIM">Alias Tim</Label>
        <Input name="aliasTim" placeholder="TMA" autoComplete="off" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        {Array(6)
          .fill(null)
          .map((_, index) => (
            <div key={index}>
              <Label htmlFor={`player${index}`}>Player {index + 1}</Label>
              <Input
                name={`player${index}`}
                placeholder={`Player ${index + 1}`}
                autoComplete="off"
              />
            </div>
          ))}
      </div>
      <Button type="submit">Simpan</Button>
    </form>
  );
}
