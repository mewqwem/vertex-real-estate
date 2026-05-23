"use client";

import ApartmentItem from "@/components/Apartment/ApartmentItem/ApartmentItem";
import { getHotOffers } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import css from ".//HotOffersClient.module.css";
import { FiArrowRightCircle } from "react-icons/fi";
import Link from "next/link";
import Spinner from "@/components/UI/Spinner/Spinner";

function HotOffersClient() {
  const {
    data: apartments,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["getHotOffers"],
    queryFn: getHotOffers,
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading)
    return (
      <div className={css.errorWrapper}>
        <Spinner size={40} />
        Loading...
      </div>
    );
  if (isError) return <div>Error</div>;

  return (
    <>
      <h2 className={css.sectionTitle}>Hot Offers</h2>
      <p className={css.decription}>Lorem ipsum dolor sit amet</p>
      <ul className={css.apartmentList}>
        {apartments?.map((apartment, index) => (
          <ApartmentItem
            key={apartment._id}
            apartment={apartment}
            apartmentIndex={index}
          />
        ))}
        <li className={css.showMoreCard}>
          <Link href="/catalog" className={css.showMoreLink}>
            <p className={css.showMoreText}>
              Show More <FiArrowRightCircle className={css.arrowIcon} />
            </p>
          </Link>
        </li>
      </ul>
    </>
  );
}

export default HotOffersClient;
