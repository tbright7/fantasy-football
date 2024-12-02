import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const leagueId = searchParams.get("leagueId");
  const espn_s2 = searchParams.get("espn_s2");
  const swid = searchParams.get("swid");
  const seasonId = searchParams.get("seasonId");

  if (!espn_s2 || !swid || !leagueId || !seasonId) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const payload = { espn_s2, swid, leagueId, seasonId };
    const token = jwt.sign(payload, "asdfbasdfasdf", {
      expiresIn: "7d",
    });

    return NextResponse.json({ token });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
