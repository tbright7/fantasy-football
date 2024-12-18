export interface LeagueDataApiResponse {
  draftDetail: DraftDetail;
  gameId: number;
  id: number;
  members: Member[];
  positionAgainstOpponent: PositionAgainstOpponent;
  schedule: Schedule[];
  scoringPeriodId: number;
  seasonId: number;
  segmentId: number;
  settings: Settings;
  status: StatusClass;
  teams: Team[];
}

export interface LeagueDataResponse extends LeagueDataApiResponse {
  userTeam: Team;
}

export interface DraftDetail {
  completeDate: number;
  drafted: boolean;
  inProgress: boolean;
  picks: Pick[];
}

export interface Pick {
  autoDraftTypeId: number;
  bidAmount: number;
  id: number;
  keeper: boolean;
  lineupSlotId: number;
  memberId?: PrimaryOwner;
  nominatingTeamId: number;
  overallPickNumber: number;
  playerId: number;
  reservedForKeeper: boolean;
  roundId: number;
  roundPickNumber: number;
  teamId: number;
  tradeLocked: boolean;
}

export type PrimaryOwner = string;

export interface Member {
  displayName: string;
  firstName: string;
  id: PrimaryOwner;
  isLeagueCreator: boolean;
  isLeagueManager: boolean;
  lastName: string;
  notificationSettings: NotificationSetting[];
}

export interface NotificationSetting {
  enabled: boolean;
  id: string;
  type: string;
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

export interface Schedule {
  away: ScheduleAway;
  home: ScheduleAway;
  id: number;
  matchupPeriodId: number;
  playoffTierType: RestrictionType;
  winner: Winner;
}

export interface ScheduleAway {
  adjustment: number;
  cumulativeScore: CumulativeScore;
  pointsByScoringPeriod?: { [key: string]: number };
  teamId: number;
  tiebreak: number;
  totalPoints: number;
  cumulativeScoreLive?: CumulativeScore;
  rosterForCurrentScoringPeriod?: RosterForCurrentScoringPeriod;
  rosterForMatchupPeriodDelayed?: RosterForMatchupPeriodDelayed;
  totalPointsLive?: number;
}

export interface CumulativeScore {
  losses: number;
  statBySlot: null;
  ties: number;
  wins: number;
}

export interface RosterForCurrentScoringPeriod {
  appliedStatTotal: number;
  entries: RosterForCurrentScoringPeriodEntry[];
}

export interface RosterForCurrentScoringPeriodEntry {
  lineupSlotId: number;
  playerId: number;
  playerPoolEntry: PlayerPoolEntry;
}

export interface PlayerPoolEntry {
  id: number;
  player: Player;
}

export interface Player {
  defaultPositionId: number;
  fullName: string;
  id: number;
  proTeamId: number;
  stats: Stat[];
  universeId: number;
}

export interface Stat {
  appliedStats: { [key: string]: number };
  appliedTotal: number;
  externalId: string;
  id: string;
  proTeamId: number;
  scoringPeriodId: number;
  seasonId: number;
  statSourceId: number;
  statSplitTypeId: number;
  stats: { [key: string]: number };
  variance: { [key: string]: number };
}

export interface RosterForMatchupPeriodDelayed {
  entries: any[];
}

export enum RestrictionType {
  None = "NONE",
}

export enum Winner {
  Away = "AWAY",
  Home = "HOME",
  Undecided = "UNDECIDED",
}

export interface Settings {
  acquisitionSettings: AcquisitionSettings;
  draftSettings: DraftSettings;
  financeSettings: FinanceSettings;
  isCustomizable: boolean;
  isPublic: boolean;
  name: string;
  restrictionType: RestrictionType;
  rosterSettings: RosterSettings;
  scheduleSettings: ScheduleSettings;
  scoringSettings: ScoringSettings;
  size: number;
  tradeSettings: TradeSettings;
}

export interface AcquisitionSettings {
  acquisitionBudget: number;
  acquisitionLimit: number;
  acquisitionType: string;
  finalPlaceTransactionEligible: number;
  isUsingAcquisitionBudget: boolean;
  matchupAcquisitionLimit: number;
  matchupLimitPerScoringPeriod: boolean;
  minimumBid: number;
  transactionLockingEnabled: boolean;
  waiverHours: number;
  waiverOrderReset: boolean;
  waiverProcessDays: string[];
  waiverProcessHour: number;
}

export interface DraftSettings {
  auctionBudget: number;
  availableDate: number;
  date: number;
  isTradingEnabled: boolean;
  keeperCount: number;
  keeperCountFuture: number;
  keeperOrderType: string;
  leagueSubType: RestrictionType;
  orderType: string;
  pickOrder: number[];
  timePerSelection: number;
  type: string;
}

export interface FinanceSettings {
  entryFee: number;
  miscFee: number;
  perLoss: number;
  perTrade: number;
  playerAcquisition: number;
  playerDrop: number;
  playerMoveToActive: number;
  playerMoveToIR: number;
}

export interface RosterSettings {
  isBenchUnlimited: boolean;
  isUsingUndroppableList: boolean;
  lineupLocktimeType: string;
  lineupSlotCounts: { [key: string]: number };
  lineupSlotStatLimits: DraftStrategy;
  moveLimit: number;
  positionLimits: { [key: string]: number };
  rosterLocktimeType: string;
  universeIds: number[];
}

export interface DraftStrategy {}

export interface ScheduleSettings {
  divisions: Division[];
  matchupPeriodCount: number;
  matchupPeriodLength: number;
  matchupPeriods: { [key: string]: number[] };
  periodTypeId: number;
  playoffMatchupPeriodLength: number;
  playoffReseed: boolean;
  playoffSeedingRule: string;
  playoffSeedingRuleBy: number;
  playoffTeamCount: number;
  variablePlayoffMatchupPeriodLength: boolean;
}

export interface Division {
  id: number;
  name: string;
  size: number;
}

export interface ScoringSettings {
  allowOutOfPositionScoring: boolean;
  homeTeamBonus: number;
  matchupTieRule: RestrictionType;
  matchupTieRuleBy: number;
  playerRankType: RankType;
  playoffHomeTeamBonus: number;
  playoffMatchupTieRule: RestrictionType;
  playoffMatchupTieRuleBy: number;
  scoringItems: ScoringItem[];
  scoringType: string;
}

export enum RankType {
  Ppr = "PPR",
  Standard = "STANDARD",
}

export interface ScoringItem {
  isReverseItem: boolean;
  leagueRanking: number;
  leagueTotal: number;
  points: number;
  pointsOverrides: PointsOverrides;
  statId: number;
}

export type PointsOverrides = number;

export interface TradeSettings {
  allowOutOfUniverse: boolean;
  deadlineDate: number;
  max: number;
  revisionHours: number;
  vetoVotesRequired: number;
}

export interface StatusClass {
  activatedDate: number;
  createdAsLeagueType: number;
  currentLeagueType: number;
  currentMatchupPeriod: number;
  finalScoringPeriod: number;
  firstScoringPeriod: number;
  isActive: boolean;
  isExpired: boolean;
  isFull: boolean;
  isPlayoffMatchupEdited: boolean;
  isToBeDeleted: boolean;
  isViewable: boolean;
  isWaiverOrderEdited: boolean;
  latestScoringPeriod: number;
  previousSeasons: any[];
  standingsUpdateDate: number;
  teamsJoined: number;
  transactionScoringPeriod: number;
  waiverLastExecutionDate: number;
  waiverProcessStatus: { [key: string]: number };
}

export interface Team {
  abbrev: string;
  currentProjectedRank: number;
  divisionId: number;
  draftDayProjectedRank: number;
  draftStrategy: DraftStrategy;
  id: number;
  isActive: boolean;
  logo: string;
  logoType: LogoType;
  name: string;
  owners: PrimaryOwner[];
  playoffSeed: number;
  points: number;
  pointsAdjusted: number;
  pointsDelta: number;
  primaryOwner: PrimaryOwner;
  rankCalculatedFinal: number;
  rankFinal: number;
  record: Record;
  roster: TeamRoster;
  tradeBlock: TeamTradeBlock;
  transactionCounter: TransactionCounter;
  valuesByStat: { [key: string]: number };
  waiverRank: number;
  watchList?: number[];
}

export enum LogoType {
  CustomValid = "CUSTOM_VALID",
  Vector = "VECTOR",
}

export interface Record {
  away: DivisionClass;
  division: DivisionClass;
  home: DivisionClass;
  overall: DivisionClass;
}

export interface DivisionClass {
  gamesBack: number;
  losses: number;
  percentage: number;
  pointsAgainst: number;
  pointsFor: number;
  streakLength: number;
  streakType: StreakType;
  ties: number;
  wins: number;
}

export enum StreakType {
  Loss = "LOSS",
  Win = "WIN",
}

export interface TeamRoster {
  appliedStatTotal: number;
  entries: RosterEntry[];
  tradeReservedEntries: number;
}

export interface RosterEntry {
  acquisitionDate: number;
  acquisitionType: AcquisitionType;
  injuryStatus: InjuryStatusEnum;
  lineupSlotId: number;
  pendingTransactionIds: any[] | null;
  playerId: number;
  playerPoolEntry: FluffyPlayerPoolEntry;
  status: InjuryStatusEnum;
}

export enum AcquisitionType {
  Add = "ADD",
  Draft = "DRAFT",
  Trade = "TRADE",
}

export enum InjuryStatusEnum {
  Normal = "NORMAL",
}

export interface FluffyPlayerPoolEntry {
  appliedStatTotal: number;
  id: number;
  keeperValue: number;
  keeperValueFuture: number;
  lineupLocked: boolean;
  onTeamId: number;
  player: FluffyPlayer;
  ratings: Ratings;
  rosterLocked: boolean;
  status: PlayerPoolEntryStatus;
  tradeLocked: boolean;
}

export interface FluffyPlayer {
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
  lastName: string;
  lastNewsDate?: number;
  lastVideoDate?: number;
  outlooks?: Outlooks;
  ownership: Ownership;
  proTeamId: number;
  rankings: { [key: string]: Ppr[] };
  seasonOutlook?: string;
  stats: FluffyStat[];
  universeId: number;
}

export interface DraftRanksByRankType {
  STANDARD: Ppr;
  PPR: Ppr;
}

export interface Ppr {
  auctionValue: number;
  published: boolean;
  rank: number;
  rankSourceId: number;
  rankType: RankType;
  slotId: number;
  averageRank?: number;
}

export enum InjuryStatus {
  Active = "ACTIVE",
  InjuryReserve = "INJURY_RESERVE",
  Out = "OUT",
  Questionable = "QUESTIONABLE",
}

export interface Outlooks {
  outlooksByWeek: { [key: string]: string };
}

export interface Ownership {
  auctionValueAverage: number;
  averageDraftPosition: number;
  percentChange: number;
  percentOwned: number;
  percentStarted: number;
}

export interface FluffyStat {
  appliedStats: { [key: string]: number };
  appliedTotal: number;
  externalId: string;
  id: string;
  proTeamId: number;
  scoringPeriodId: number;
  seasonId: number;
  statSourceId: number;
  statSplitTypeId: number;
  stats: { [key: string]: number };
  variance: { [key: string]: number };
  appliedAverage?: number;
}

export interface Ratings {
  [key: string]: Rating;
}

export interface Rating {
  positionalRanking: number;
  totalRanking: number;
  totalRating: number;
}

export enum PlayerPoolEntryStatus {
  Onteam = "ONTEAM",
}

export interface TeamTradeBlock {
  players?: { [key: string]: PlayerValue };
}

export enum PlayerValue {
  OnTheBlock = "ON_THE_BLOCK",
  Untouchable = "UNTOUCHABLE",
}

export interface TransactionCounter {
  acquisitionBudgetSpent: number;
  acquisitions: number;
  drops: number;
  matchupAcquisitionTotals: { [key: string]: number };
  misc: number;
  moveToActive: number;
  moveToIR: number;
  paid: number;
  teamCharges: number;
  trades: number;
}
