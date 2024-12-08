import { Schedule } from "@/types/LeagueDataResponse";

export function getTeamSchedule(schedule: Schedule[], teamId: number) {
  const filteredSchedule = schedule.filter(
    (matchup) =>
      matchup.away.teamId === teamId || matchup.home.teamId === teamId
  );

  return filteredSchedule;
}

export function getGame(schedule: Schedule[], scoringPeriodId: number) {
  return schedule.find((game) => game.matchupPeriodId === scoringPeriodId);
}
