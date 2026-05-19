"use client";

// import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Lightbox from "yet-another-react-lightbox";

import css from "./GallerySwiper.module.css";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "yet-another-react-lightbox/styles.css";

// import required modules
import { Pagination, Navigation } from "swiper/modules";
import Image from "next/image";
import { useState } from "react";

interface GallerySwiperProps {
  apartmentGallery: string[];
}

function GallerySwiper({ apartmentGallery }: GallerySwiperProps) {
  const placeholderImage = "/placeholderImage.jpg";
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [failedImages, setFailedImages] = useState<Set<number>>(new Set());

  const gallery =
    apartmentGallery &&
    Array.isArray(apartmentGallery) &&
    apartmentGallery.length > 0
      ? apartmentGallery
      : [placeholderImage];

  const handleImageError = (imageIndex: number) => {
    setFailedImages((prev) => new Set(prev).add(imageIndex));
  };

  const getImageSrc = (imageIndex: number) => {
    return failedImages.has(imageIndex)
      ? placeholderImage
      : gallery[imageIndex];
  };

  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className={css.swiper}
      >
        {gallery.map((url, imageIndex) => (
          <SwiperSlide
            key={imageIndex}
            onClick={() => {
              setIndex(imageIndex);
              setIsOpen(true);
            }}
          >
            <Image
              src={getImageSrc(imageIndex)}
              alt={`Photo ${imageIndex + 1}`}
              className={css.image}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 1024px"
              fill
              style={{ cursor: "zoom-in" }}
              onError={() => handleImageError(imageIndex)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        index={index}
        slides={gallery.map((url, imageIndex) => ({
          src: failedImages.has(imageIndex) ? placeholderImage : url,
        }))}
        className={css.modal}
        controller={{ closeOnBackdropClick: true }}
        animation={{ fade: 300 }}
      />
    </>
  );
}
export default GallerySwiper;
