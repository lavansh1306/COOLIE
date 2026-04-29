import { NextRequest, NextResponse } from "next/server";
import { getSessionUser, SESSION_COOKIE, updateBookingStatus } from "@/lib/server/db";

function normalizeStatus(status: string | undefined) {
  if (status === "active" || status === "completed" || status === "cancelled") {
    return status;
  }

  return "active" as const;
}

export async function PATCH(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const user = await getSessionUser(token);

  if (!user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await context.params;
  const body = (await request.json()) as { status?: string };

  try {
    const booking = await updateBookingStatus({
      bookingId: id,
      userId: user.id,
      role: user.role,
      status: normalizeStatus(body.status),
    });

    return NextResponse.json({ booking });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    const status = message === "FORBIDDEN" ? 403 : message === "BOOKING_NOT_FOUND" ? 404 : 500;
    return NextResponse.json({ error: "Unable to update booking." }, { status });
  }
}