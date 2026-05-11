"use client";

import { getAllApartments } from "@/lib/api";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import ApartmentList from "../ApartmentList/ApartmentList";
import Filters from "../../Filters/Filters";
import css from "./ApartmentClient.module.css";
import { TailSpin } from "react-loader-spinner";
import UniqButton from "@/components/UniqButton/UniqButton";
import { IoReload } from "react-icons/io5";

function ApartmentClient() {
  const { data, isError, isLoading, isFetching, error, refetch } = useQuery({
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
      {isFetching ? (
        <div className={css.loadingApartments}>
          <TailSpin color="var(--primary)" />
          Loading...
        </div>
      ) : isError ? (
        <div className={css.errorWrapper}>
          <p>Something went wrong. Please try again later.</p>
          <UniqButton onClick={() => refetch()}>
            Try again
            <IoReload />
          </UniqButton>
        </div>
      ) : (
        <ApartmentList apartments={apartments} />
      )}
    </div>
  );
}

export default ApartmentClient;
