import { Apartment } from "@/types/apartments";
import axios from "axios";

export const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "";
export const MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID;

export interface ApartmentsResponse {
  success: boolean;
  data: Apartment[];
  count: number;
}

const apartmentInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
});

export const getAllApartments = async () => {
  const { data } =
    await apartmentInstance.get<ApartmentsResponse>("apartments");
  return data;
};

export const getApartmentById = async (apartmentId: string) => {
  const { data } = await apartmentInstance.get<Apartment>(
    `/apartments/${apartmentId}`,
  );
  return data;
};

export const getAddressFromCoords = async (lat: number, lng: number) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&language=en&key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "OK") {
      return data.results[0].formatted_address;
    }
  } catch (error) {
    console.error("Error fetching address:", error);
  }
};
