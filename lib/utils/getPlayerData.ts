import { Team } from "@/types/LeagueDataResponse";
import {
  TeamDataResponse,
  TeamDataApiResponse,
} from "@/types/TeamDataResponse";
import { Entry, Stat, BasePlayerPoolEntry } from "@/types/common";
export function getSortedProjectedPointsByPosition(
  teamData: TeamDataResponse | TeamDataApiResponse
) {
  const map: { [key: number]: Entry[] } = {};

  teamData.roster.entries.forEach((entry) => {
    const positionId = entry.playerPoolEntry.player.defaultPositionId;

    if (map[positionId] === undefined) {
      map[positionId] = [entry];
    } else {
      map[positionId].push(entry);
    }
  });

  Object.values(map).forEach((position) =>
    position.sort((a, b) => {
      const pointsA = a.playerPoolEntry.player.projectedPoints ?? -Infinity; // Fallback for undefined
      const pointsB = b.playerPoolEntry.player.projectedPoints ?? -Infinity; // Fallback for undefined
      return pointsB - pointsA; // Sort in descending order
    })
  );

  return map;
}

export function getPlayerGame(stats: Stat[], scoringPeriodId?: number) {
  const actualStats = stats.find(
    (stat) =>
      stat.scoringPeriodId === scoringPeriodId && stat.statSourceId === 0
  );
  const projectedStats = stats.find(
    (stat) =>
      stat.scoringPeriodId === scoringPeriodId && stat.statSourceId === 1
  );

  return { projectedStats, actualStats };
}

export function getPlayerPoints(
  entry: BasePlayerPoolEntry,
  scoringPeriodId: number
) {
  const { projectedStats, actualStats } = getPlayerGame(
    entry.player.stats,
    scoringPeriodId
  );
  const stats = {
    projectedStat: projectedStats?.appliedTotal ?? 0,
    actualStats: actualStats?.appliedTotal ?? 0,
  };
  return stats;
}

export function getOwner(player: BasePlayerPoolEntry, teams: Team[]) {
  return (
    teams.find((team) => team.id === player.onTeamId)?.name ?? "Free Agent"
  );
}

export function getTopPlayers(
  players: BasePlayerPoolEntry[],
  scoringPeriodId: number,
  positionId?: number,
  numberOfPlayersToReturn?: number
) {
  if (!players.length || !players) return [];

  const playersWithPoints = players.map((agent) => {
    const game = getPlayerPoints(agent, scoringPeriodId);
    return {
      ...agent,
      player: {
        ...agent.player,
        projectedPoints: game.projectedStat,
        actualPoints: game.actualStats,
      },
    };
  });

  if (positionId) {
    return playersWithPoints
      .filter((player) => player.player.defaultPositionId === positionId)
      .slice(0, numberOfPlayersToReturn ?? 10);
  }

  return playersWithPoints.slice(0, numberOfPlayersToReturn ?? 10);
}

export function getPlayerHeadshotUrl(
  isDefense: boolean,
  id?: number,
  teamAbbrev?: string
) {
  if (isDefense && teamAbbrev) {
    return `https://a.espncdn.com/combiner/i?img=/i/teamlogos/nfl/500/${teamAbbrev}.png&h=70&w=96&cb=1`;
  } else if (id) {
    return `https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/${id}.png&cb=1`;
  }
  return "https://a.espncdn.com/combiner/i?img=/games/lm-static/ffl/images/nomug.png&w=96&h=70&cb=1";
}
