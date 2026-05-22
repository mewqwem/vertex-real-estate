import { getApartmentById } from "@/lib/api";
import React from "react";
import css from "./apartmentPage.module.css";
import axios from "axios";
import UniqButton from "@/components/UI/UniqButton/UniqButton";
import ApartmentPage from "@/components/Apartment/ApartmentPage/ApartmentPage";
import { IoArrowBackOutline } from "react-icons/io5";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ apartmentId: string }>;
}) {
  try {
    const { apartmentId } = await params;
    const apartment = await getApartmentById(apartmentId);

    const mainImage =
      apartment.images && apartment.images.length > 0
        ? apartment.images[0]
        : "/placeholderImage.jpg";

    if (!apartment) return { title: "Apartment Not Found" };

    return {
      title: `${apartment.title} - RealVertexEstate`,
      description: apartment.description.slice(0, 160),
      openGraph: {
        title: apartment.title,
        description: apartment.description,
        images: [
          {
            url: mainImage,
            width: 1200,
            height: 630,
          },
        ],
      },
    };
  } catch (error) {
    console.error("Failed to generate metadata:", error);
    return { title: "Error Loading Apartment" };
  }
}

async function page({ params }: { params: Promise<{ apartmentId: string }> }) {
  const { apartmentId } = await params;

  try {
    const apartment = await getApartmentById(apartmentId);

    return (
      <>
        <UniqButton type="routeBack" className={css.btnBack}>
          <IoArrowBackOutline className={css.BtnBackIcon} />
          Back to Catalog
        </UniqButton>
        <section className={`container ${css.contentWrapper}`}>
          <ApartmentPage apartment={apartment} />
        </section>
      </>
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
