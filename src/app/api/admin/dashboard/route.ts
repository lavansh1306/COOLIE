import { NextRequest, NextResponse } from "next/server";
import { getAdminDashboard, getSessionUser, SESSION_COOKIE } from "@/lib/server/db";

export async function GET(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const user = await getSessionUser(token);

  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  return NextResponse.json(await getAdminDashboard());
}