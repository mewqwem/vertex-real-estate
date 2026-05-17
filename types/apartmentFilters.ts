export type DealType = "buy" | "rent";

export type ApartmentType =
  | "apartment"
  | "house"
  | "cottage"
  | "villa"
  | "townhouse"
  | "duplex"
  | "commercial";

export interface ApartmentFilters {
  location?: string;
  dealType?: DealType;
  apartmentType?: ApartmentType | "";
  minPrice?: number;
  maxPrice?: number;
  rooms?: number;
  area?: number;
}

export interface ApartmentFiltersFormValues {
  location: string;
  dealType: DealType;
  apartmentType: ApartmentType | "";
  priceRange: [number, number];
  rooms: string;
  area: string;
}

export const PRICE_FILTER_MAX = 999999;

export const APARTMENT_TYPE_OPTIONS: {
  value: ApartmentType | "";
  label: string;
}[] = [
  { value: "", label: "Any property type" },
  { value: "apartment", label: "Apartment" },
  { value: "house", label: "House" },
  { value: "cottage", label: "Cottage" },
  { value: "villa", label: "Villa" },
  { value: "townhouse", label: "Townhouse" },
  { value: "duplex", label: "Duplex" },
  { value: "commercial", label: "Commercial" },
];
