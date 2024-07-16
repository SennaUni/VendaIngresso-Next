import Link from "next/link";

import { cookies } from "next/headers";

import { EventSpotsModel } from "@/models";

import Title from "@/components/Title";
import SpotSeat from "@/components/SpotSeat";
import EventImage from "@/components/EventImage";
import TicketKindSelect from "./TicketKindSelect";

export type SpotsLayoutPageProps = {
  params: { eventId: string };
};

async function getEvents(eventId: string): Promise<EventSpotsModel> {
  const response = await fetch(
    `http://localhost:3000/api/events/${eventId}/spots`,
    {
      cache: "no-store",
      next: {
        tags: [`events/${eventId}/spots`],
      },
    }
  );

  return response.json();
}

const SpotsLayoutPage = async ({ params }: SpotsLayoutPageProps) => {
  const { event, spots } = await getEvents(params.eventId);

  const rowLetters = spots.map((spot) => spot.name[0]);

  const uniqueRows = rowLetters.filter(
    (row, index) => rowLetters.indexOf(row) === index
  );

  const spotGroupedByRow = uniqueRows.map((row) => ({
    row,
    spots: [
      ...spots
        .filter((spot) => spot.name[0] === row)
        .sort((a, b) => {
          const aNumber = parseInt(a.name.slice(1));
          const bNumber = parseInt(b.name.slice(1));

          return aNumber < bNumber ? -1 : aNumber > bNumber ? 1 : 0;
        }),
    ],
  }));

  const cookieStore = cookies();

  const cookiesSpots = cookieStore.get("spots")?.value;
  const cookiesTicketKind = cookieStore.get("ticketKind")?.value || "full";

  const selectedSpots = JSON.parse(cookiesSpots || "[]");

  let totalPrice = selectedSpots.length * event.price;

  totalPrice = cookiesTicketKind === "half" ? totalPrice / 2 : totalPrice;

  const formattedTotalPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(totalPrice);

  const formattedFullPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(event.price);

  const formattedHalfPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(event.price / 2);

  return (
    <main className="mt-10">
      <div className="w-[1176px] max-w-full flex flex-row flex-wrap justify-center gap-x-8  p-4 rounded-2xl bg-secondary md:justify-normal">
        <EventImage src={event.image_url} alt={event.name} />

        <div className="max-w-full flex flex-col gap-y-6">
          <div className="flex flex-col gap-y-2">
            <p className="text-sm font-semibold uppercase text-subtitle">
              {new Date(event.date).toLocaleDateString("pt-BR", {
                weekday: "long",
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </p>
            <p className="text-2xl font-semibold">{event.name}</p>
            <p className="font-normal">{event.location}</p>
          </div>

          <div className="h-[128px] flex flex-wrap justify-between gap-y-5 gap-x-3">
            <div className="flex flex-col gap-y-2">
              <p className="font-semibold">Organizador</p>
              <p className="text-sm font-normal">{event.organization}</p>
            </div>

            <div className="flex flex-col gap-y-2">
              <p className="font-semibold">Classificação</p>
              <p className="text-sm font-normal">{event.rating}</p>
            </div>
          </div>
        </div>
      </div>

      <Title className="mt-10">Escolha seu lugar</Title>

      <div className="mt-6 flex flex-wrap justify-between">
        <div className="w-full max-w-[650px] mb-4 p-6 gap-y-8 flex flex-col rounded-2xl bg-secondary">
          <div className="rounded-2xl bg-bar py-4 text-center text-[1.2rem] font-bold uppercase text-white">
            Palco
          </div>

          <div className="md:w-full md:justify-normal">
            {spotGroupedByRow.map((row) => (
              <div
                key={row.row}
                className="flex flex-row items-center gap-3 mb-3"
              >
                <div className="w-4">{row.row}</div>
                <div className="ml-2 flex flex-row">
                  {row.spots.map((spot) => (
                    <SpotSeat
                      key={spot.id}
                      eventId={event.id}
                      spotId={spot.name}
                      spotLabel={spot.name.slice(1)}
                      selected={selectedSpots.includes(spot.name)}
                      disabled={spot.status === "sold"}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="w-full flex flex-row justify-around">
            <div className="flex flex-row items-center">
              <span className="mr-1 block h-4 w-4 rounded-full bg-[#00A96E]" />
              Disponível
            </div>

            <div className="flex flex-row items-center">
              <span className="mr-1 block h-4 w-4 rounded-full bg-[#A6ADBB]" />
              Ocupado
            </div>

            <div className="flex flex-row items-center">
              <span className="mr-1 block h-4 w-4 rounded-full bg-[#7480FF]" />
              Selecionado
            </div>
          </div>
        </div>

        <div className="w-full max-w-[478px] flex flex-col gap-y-6 px-4 py-6 rounded-2xl bg-secondary">
          <h1 className="text-[1.2rem] font-semibold">
            Confira os valores do evento
          </h1>

          <p>
            Inteira: {formattedFullPrice} <br />
            Meia-entrada: {formattedHalfPrice}
          </p>

          <div className="flex flex-col">
            <TicketKindSelect
              price={event.price}
              defaultValue={cookiesTicketKind as any}
            />
          </div>

          <div>Total: {formattedTotalPrice}</div>

          <Link
            href="/checkout"
            className="rounded-lg bg-btn-primry py-4 text-sm font-semibold uppercase text-btn-primry text-center hover:bg-white"
          >
            Ir para pagamento
          </Link>
        </div>
      </div>
    </main>
  );
};

export default SpotsLayoutPage;
