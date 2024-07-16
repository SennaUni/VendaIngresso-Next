import Link from "next/link";

import { EventModel } from "../models";

import EventImage from "./EventImage";

export type EventCardProps = {
  event: EventModel;
};

const EventCard = ({ event }: EventCardProps) => {
  return (
    <Link href={`/event/${event.id}/spots-layout`}>
      <div className="flex flex-col w-[277px] rounded-2xl bg-secondary">
        <EventImage src={event.image_url} alt={event.name} />

        <div className="flex flex-col gap-y-2 px-4 py-6">
          <p className="text-sm uppercase text-subtitle">
            {new Date(event.date).toLocaleDateString("pt-BR", {
              weekday: "long",
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </p>

          <p className="font-semibold">{event.name}</p>
          <p className="text-sm font-normal">{event.location}</p>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
