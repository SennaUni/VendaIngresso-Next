import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { EventModel } from "@/models";

import Title from "@/components/Title";
import CheckoutForm from "./CheckoutForm";

async function getEvent(eventId: string): Promise<EventModel> {
  const response = await fetch(`http://localhost:3000/api/events/${eventId}`, {
    cache: "no-store",
    next: {
      tags: [`events/${eventId}`],
    },
  });

  return response.json();
}

const CheckoutPage = async () => {
  const cookiesStore = cookies();

  const cookieSpots = cookiesStore.get("spots")?.value;
  const cookieEventId = cookiesStore.get("eventId")?.value;
  const cookieTicketKind = cookiesStore.get("ticketKind")?.value;

  if (!cookieEventId) return redirect("/");

  const event = await getEvent(cookieEventId);

  const selectedSpots = JSON.parse(cookieSpots || "[]");

  let totalPrice = selectedSpots.length * event.price;

  totalPrice = cookieTicketKind === "half" ? totalPrice / 2 : totalPrice;

  const formattedTotalPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(totalPrice);

  return (
    <main className="mt-10 flex flex-wrap justify-center md:justify-between">
      <div className="mb-4 p-4 w-full max-w-[478px] max-h-[250px] flex flex-col gap-y-6 rounded-2xl bg-secondary">
        <Title>Resumo da compra</Title>

        <p className="font-semibold">
          {event.name}
          <br />
          {event.location}
          <br />
          {new Date(event.date).toLocaleDateString("pt-BR", {
            weekday: "long",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </p>

        <p className="font-semibold text-white">{formattedTotalPrice}</p>
      </div>

      <div className="w-full max-w-[650px] rounded-2xl bg-secondary p-4">
        <Title>Informações de pagamento</Title>

        <CheckoutForm>
          <div className="flex flex-col">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              name="email"
              className="my-2 border-solid rounded p-2 h-10 bg-input"
            />

            <label htmlFor="card_name">Nome no cartão</label>
            <input
              type="text"
              name="card_name"
              className="mb-2 border-solid rounded p-2 h-10 bg-input"
            />

            <label htmlFor="cc">Numero do cartão</label>
            <input
              type="card_number"
              name="cc"
              className="mb-2 border-solid rounded p-2 h-10 bg-input"
            />

            <div className="grid grid-cols-1 mb-2 gap-x-4 sm:grid-cols-2">
              <div className="flex w-full flex-col md:w-auto">
                <label htmlFor="expire_date">Vencimento</label>
                <input
                  type="text"
                  name="expire_date"
                  className="mb-2 border-solid rounded p-2 h-10 bg-input"
                />
              </div>

              <div className="flex w-full flex-col md:w-auto">
                <label htmlFor="cvv">CVV</label>
                <input
                  type="text"
                  name="cvv"
                  className="mb-2 border-solid rounded p-2 h-10 bg-input"
                />
              </div>
            </div>

            <button className="rounded-lg bg-btn-primry p-4 text-sm font-semibold uppercase text-btn-primry">
              Finalizar pagamento
            </button>
          </div>
        </CheckoutForm>
      </div>
    </main>
  );
};

export default CheckoutPage;
