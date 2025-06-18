import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { TabsContent } from "../ui/tabs";
import { TambahTeamDialog } from "../dialogs/TambahTeamDialog";
import useTeams from "@/hooks/useTeams";
import { Button } from "../ui/button";

const PengaturanTab = () => {
  const { teams, clearTeams } = useTeams();

  return (
    <TabsContent value="pengaturan">
      <div className="p-4 max-w-screen-md mx-auto">
        <h1 className="text-2xl font-bold text-center">Pengaturan</h1>

        <h2 className="text-xl font-bold">Daftar Tim</h2>
      </div>
      <section className="max-w-screen-xl border p-2 rounded-lg mx-auto">
        <div className="flex items-center justify-end gap-1">
          <Button onClick={clearTeams} variant="destructive">
            Hapus Semua Tim
          </Button>
          <TambahTeamDialog />
        </div>
        <Table>
          <TableCaption>Daftar Tim</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[10px]">No</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Alias</TableHead>
              {Array.from({ length: 6 }).map((_, index) => (
                <TableHead key={index}>Player {index + 1}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {teams.length > 0 ? (
              teams.map((team, index) => (
                <TableRow key={team.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{team.name}</TableCell>
                  <TableCell>{team.alias}</TableCell>
                  {team?.players?.map((player, index) => (
                    <TableCell key={index}>{player?.name}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  Belum ada tim
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </section>
    </TabsContent>
  );
};

export default PengaturanTab;
