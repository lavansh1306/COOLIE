import { NextRequest, NextResponse } from "next/server";
import { listPorters } from "@/lib/server/db";

export async function GET(request: NextRequest) {
  const station = request.nextUrl.searchParams.get("station");
  const porters = await listPorters(station);

  return NextResponse.json({ porters });
}