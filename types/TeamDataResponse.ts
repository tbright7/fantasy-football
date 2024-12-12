import { Roster, Entry } from "./common";
export interface TeamDataApiResponse {
  id: number;
  roster: Roster;
}

export interface TeamDataResponse extends TeamDataApiResponse {
  positionGroupsByProjectedPoints: Record<number, Entry[]>;
}
