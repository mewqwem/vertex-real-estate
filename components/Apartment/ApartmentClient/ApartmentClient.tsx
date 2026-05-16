"use client";

import { getAllApartments } from "@/lib/api";
import { useInfiniteQuery } from "@tanstack/react-query";
import ApartmentList from "../ApartmentList/ApartmentList";
import Filters from "../../Filters/Filters";
import css from "./ApartmentClient.module.css";
import { TailSpin } from "react-loader-spinner";
import UniqButton from "@/components/UniqButton/UniqButton";
import { IoReload } from "react-icons/io5";

function ApartmentClient() {
  const {
    data,
    isError,
    isLoading,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["getAllApartments"],
    queryFn: ({ pageParam }) => getAllApartments(pageParam),
    getNextPageParam: (lastPage) => {
      const currentPage = Number(lastPage.page);
      return currentPage < lastPage.totalPages ? currentPage + 1 : undefined;
    },
    initialPageParam: 1,
  });

  const apartments = data?.pages.flatMap((page) => page.apartments) ?? [];
  const apartmentsCount = data?.pages[0]?.totalItems ?? 0;

  return (
    <div className={css.wrapper}>
      <Filters apartmentsCount={apartmentsCount} />
      {isLoading ? (
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
        <>
          <ApartmentList apartments={apartments} />
          {hasNextPage && (
            <UniqButton
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? "Loading..." : "Load More"}
            </UniqButton>
          )}
        </>
      )}
    </div>
  );
}

export default ApartmentClient;
