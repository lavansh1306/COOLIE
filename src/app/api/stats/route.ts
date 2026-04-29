import { NextResponse } from "next/server";
import { getPlatformStats } from "@/lib/server/db";

export async function GET() {
  return NextResponse.json({ stats: await getPlatformStats() });
}