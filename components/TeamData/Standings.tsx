import { LeagueDataResponse } from "@/types/LeagueDataResponse";
import React from "react";
import Card from "../Card";

function Standings({ leagueData }: { leagueData: LeagueDataResponse }) {
  const teams = structuredClone(leagueData.teams);

  teams.sort((a, b) => {
    if (a.record.overall.wins !== b.record.overall.wins) {
      return a.record.overall.wins > b.record.overall.wins ? -1 : 1;
    }
    return a.record.overall.pointsFor > b.record.overall.pointsFor ? -1 : 1;
  });

  return (
    <Card header="Season Standings">
      <ul className="max-w-fit">
        {teams.map((team, index) => (
          <li key={team.id}>
            <p
              className={`text-base  pl-2 pr-2 rounded flex gap-5 ${
                team.id === leagueData.userTeam.id ? "bg-green-500" : ""
              }`}
              key={team.id}
            >
              {index + 1}. {team.name}{" "}
              <span className="ml-auto ">
                {team.record.overall.wins} - {team.record.overall.losses} -{" "}
                {team.record.overall.ties}
              </span>
            </p>
          </li>
        ))}
      </ul>
    </Card>
  );
}

export default Standings;
