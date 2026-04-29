import { NextRequest, NextResponse } from "next/server";
import { createBooking, getCustomerDashboard, getSessionUser, SESSION_COOKIE } from "@/lib/server/db";

export async function GET(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const user = await getSessionUser(token);

  if (!user || user.role !== "passenger") {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  return NextResponse.json(await getCustomerDashboard(user.id));
}

export async function POST(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const user = await getSessionUser(token);

  if (!user || user.role !== "passenger") {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = (await request.json()) as {
    porterId?: string;
    station?: string;
    dropLocation?: string;
    pnr?: string;
    amount?: number;
    negotiatedPrice?: number | null;
    payMethod?: string;
    upiId?: string | null;
    luggage?: string;
  };

  if (!body.porterId || !body.station || !body.dropLocation || !body.pnr || typeof body.amount !== "number" || !body.payMethod) {
    return NextResponse.json({ error: "Missing booking fields." }, { status: 400 });
  }

  const booking = await createBooking({
    customerUserId: user.id,
    passengerName: user.name,
    porterUserId: body.porterId,
    station: body.station,
    dropLocation: body.dropLocation,
    pnr: body.pnr,
    amount: body.amount,
    negotiatedPrice: body.negotiatedPrice ?? null,
    payMethod: body.payMethod,
    upiId: body.upiId ?? null,
    luggage: body.luggage ?? "1 bag",
  });

  return NextResponse.json({ booking });
}