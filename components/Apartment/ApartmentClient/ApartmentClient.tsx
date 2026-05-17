"use client";

import { getAllApartments } from "@/lib/api";
import {
  filtersToSearchParams,
  parseFiltersFromSearchParams,
} from "@/lib/apartmentFilters";
import { ApartmentFilters } from "@/types/apartmentFilters";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useEffect, useRef } from "react";
import ApartmentList from "../ApartmentList/ApartmentList";
import Filters from "../../Filters/Filters";
import css from "./ApartmentClient.module.css";
import { TailSpin } from "react-loader-spinner";
import UniqButton from "@/components/UniqButton/UniqButton";
import { IoReload } from "react-icons/io5";

function ApartmentClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const listWrapperRef = useRef<HTMLDivElement>(null);
  const prevItemsCountRef = useRef(0);

  const filters = useMemo(
    () => parseFiltersFromSearchParams(searchParams),
    [searchParams],
  );

  const applyFilters = useCallback(
    (nextFilters: ApartmentFilters) => {
      const query = filtersToSearchParams(nextFilters);
      router.replace(query ? `/catalog?${query}` : "/catalog", {
        scroll: false,
      });
    },
    [router],
  );

  const {
    data,
    isError,
    isLoading,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["getAllApartments", filters],
    queryFn: ({ pageParam }) => getAllApartments(pageParam, filters),
    getNextPageParam: (lastPage) => {
      const currentPage = Number(lastPage.page);
      return currentPage < lastPage.totalPages ? currentPage + 1 : undefined;
    },
    initialPageParam: 1,
  });

  const apartments = data?.pages.flatMap((page) => page.apartments) ?? [];
  const apartmentsCount = data?.pages[0]?.totalItems ?? 0;

  useEffect(() => {
    if (
      apartments.length > prevItemsCountRef.current &&
      listWrapperRef.current
    ) {
      const listContainer = listWrapperRef.current.firstElementChild;

      if (listContainer && listContainer.children) {
        const firstNewItem = listContainer.children[
          prevItemsCountRef.current
        ] as HTMLElement;

        if (firstNewItem) {
          firstNewItem.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });
        }
      }
    }

    prevItemsCountRef.current = apartments.length;
  }, [apartments]);

  return (
    <div className={css.wrapper}>
      <Filters
        apartmentsCount={apartmentsCount}
        filters={filters}
        onApplyFilters={applyFilters}
        isLoading={isLoading}
      />

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
          <div ref={listWrapperRef}>
            <ApartmentList apartments={apartments} />
          </div>

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
