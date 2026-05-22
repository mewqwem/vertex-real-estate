import React from "react";
import css from "./Hero.module.css";
import SearchForm from "../SearchForm/SearchForm";
import ScrollButton from "@/components/UI/ScrollButton/ScrollButton";
import HeroBadges from "../HeroBadges/HeroBadges";

function Hero() {
  return (
    <>
      <div className={`${css.wrapper}`}>
        <h1 className={css.title}>Find your perfect home</h1>
        <p className={css.text}>
          Verified properties with legal and professional support
        </p>
      </div>
      <div className={`${css.formWrapper}`}>
        <SearchForm />
      </div>
      <div className={`${css.wrapper}`}>
        <HeroBadges />
      </div>
      <ScrollButton />
    </>
  );
}

export default Hero;
