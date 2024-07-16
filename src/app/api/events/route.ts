import { NextResponse } from "next/server";

import { events } from "../data";

export async function GET() {
  return NextResponse.json(events);
}
