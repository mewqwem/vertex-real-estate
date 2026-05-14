export interface Apartment {
  _id: number;
  title: string;
  location: Location;
  price: number;
  currency: string;
  rooms: number;
  area: number;
  floor: number;
  totalFloors: 9;
  description: string;
  images: string[];
  features: string[];
  createdAt: string;
  status: string;
}

interface Location {
  address: string;
  lat: string;
  lng: string;
}
