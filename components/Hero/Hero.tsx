import React from "react";
import css from "./Hero.module.css";
import SearchForm from "../SearchForm/SearchForm";

function Hero() {
  return (
    <div className={`container ${css.wrapper}`}>
      <h1 className={css.title}>Find your perfect home</h1>
      <p className={css.text}>
        Verified properties with legal and professional support
      </p>
      <SearchForm />
    </div>
  );
}

export default Hero;
