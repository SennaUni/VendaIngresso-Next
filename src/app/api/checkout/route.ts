import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export type CheckoutPostRequest = {
  params: {
    eventId: string;
  };
};

export async function POST(
  request: NextRequest,
  { params }: CheckoutPostRequest
) {
  revalidateTag("events");
  revalidateTag(`events/${params.eventId}`);
  revalidateTag(`events/${params.eventId}/spots`);

  return NextResponse.json({
    success: true,
    message: "Deu boa",
  });
}
