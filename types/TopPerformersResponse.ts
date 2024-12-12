import {
  PositionAgainstOpponent,
  BasePlayerPoolEntry,
  Ratings,
} from "./common";

export interface TopPerformersResponse {
  players: TopPerformer[];
  positionAgainstOpponent: PositionAgainstOpponent;
}

export interface TopPerformer extends BasePlayerPoolEntry {
  draftAuctionValue: number;
  ratings: Ratings;
  status: string;
}
