export type EventModel = {
  id: string;
  name: string;
  organization: string;
  date: string;
  price: number;
  rating: string;
  image_url: string;
  location: string;
};

export type SpotModel = {
  id: string;
  name: string;
  status: string;
};

export type EventSpotsModel = {
  event: EventModel;
  spots: SpotModel[];
};
