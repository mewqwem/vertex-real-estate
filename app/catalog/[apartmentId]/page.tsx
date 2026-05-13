import { getApartmentById } from "@/lib/api";
import React from "react";
import css from "./apartmentPage.module.css";
import axios from "axios";
import UniqButton from "@/components/UniqButton/UniqButton";
import GallerySwiper from "@/components/GallerySwiper/GallerySwiper";
import ApartmentPage from "@/components/Apartment/ApartmentPage/ApartmentPage";
import { IoArrowBackOutline } from "react-icons/io5";

async function page({ params }: { params: Promise<{ apartmentId: string }> }) {
  const { apartmentId } = await params;

  try {
    const apartment = await getApartmentById(apartmentId);

    return (
      <div className={`container ${css.contentWrapper}`}>
        <UniqButton type="routeBack" className={css.btnBack}>
          <IoArrowBackOutline className={css.BtnBackIcon} />
          Back to Catalog
        </UniqButton>
        <ApartmentPage apartment={apartment} />
      </div>
    );
  } catch (err: unknown) {
    let errorMessage = "An unexpected error occurred";

    if (axios.isAxiosError(err)) {
      errorMessage = err.response?.data?.message || err.message;
    } else if (err instanceof Error) {
      errorMessage = err.message;
    }
    return (
      <div className={css.errorWrapper}>
        <h1>Error</h1>
        <p className="neutralText">{errorMessage}</p>
        <div>
          <UniqButton type="routeBack">Go back to catalog</UniqButton>
        </div>
      </div>
    );
  }
}

export default page;
