"use client";
import { getApartmentImages } from "@/helpers/getApartmentImages";
import { Apartment } from "@/types/apartments";
import css from "./ApartmentPage.module.css";
import GallerySwiper from "@/components/GallerySwiper/GallerySwiper";
import { TbCurrentLocation } from "react-icons/tb";
import { formatDate } from "@/helpers/formatDate";
import TagList from "@/components/UI/TagList/TagList";
import ApartmentMap from "../ApartmentMap/ApartmentMap";
import Link from "next/link";
import FeaturesList from "@/components/FeaturesList/FeaturesList";
import { MdChecklistRtl } from "react-icons/md";
import { BsGeoAlt } from "react-icons/bs";
import ApartmentPrice from "./ApartmentPrice/ApartmentPrice";
import { LiaCoinsSolid } from "react-icons/lia";
import UniqButton from "@/components/UniqButton/UniqButton";

interface ApartmentPageProps {
  apartment: Apartment;
}

function ApartmentPage({ apartment }: ApartmentPageProps) {
  const apartmentGallery = getApartmentImages(apartment);
  const googleMapsUrl = `https://www.google.com/maps?q=${apartment.location.lat},${apartment.location.lng}`;

  const scrollToMap = () => {
    const mapElement = document.getElementById("map");
    if (mapElement) {
      mapElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <div className={css.wrapper}>
        <div className={css.galleryWrapper}>
          <GallerySwiper apartmentGallery={apartmentGallery} />
        </div>
        <section className={`${css.apartmentInfo} ${css.appWrapper}`}>
          <div className={`${css.headerInfo} ${css.apartmentInfoItem}`}>
            <div className={css.headerTitle}>
              <h1 className={css.title}>{apartment.title}</h1>
              <UniqButton
                className={`${css.location} ${css.locationLink}`}
                onClick={scrollToMap}
              >
                <TbCurrentLocation />
                {apartment.location.address}
              </UniqButton>
            </div>
            {apartment.createdAt && (
              <div className={css.createdAtText}>
                Created at {formatDate(apartment.createdAt)}
              </div>
            )}
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
          <h2 className={css.sectionTitle}>Description</h2>
          <p className={css.apartmentDescriptionText}>
            {apartment.description}
          </p>
        </section>
        <section className={`${css.appWrapper}`} id="map">
          <div className={css.mapHeader}>
            <div className={css.mapHeaderTitleWrapper}>
              <h2 className={css.sectionTitle}>
                Adress Map <BsGeoAlt />
              </h2>
              <Link
                href={googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className={`${css.locationLink}`}
              >
                Show on Google Maps
              </Link>
            </div>
            <p className={`${css.location}`}>
              <TbCurrentLocation />
              {apartment.location.address}
            </p>
          </div>
          <div className={css.mapWrapper}>
            <ApartmentMap
              lat={Number(apartment.location.lat)}
              lng={Number(apartment.location.lng)}
              addressName={apartment.location.address}
            />
          </div>
        </section>
        <section className={`${css.appWrapper}`}>
          <h2 className={css.sectionTitle}>
            Features <MdChecklistRtl />
          </h2>
          <FeaturesList features={apartment.features} />
        </section>
        <section className={`${css.appWrapper} ${css.appPriceWrapper}`}>
          <h2 className={css.sectionTitle}>
            Price <LiaCoinsSolid />
          </h2>
          <ApartmentPrice price={apartment.price} />
        </section>
      </div>
    </>
  );
}

export default ApartmentPage;
