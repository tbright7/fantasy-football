import { isStarting } from "@/constants";
import { LeagueDataResponse, ScheduleAway } from "@/types/LeagueDataResponse";
import Image from "next/image";
import React from "react";

function Player({
  game,
  leagueData,
  historical,
}: {
  game: ScheduleAway;
  leagueData: LeagueDataResponse;
  historical?: boolean;
}) {
  const teamId = game.teamId;
  const team = leagueData.teams.find((team) => team.id === teamId);
  const logo = team?.logo;
  const score = historical ? game.totalPoints : game.totalPointsLive;

  let projectedScore = 0;

  game.rosterForCurrentScoringPeriod?.entries.forEach((entry) => {
    const player = entry.playerPoolEntry.player;
    if (isStarting(entry.lineupSlotId)) {
      const relevantStat = player.stats.find(
        (stat) =>
          stat.scoringPeriodId === leagueData.scoringPeriodId &&
          stat.statSourceId === 1
      );

      if (relevantStat?.appliedTotal) {
        projectedScore += relevantStat.appliedTotal;
      }
    }
  });

  return (
    <div className="flex items-center ">
      {logo && <Image src={logo} alt="team logo" width={24} height={24} />}
      <p className="ms-2">{team?.name}</p>
      <p className=" ms-auto">
        {score}
        {!historical && (
          <span className="text-gray-500 ms-1">
            ({projectedScore.toFixed(1)})
          </span>
        )}
      </p>
    </div>
  );
}

export default Player;
