import { Apartment } from "@/types/apartments";
import React from "react";
import css from "./ApartmentPage.module.css";
import GallerySwiper from "@/components/GallerySwiper/GallerySwiper";
import { TbCurrentLocation } from "react-icons/tb";
import FeaturesList from "@/components/FeaturesList/FeaturesList";
import { formatDate } from "@/helpers/formatDate";
import TagList from "@/components/UI/TagList/TagList";
import ApartmentMap from "../ApartmentMap/ApartmentMap";
import { API_KEY, MAP_ID } from "@/lib/api";
import Link from "next/link";

interface ApartmentPageProps {
  apartment: Apartment;
}

function ApartmentPage({ apartment }: ApartmentPageProps) {
  const apartmentGallery = apartment.images;
  const features = apartment.features;

  return (
    <>
      <div className={css.wrapper}>
        <div className={css.galleryWrapper}>
          <GallerySwiper apartmentGallery={apartmentGallery} />
        </div>
        <div className={css.apartmentInfo}>
          <div className={`${css.headerInfo} ${css.apartmentInfoItem}`}>
            <div className={css.headerTitle}>
              <h1 className={css.title}>{apartment.title}</h1>
              <Link
                href={"#map"}
                className={`${css.location} ${css.locationLink}`}
              >
                <TbCurrentLocation />
                {apartment.location.address}
              </Link>
            </div>
            <div className={css.createdAtText}>
              Created at {formatDate(apartment.createdAt)}
            </div>
          </div>
          <div className={css.decorateLine}></div>
          <div className={`${css.tagList} ${css.apartmentInfoItem}`}>
            <TagList
              rooms={apartment.rooms}
              area={apartment.area}
              floor={apartment.floor}
              totalFloors={apartment.totalFloors}
            />
          </div>
          <div className={css.decorateLine}></div>
          <div
            className={`${css.ApartmentDescription} ${css.apartmentInfoItem}`}
          >
            <h2 className={css.apartmentSubTitle}>Description</h2>
            <p className={css.apartmentDescriptionText}>
              {apartment.description}
            </p>
          </div>
        </div>
        <ApartmentMap
          lat={parseFloat(apartment.location.lat)}
          lng={parseFloat(apartment.location.lng)}
          addressName={"asd"}
        />
      </div>
    </>
  );
}

export default ApartmentPage;
