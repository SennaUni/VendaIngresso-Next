"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

export const selectSpotAction = async (eventId: string, spotName: string) => {
  const cookieStore = cookies();

  const cookiesSpots = cookieStore.get("spots")?.value;

  const spots = JSON.parse(cookiesSpots || "[]");

  spots.push(spotName);

  const uniqueSpots = spots.filter(
    (spot: string, index: number) => spots.indexOf(spot) === index
  );

  cookieStore.set("eventId", eventId);
  cookieStore.set("spots", JSON.stringify(uniqueSpots));
};

export const unSelectSpotAction = async (spotName: string) => {
  const cookieStore = cookies();

  const cookiesSpots = cookieStore.get("spots")?.value;

  const spots = JSON.parse(cookiesSpots || "[]");

  const newSpots = spots.filter((spot: string) => spot !== spotName);

  cookieStore.set("spots", JSON.stringify(newSpots));
};

export const clearSpotAction = async () => {
  const cookieStore = cookies();

  cookieStore.set("spots", "[]");
  cookieStore.set("eventId", "");
};

export const selectTicketTypeAction = async (ticketKind: "full" | "half") => {
  const cookieStore = cookies();

  cookieStore.set("ticketKind", ticketKind);
};

export const checkoutAction = async (cardHash: string, email: string) => {
  const cookieStore = cookies();

  const cookiesSpots = cookieStore.get("spots")?.value;
  const cookiesEventId = cookieStore.get("eventId")?.value;
  const cookiesTicketKind = cookieStore.get("ticketKind")?.value;

  const spots = JSON.parse(cookiesSpots || "[]");
  const ticketKind = cookiesTicketKind || "full";

  const response = await fetch(`http://localhost:3000/api/checkout`, {
    method: "POST",
    body: JSON.stringify({
      card_hash: cardHash,
      ticket_kind: ticketKind,
      event_id: cookiesEventId,
      email,
      spots,
    }),
  });

  console.log(await response.text());

  if (!response.ok) return { error: "Erro ao realizar a compra" };

  revalidateTag("events");
  revalidateTag(`events/${cookiesEventId}`);
  revalidateTag(`events/${cookiesEventId}/spots`);

  redirect(`/checkout/${cookiesEventId}/success`);
};
