export interface Apartment {
  _id: string;
  title: string;
  location: Location;
  price: number;
  currency: string;
  rooms: number;
  area: number;
  floor: number;
  totalFloors: number;
  description: string;
  image?: string;
  images?: string[];
  features: string[];
  createdAt?: string;
  status: string;
  dealType?: "buy" | "rent";
  apartmentType?: string;
}

interface Location {
  address: string;
  lat: number | string;
  lng: number | string;
}
