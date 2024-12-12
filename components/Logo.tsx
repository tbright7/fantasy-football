import React from "react";
import { Team } from "@/types/LeagueDataResponse";
import Image from "next/image";

function Logo({ userTeam }: { userTeam: Team }) {
  return (
    <Image
      src={userTeam?.logo}
      alt="Team logo"
      width={48}
      height={48}
    />
  );
}

export default Logo;
