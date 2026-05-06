"use client";

import { useState } from "react";
import Image from "next/image";
import { TailSpin } from "react-loader-spinner";
import css from "./ApartmentItem.module.css";
import { Apartment } from "@/types/apartments";
import { LuBed, LuSquareDashed } from "react-icons/lu";
import { RiStairsLine } from "react-icons/ri";
import { IoLocationOutline } from "react-icons/io5";
import UniqButton from "../../UniqButton/UniqButton";
import { GoLinkExternal } from "react-icons/go";

interface ApartmentItemProps {
  apartment: Apartment;
}

const isNewApartment = (createdAt: string): boolean => {
  const apartmentDate = new Date(createdAt);
  const now = new Date();
  const daysAgo =
    (now.getTime() - apartmentDate.getTime()) / (1000 * 60 * 60 * 24);
  return daysAgo <= 30;
};

const isHotPrice = (price: number): boolean => {
  const apartmentPrice = price;
  const isHotPrice = apartmentPrice <= 450000;

  return isHotPrice;
};

const ApartmentItem = ({ apartment }: ApartmentItemProps) => {
  const placeholderImage = "/placeholderImage.jpg";
  const [isLoading, setIsLoading] = useState(true);
  const [imgSrc, setImgSrc] = useState(apartment.image || placeholderImage);

  return (
    <li className={css.apartmentItem}>
      <div className={css.imageWrapper}>
        <div className={css.badgesContainer}>
          {isNewApartment(apartment.createdAt) && (
            <div className={`${css.badge} ${css.new}`}>New</div>
          )}
          {isHotPrice(apartment.price) && (
            <div className={`${css.badge} ${css.hot}`}>Hot</div>
          )}
        </div>
        {isLoading && (
          <div className={css.loading}>
            <TailSpin
              height="40"
              width="40"
              color="#505050"
              ariaLabel="tail-spin-loading"
            />
          </div>
        )}

        <Image
          src={imgSrc}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt={apartment.title}
          className={css.apartmentImage}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setImgSrc(placeholderImage);
            setIsLoading(false);
          }}
        />
      </div>
      <div className={css.apartmentInfo}>
        <div className={css.apartmentHead}>
          <h3 className={css.apartmentTitle}>{apartment.title}</h3>
          <div className={css.apartmentPriceWrapper}>
            <p className={css.apartmentPrice}>{apartment.price} $</p>
          </div>
        </div>
        <p className={css.location}>
          <IoLocationOutline />
          {apartment.location}
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
        <UniqButton>
          More details <GoLinkExternal />
        </UniqButton>
      </div>
    </li>
  );
};

export default ApartmentItem;
