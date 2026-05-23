import React, { Suspense } from "react";
import css from "./Catalog.module.css";
import ApartmentClient from "../Apartment/ApartmentClient/ApartmentClient";
import Spinner from "../UI/Spinner/Spinner";

function Catalog() {
  return (
    <div className={`container`}>
      <div className={css.titleWrapper}>
        <h2 className={css.sectionTitle}>Catalog</h2>
      </div>
      <Suspense
        fallback={
          <div
            style={{ display: "flex", justifyContent: "center", padding: 40 }}
          >
            <Spinner size={40} />
          </div>
        }
      >
        <ApartmentClient />
      </Suspense>
    </div>
  );
}

export default Catalog;
