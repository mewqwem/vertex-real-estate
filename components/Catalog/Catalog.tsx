import React from "react";
import css from "./Catalog.module.css";
import Filters from "../Filters/Filters";

function Catalog() {
  return (
    <div className={`container`}>
      <div className={css.titleWrapper}>
        <h2 className={css.sectionTitle}>Catalog</h2>
      </div>
      <Filters />
    </div>
  );
}

export default Catalog;
