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
  const [isOpen, setIsOpen] = useState(false);
  const [index, setIndex] = useState(0);
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
        {apartmentGallery.map((url, index) => (
          <SwiperSlide
            key={index}
            onClick={() => {
              setIndex(index); // Запам'ятовуємо номер фото
              setIsOpen(true); // Відкриваємо модалку
            }}
          >
            <Image
              src={url}
              alt={`Photo ${index + 1}`}
              className={css.image}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 1024px"
              fill
              style={{ cursor: "zoom-in" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        index={index}
        slides={apartmentGallery.map((url) => ({ src: url }))}
        className={css.modal}
        controller={{ closeOnBackdropClick: true }}
        animation={{ fade: 300 }}
      />
    </>
  );
}
export default GallerySwiper;
