import { Apartment } from "@/types/apartments";
import axios from "axios";

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
