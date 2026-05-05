import React from "react";
import css from "./Catalog.module.css";
import Filters from "../Filters/Filters";
import ApartmentList from "../ApartmentList/ApartmentList";

function Catalog() {
  return (
    <div className={`container`}>
      <div className={css.titleWrapper}>
        <h2 className={css.sectionTitle}>Catalog</h2>
      </div>
      <Filters />
      <ApartmentList />
    </div>
  );
}

export default Catalog;
