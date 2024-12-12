// Shared base interfaces
export interface BasePlayerPoolEntry {
  id: number;
  keeperValue: number;
  keeperValueFuture: number;
  lineupLocked: boolean;
  onTeamId: number;
  player: BasePlayer;
  ratings?: Ratings;
  rosterLocked: boolean;
  tradeLocked: boolean;
}

export interface BasePlayer {
  active: boolean;
  defaultPositionId: number;
  droppable: boolean;
  eligibleSlots: number[];
  firstName: string;
  fullName: string;
  id: number;
  injured: boolean;
  injuryStatus?: InjuryStatus | string; // Allow for string variations
  lastName: string;
  lastNewsDate?: number;
  lastVideoDate?: number;
  outlooks?: Outlooks;
  ownership: Ownership;
  proTeamId: number;
  stats: Stat[];
  seasonOutlook?: string;
  projectedPoints?: number;
  actualPoints?: number;
}

export interface Roster {
  appliedStatTotal: number;
  entries: Entry[];
  tradeReservedEntries: number;
}

export interface Entry extends BasePlayerPoolEntry {
  acquisitionDate: number;
  acquisitionType: AcquisitionType;
  injuryStatus: InjuryStatusEnum;
  lineupSlotId: number;
  pendingTransactionIds: any[] | null;
  playerPoolEntry: BasePlayerPoolEntry;
}

// Shared interfaces
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

export enum AcquisitionType {
  Add = "ADD",
  Draft = "DRAFT",
  Trade = "TRADE",
}

export enum InjuryStatusEnum {
  Normal = "NORMAL",
}

export enum InjuryStatus {
  Active = "ACTIVE",
  Doubtful = "DOUBTFUL",
  Questionable = "QUESTIONABLE",
  Suspension = "SUSPENSION",
}

export enum RankType {
  Ppr = "PPR",
  Standard = "STANDARD",
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
