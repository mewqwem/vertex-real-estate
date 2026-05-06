"use client";

import { getAllApartments } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ApartmentList from "../ApartmentList/ApartmentList";
import Filters from "../../Filters/Filters";
import css from "./ApartmentClient.module.css";

function ApartmentClient() {
  const { data, isError, isLoading, isFetching, error } = useQuery({
    queryKey: ["getAllApartments"],
    queryFn: () => getAllApartments(),
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
  });

  const apartments = data?.data || [];
  const apartmentsCount = data?.count || 0;

  return (
    <div className={css.wrapper}>
      <Filters apartmentsCount={apartmentsCount} />
      <ApartmentList apartments={apartments} />
    </div>
  );
}

export default ApartmentClient;
