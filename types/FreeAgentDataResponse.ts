export interface FreeAgentDataResponse {
  players: PlayerPoolEntry[];
  positionAgainstOpponent: PositionAgainstOpponent;
}

export interface PlayerPoolEntry {
  draftAuctionValue: number;
  id: number;
  keeperValue: number;
  keeperValueFuture: number;
  lineupLocked: boolean;
  onTeamId: number;
  player: Player;
  ratings?: Ratings;
  rosterLocked: boolean;
  status: Status;
  tradeLocked: boolean;
  waiverProcessDate?: number;
}

export interface Player {
  active: boolean;
  defaultPositionId: number;
  draftRanksByRankType?: DraftRanksByRankType;
  droppable: boolean;
  eligibleSlots: number[];
  firstName: string;
  fullName: string;
  id: number;
  injured: boolean;
  injuryStatus?: InjuryStatus;
  jersey?: string;
  lastName: string;
  lastNewsDate?: number;
  lastVideoDate?: number;
  outlooks?: Outlooks;
  ownership: Ownership;
  proTeamId: number;
  rankings?: Rankings;
  seasonOutlook?: string;
  stats: Stat[];
  projectedPoints?: number;
}

export interface DraftRanksByRankType {
  STANDARD?: DraftRank;
  PPR: DraftRank;
}

export interface DraftRank {
  auctionValue: number;
  published: boolean;
  rank: number;
  rankSourceId: number;
  rankType: RankType;
  slotId: number;
  averageRank?: number;
}

export enum RankType {
  Ppr = "PPR",
  Standard = "STANDARD",
}

export enum InjuryStatus {
  Active = "ACTIVE",
  Doubtful = "DOUBTFUL",
  Questionable = "QUESTIONABLE",
  Suspension = "SUSPENSION",
}

export interface Outlooks {
  outlooksByWeek: { [key: string]: string };
}

export interface Ownership {
  activityLevel: null;
  auctionValueAverage: number;
  auctionValueAverageChange: number;
  averageDraftPosition: number;
  averageDraftPositionPercentChange: number;
  date: number;
  leagueType: number;
  percentChange: number;
  percentOwned: number;
  percentStarted: number;
}

export type Rankings = {
  "14"?: DraftRank[];
};

export interface Stat {
  appliedAverage?: number;
  appliedTotal?: number;
  externalId: string;
  id: string;
  proTeamId: number;
  scoringPeriodId: number;
  seasonId: number;
  statSourceId: number;
  statSplitTypeId: number;
  stats?: { [key: string]: number };
}

export interface Ratings {
  [key: string]: Rating;
}

export interface Rating {
  positionalRanking: number;
  totalRanking: number;
  totalRating: number;
}

export enum Status {
  Freeagent = "FREEAGENT",
  Waivers = "WAIVERS",
}

export interface PositionAgainstOpponent {
  positionalRatings: { [key: string]: PositionalRating };
}

export interface PositionalRating {
  average: number;
  ratingsByOpponent: { [key: string]: RatingsByOpponent };
}

export interface RatingsByOpponent {
  average: number;
  rank: number;
}
