export interface Team {
  id: number;
  name: string;
  alias: string;
  players: Player[];
}

export interface Player {
  id: number;
  name: string;
  teamId: number;
}

export interface SelectedValue {
  value: string;
  label: string;
}
