"use client";

import { selectTicketTypeAction } from "@/actions";

export type TicketKingSelectProps = {
  defaultValue?: "full" | "half";
  price: number;
};

const TicketKindSelect = ({ defaultValue, price }: TicketKingSelectProps) => {
  const formattedFullPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);

  const formattedHalfPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price / 2);

  return (
    <>
      <label htmlFor="ticket-type">Escolha o tipo do ingresso</label>

      <select
        id="ticket-type"
        name="ticket-type"
        defaultValue={defaultValue}
        className="mt-2 px-4 py-[14px] rounded-lg bg-input"
        onChange={async (event) => {
          await selectTicketTypeAction(event.target.value as any);
        }}
      >
        <option value="full">Inteira - {formattedFullPrice}</option>
        <option value="half">Meia entrada - {formattedHalfPrice}</option>
      </select>
    </>
  );
};

export default TicketKindSelect;
