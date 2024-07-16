import { EventModel } from "@/models";

import Title from "@/components/Title";
import EventCard from "@/components/EventCard";

async function getEvents(): Promise<EventModel[]> {
  const response = await fetch("http://localhost:3000/api/events", {
    cache: "no-store",
    next: {
      tags: ["events"],
    },
  });

  return response.json();
}

const MainPage = async () => {
  const events = await getEvents();

  return (
    <main>
      <Title>Eventos disponíveis</Title>

      <div className="mt-8 sm:grid  sm:grid-cols-auto-fit-cards flex flex-wrap justify-center gap-x-2 gap-y-4">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </main>
  );
};

export default MainPage;
