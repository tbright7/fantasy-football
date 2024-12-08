import { TeamsScheduleResponse, ProTeam } from "@/types/TeamsScheduleResponse";

interface OpponentSchedule {
  opponentId: number;
  isHome: boolean;
  date: number;
  scoringPeriodId: number;
  gameId: number;
}

interface TeamMetaData {
  id: number;
  byeWeek: number;
  name: string;
  abbrev: string;
  schedule: OpponentSchedule[];
}

export interface TeamsMetadata {
  [key: number]: TeamMetaData;
}

export function getTeamMetadata(
  teamsSchedule: TeamsScheduleResponse
): TeamsMetadata {
  const map: { [key: number]: TeamMetaData } = {};

  const constructSchedule = (team: ProTeam): OpponentSchedule[] => {
    return Object.entries(team.proGamesByScoringPeriod).flatMap((games) =>
      games[1].map((game) => {
        const isHome = game.homeProTeamId === team.id;
        return {
          opponentId: isHome ? game.awayProTeamId : game.homeProTeamId,
          isHome,
          date: game.date,
          scoringPeriodId: game.scoringPeriodId,
          gameId: game.id,
        };
      })
    );
  };

  teamsSchedule.settings.proTeams.forEach((team) => {
    map[team.id] = {
      id: team.id,
      abbrev: team.abbrev,
      name: team.name,
      byeWeek: team.byeWeek,
      schedule: constructSchedule(team),
    };
  });
  return map;
}

export const getOpponentName = (
  teamsMetadata: TeamsMetadata,
  teamId: number,
  scoringPeriodId: number
): string | undefined => {
  const team = teamsMetadata[teamId];
  const isByeWeek = team.byeWeek === scoringPeriodId;
  if (isByeWeek) {
    return "BYE";
  }
  const game = team.schedule.find((g) => g.scoringPeriodId === scoringPeriodId);

  if (!game) return undefined;

  const opponentId = game.opponentId;
  return teamsMetadata[opponentId]?.abbrev;
};
