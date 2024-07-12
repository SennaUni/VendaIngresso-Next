import { EventModel } from "@/models";

import Title from "@/components/Title";
import EventCard from "@/components/EventCard";

const MainPage = () => {
  const events: EventModel[] = [
    {
      id: '1',
      name: 'Nome evento fictício 01',
      organization: 'Oganização fictícia 01',
      date: '2024-12-30T00:00:00.000Z',
      location: 'Curitiba - Pr',
      price: 249.90,
      rating: '',
      image_url: ''
    },
    {
      id: '2',
      name: 'Nome evento fictício 02',
      organization: 'Oganização fictícia 02',
      date: '2024-10-30T00:00:00.000Z',
      location: 'São Paulo - Sp',
      price: 219.90,
      rating: '',
      image_url: ''
    },
    {
      id: '1',
      name: 'Nome evento fictício 03',
      organization: 'Oganização fictícia 03',
      date: '2024-08-30T00:00:00.000Z',
      location: 'Rio de Janeiro - Rj',
      price: 89.90,
      rating: '',
      image_url: ''
    }
  ];

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
