"use client";

import { getAllApartments } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

function ApartmentList() {
  const { data, isError, isLoading, isFetching } = useQuery({
    queryKey: ["getAllApartments"],
    queryFn: () => getAllApartments(),
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
  });

  console.log(data);

  return <div></div>;
}

export default ApartmentList;
