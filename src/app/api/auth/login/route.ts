import { NextRequest, NextResponse } from "next/server";
import { authenticateUser, createSession, SESSION_COOKIE } from "@/lib/server/db";

function normalizeRole(role: string | undefined) {
  if (role === "porter" || role === "admin") {
    return role;
  }

  return "passenger";
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    email?: string;
    password?: string;
    role?: string;
  };

  if (!body.email || !body.password) {
    return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
  }

  const role = normalizeRole(body.role);
  const user = await authenticateUser(body.email, body.password, role);

  if (!user) {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }

  const session = await createSession(user.id);
  const response = NextResponse.json({ user });
  response.cookies.set(SESSION_COOKIE, session.token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(session.expiresAt),
  });

  return response;
}