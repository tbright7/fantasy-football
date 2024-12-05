export interface LeagueDataResponse {
  draftDetail: DraftDetail;
  gameId: number;
  id: number;
  members: Member[];
  pendingTransactions: PendingTransaction[];
  positionAgainstOpponent: PositionAgainstOpponent;
  schedule: Schedule[];
  scoringPeriodId: number;
  seasonId: number;
  segmentId: number;
  settings: Settings;
  status: StatusClass;
  teams: Team[];
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
  memberId?: ID;
  nominatingTeamId: number;
  overallPickNumber: number;
  playerId: number;
  reservedForKeeper: boolean;
  roundId: number;
  roundPickNumber: number;
  teamId: number;
  tradeLocked: boolean;
}

export type ID = string;

export interface Member {
  displayName: string;
  firstName: string;
  id: ID;
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

export interface PendingTransaction {
  bidAmount: number;
  executionType: string;
  id: string;
  isActingAsTeamOwner: boolean;
  isLeagueManager: boolean;
  isPending: boolean;
  items: Item[];
  memberId: ID;
  processDate: number;
  proposedDate: number;
  rating: number;
  scoringPeriodId: number;
  skipTransactionCounters: boolean;
  status: string;
  subOrder: number;
  teamId: number;
  type: string;
}

export interface Item {
  fromLineupSlotId: number;
  fromTeamId: number;
  isKeeper: boolean;
  overallPickNumber: number;
  playerId: number;
  toLineupSlotId: number;
  toTeamId: number;
  type: string;
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
  cumulativeScore?: CumulativeScore;
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
  playerPoolEntry: PurplePlayerPoolEntry;
}

export interface PurplePlayerPoolEntry {
  id: number;
  player: PurplePlayer;
}

export interface PurplePlayer {
  defaultPositionId: number;
  fullName: string;
  id: number;
  proTeamId: number;
  stats: PurpleStat[];
  universeId: number;
}

export interface PurpleStat {
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
  lineupSlotStatLimits: LineupSlotStatLimits;
  moveLimit: number;
  positionLimits: { [key: string]: number };
  rosterLocktimeType: string;
  universeIds: number[];
}

export interface LineupSlotStatLimits {}

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
  draftStrategy: LineupSlotStatLimits;
  id: number;
  isActive: boolean;
  logo: string;
  logoType: LogoType;
  name: string;
  owners: ID[];
  playoffSeed: number;
  points: number;
  pointsAdjusted: number;
  pointsDelta: number;
  primaryOwner: ID;
  rankCalculatedFinal: number;
  rankFinal: number;
  record: Record;
  roster: Roster;
  tradeBlock: TradeBlock;
  transactionCounter: TransactionCounter;
  valuesByStat: { [key: string]: number };
  waiverRank: number;
  pendingTransactions?: PendingTransaction[];
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

export interface Roster {
  appliedStatTotal: number;
  entries: RosterEntry[];
  tradeReservedEntries: number;
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
  appliedAverage?: number;
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

export interface Ratings {
  "0": The0;
}

export interface The0 {
  positionalRanking: number;
  totalRanking: number;
  totalRating: number;
}

export enum PlayerPoolEntryStatus {
  Onteam = "ONTEAM",
}

export interface TradeBlock {
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

export interface TeamDataResponse {
  id: number;
  roster: {
    appliedStatTotal: number;
    entries: RosterEntry[];
    tradeReservedEntries: number;
  };
}

export interface RosterEntry {
  acquisitionDate: number;
  acquisitionType: string;
  injuryStatus: string;
  lineupSlotId: number;
  pendingTransactionIds: string[];
  playerId: number;
  playerPoolEntry: PlayerPoolEntry;
  status: string;
}

interface PlayerPoolEntry {
  appliedStatTotal: number;
  id: number;
  keeperValue: number;
  keeperValueFuture: number;
  lineupLocked: boolean;
  onTeamId: number;
  player: Player;
  ratings: Ratings;
  rosterLocked: boolean;
  status: PlayerPoolEntryStatus;
  tradeLocked: boolean;
}

export interface Player {
  active: boolean;
  defaultPositionId: number;
  draftRanksByRankType: DraftRanksByRankType;
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
  stats: Stat[];
  universeId: number;
}

export interface Ratings {
  "0": The0;
}
export interface The0 {
  positionalRanking: number;
  totalRanking: number;
  totalRating: number;
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
export interface Stat {
  appliedAverage?: number;
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
}

export enum RankType {
  Ppr = "PPR",
  Standard = "STANDARD",
}

export interface FreeAgentDataResponse {
  players: PlayerElement[];
  positionAgainstOpponent: PositionAgainstOpponent;
}

export interface PlayerElement {
  draftAuctionValue: number;
  id: number;
  keeperValue: number;
  keeperValueFuture: number;
  lineupLocked: boolean;
  onTeamId: number;
  player: PlayerPlayer;
  ratings: Ratings;
  rosterLocked: boolean;
  status: string;
  tradeLocked: boolean;
  waiverProcessDate: number;
}

export interface PlayerPlayer {
  active: boolean;
  defaultPositionId: number;
  draftRanksByRankType: DraftRanksByRankType;
  droppable: boolean;
  eligibleSlots: number[];
  firstName: string;
  fullName: string;
  id: number;
  injured: boolean;
  lastName: string;
  ownership: Ownership;
  proTeamId: number;
  rankings: Rankings;
  seasonOutlook: string;
  stats: Stat[];
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

export interface Rankings {
  "13": Ppr[];
}

export interface Stat {
  appliedAverage?: number;
  appliedTotal: number;
  externalId: string;
  id: string;
  proTeamId: number;
  scoringPeriodId: number;
  seasonId: number;
  statSourceId: number;
  statSplitTypeId: number;
  stats: { [key: string]: number };
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

export interface TeamsScheduleResponse {
  display: boolean;
  settings: Settings;
}

export interface Settings {
  defaultDraftPosition: number;
  draftLobbyMinimumLeagueCount: number;
  gameNotificationSettings: GameNotificationSettings;
  gated: boolean;
  playerOwnershipSettings: PlayerOwnershipSettings;
  proTeams: ProTeam[];
  readOnly: boolean;
  statIdToOverridePosition: { [key: string]: number };
  teamActivityEnabled: boolean;
  typeNames: { [key: string]: string[] };
}

export interface GameNotificationSettings {
  availabilityNotificationsEnabled: boolean;
  draftNotificationsEnabled: boolean;
  injuryNotificationsEnabled: boolean;
  lineupNotificationsEnabled: boolean;
  positionEligibilityNotificationsEnabled: boolean;
  rosterNewsNotificationsEnabled: boolean;
  startBenchNotificationsEnabled: boolean;
  tradeNotificationsEnabled: boolean;
}

export interface PlayerOwnershipSettings {
  firstGameDate: number;
  lastGameDate: number;
  startDate: number;
}

export interface ProTeam {
  abbrev: string;
  byeWeek: number;
  id: number;
  location: string;
  name: string;
  proGamesByScoringPeriod: { [key: string]: ProGamesByScoringPeriod[] };
  teamPlayersByPosition?: { [key: string]: number };
  universeId: number;
}

export interface ProGamesByScoringPeriod {
  awayProTeamId: number;
  date: number;
  homeProTeamId: number;
  id: number;
  scoringPeriodId: number;
  startTimeTBD: boolean;
  statsOfficial: boolean;
  validForLocking: boolean;
}
