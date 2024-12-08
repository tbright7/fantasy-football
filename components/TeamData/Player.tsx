import { LeagueDataResponse, ScheduleAway } from "@/types/LeagueDataResponse";
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

  return (
    <div className="flex items-center ">
      <img src={logo} className="h-8" />
      <p className="ms-2">{team?.name}</p>
      <p className=" ms-auto">{score}</p>
    </div>
  );
}

export default Player;
