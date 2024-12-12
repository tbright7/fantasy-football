import { PositionAgainstOpponent, BasePlayerPoolEntry } from "./common";
export interface FreeAgentDataResponse {
  players: FreeAgentPlayer[];
  positionAgainstOpponent: PositionAgainstOpponent;
}

export interface FreeAgentPlayer extends BasePlayerPoolEntry {
  draftAuctionValue: number;
  waiverProcessDate?: number;
}
