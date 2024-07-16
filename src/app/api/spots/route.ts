import { NextResponse } from "next/server";

export async function GET() {
  const spots = [
    {
      id: "1",
      name: "A1",
      event_id: 1,
      status: "AVAILABLE",
    },
    {
      id: "2",
      name: "A2",
      event_id: 1,
      status: "AVAILABLE",
    },
    {
      id: "3",
      name: "A3",
      event_id: 1,
      status: "AVAILABLE",
    },
    {
      id: "4",
      name: "A4",
      event_id: 1,
      status: "AVAILABLE",
    },
    {
      id: "5",
      name: "A5",
      event_id: 1,
      status: "AVAILABLE",
    },
    {
      id: "6",
      name: "B1",
      event_id: 1,
      status: "AVAILABLE",
    },
    {
      id: "7",
      name: "B2",
      event_id: 1,
      status: "AVAILABLE",
    },
    {
      id: "8",
      name: "B3",
      event_id: 1,
      status: "AVAILABLE",
    },
    {
      id: "9",
      name: "B4",
      event_id: 1,
      status: "AVAILABLE",
    },
    {
      id: "10",
      name: "B5",
      event_id: 1,
      status: "AVAILABLE",
    },
  ];

  return NextResponse.json(spots);
}
