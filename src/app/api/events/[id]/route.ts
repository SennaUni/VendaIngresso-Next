import { NextRequest, NextResponse } from "next/server";

import { events } from "../../data";

const getIdFromRequest = (request: NextRequest) => {
  const url = new URL(request.url);
  const parts = url.pathname.split("/");
  return parts[parts.length - 1];
};

export async function GET(request: NextRequest) {
  const id = getIdFromRequest(request);

  const event = events.find((event) => event.id === id);

  if (!event)
    return NextResponse.json({ message: "Event not found" }, { status: 404 });

  return NextResponse.json(event);
}
