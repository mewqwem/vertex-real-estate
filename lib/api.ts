import axios from "axios";

const apartmentInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
});

export const getAllApartments = async () => {
  const { data } = await apartmentInstance.get("/apartments");
  return data;
};
