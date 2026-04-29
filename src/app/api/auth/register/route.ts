import { NextRequest, NextResponse } from "next/server";
import { createSession, createUser, SESSION_COOKIE } from "@/lib/server/db";

function normalizeRole(role: string | undefined) {
  if (role === "porter") {
    return "porter" as const;
  }

  return "passenger" as const;
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    name?: string;
    email?: string;
    password?: string;
    role?: string;
    station?: string;
    price?: number;
    experience?: string;
  };

  if (!body.name || !body.email || !body.password) {
    return NextResponse.json({ error: "Name, email, and password are required." }, { status: 400 });
  }

  try {
    const user = await createUser({
      name: body.name,
      email: body.email,
      password: body.password,
      role: normalizeRole(body.role),
      station: body.station ?? null,
      price: body.price ?? null,
      experience: body.experience ?? null,
    });

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
  } catch (error) {
    if (error instanceof Error && error.message === "EMAIL_EXISTS") {
      return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
    }

    return NextResponse.json({ error: "Unable to create account." }, { status: 500 });
  }
}