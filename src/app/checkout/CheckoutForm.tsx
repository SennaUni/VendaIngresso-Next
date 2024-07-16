"use client";

import { PropsWithChildren } from "react";

import { checkoutAction } from "@/actions";

export type CardHashProps = {
  cardName: string;
  cardNumber: string;
  expireDate: string;
  cvv: string;
};

export const getCardHash = async ({
  cardName,
  cardNumber,
  cvv,
  expireDate,
}: CardHashProps) => {
  return Math.random().toString(36).substring(7);
};

export type CheckoutFormProps = {
  className?: string;
};

const CheckoutForm = ({
  className,
  children,
}: PropsWithChildren<CheckoutFormProps>) => {
  const formActionFunction = async (formdata: FormData) => {
    const card_hash = await getCardHash({
      cardName: formdata.get("card_name") as string,
      cardNumber: formdata.get("cc") as string,
      expireDate: formdata.get("expire_date") as string,
      cvv: formdata.get("ccv") as string,
    });

    await checkoutAction(card_hash, formdata.get("email") as string);
  };

  return (
    <form action={formActionFunction} className="className">
      <input type="hidden" name="card_hash" />

      {children}
    </form>
  );
};

export default CheckoutForm;
