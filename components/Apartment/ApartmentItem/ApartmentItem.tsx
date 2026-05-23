"use client";

import { useState } from "react";
import Image from "next/image";
import css from "./ApartmentItem.module.css";
import Link from "next/link";

import UniqButton from "../../UI/UniqButton/UniqButton";

import { getApartmentMainImage } from "@/helpers/getApartmentImages";
import { getSalePrice } from "@/helpers/salePercent";
import { isNewApartment } from "@/helpers/isNewApaertment";

import { Apartment } from "@/types/apartments";

import { LuBed, LuSquareDashed } from "react-icons/lu";
import { RiStairsLine } from "react-icons/ri";
import { IoLocationOutline } from "react-icons/io5";
import { GoLinkExternal } from "react-icons/go";
import Spinner from "@/components/UI/Spinner/Spinner";

interface ApartmentItemProps {
  apartment: Apartment;
  apartmentIndex: number;
}

const handleClickApartment = () => {};

const ApartmentItem = ({ apartment, apartmentIndex }: ApartmentItemProps) => {
  const placeholderImage = "/placeholderImage.jpg";

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const mainImage = getApartmentMainImage(apartment, placeholderImage);
  const finalSrc = hasError ? placeholderImage : mainImage;

  const discountPercent = getSalePrice(apartment.price, apartment.salePrice);

  return (
    <li className={css.apartmentItem}>
      <div className={css.imageWrapper}>
        <div className={css.badgesContainer}>
          {isNewApartment(apartment.createdAt) && (
            <div className={`${css.badge} ${css.new}`}>New</div>
          )}
          {apartment.salePrice !== null && (
            <div className={`${css.badge} ${css.discount}`}>
              -{discountPercent}%
            </div>
          )}
        </div>

        {isLoading && (
          <div className={css.loading}>
            <Spinner size={40} />
          </div>
        )}

        <Link href={`/catalog/${apartment._id}`} className={css.link}>
          <Image
            src={finalSrc}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt={apartment.title}
            className={css.apartmentImage}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setHasError(true);
              setIsLoading(false);
            }}
            priority={apartmentIndex < 3}
          />
        </Link>
      </div>
      <div className={css.apartmentInfo}>
        <div className={css.apartmentHead}>
          <h3 className={css.apartmentTitle}>{apartment.title}</h3>
          <div className={css.apartmentPriceWrapper}>
            {apartment.salePrice !== null ? (
              <>
                <div className={css.salePriceWrapper}>
                  <span className={css.salePrice}>{apartment.price} $</span>
                  <p
                    className={`${css.apartmentPrice} ${css.apartmentSalePrice}`}
                  >
                    {apartment.salePrice} $
                  </p>
                </div>
              </>
            ) : (
              <p className={css.apartmentPrice}>{apartment.price} $</p>
            )}
          </div>
        </div>
        <p className={css.location}>
          <IoLocationOutline />
          {apartment.location.address}
        </p>
        <div className={css.tagList}>
          <div className={css.tag}>
            <LuBed />
            {apartment.rooms}
          </div>
          <div className={css.tag}>
            <LuSquareDashed />
            {apartment.area}м²
          </div>
          <div className={css.tag}>
            <RiStairsLine />
            {apartment.floor}
          </div>
        </div>
      </div>
      <div className={css.separator}></div>
      <div className={css.btnWrapper}>
        <UniqButton
          type="link"
          href={`/catalog/${apartment._id}`}
          onClick={handleClickApartment}
        >
          More details <GoLinkExternal />
        </UniqButton>
      </div>
    </li>
  );
};

export default ApartmentItem;
