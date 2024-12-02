export async function fetchTeamData(leagueId: string, teamId: string) {
  const res = await fetch(
    `/api/espn/team?leagueId=${leagueId}&teamId=${teamId}`
  );
  if (!res.ok) {
    throw new Error("Error fetching team data");
  }
  return res.json();
}
