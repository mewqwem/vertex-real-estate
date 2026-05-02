"use client";

import React from "react";
import css from "./Filters.module.css";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { PriceRangeFilter } from "../UI/RangeInput/RangeInput";

interface FiltersValue {
  priceRange: number[];
  rooms: number;
  size: number;
}

const initialValues: FiltersValue = { priceRange: [0, 0], rooms: 0, size: 0 };

const validationSchema = Yup.object().shape({
  priceRange: Yup.number(),
  rooms: Yup.number(),
  size: Yup.number(),
});

function Filters() {
  const handleSubmit = () => {
    console.log("hi");
  };

  const handleChange = (value: number | number[]) => {
    console.log(value);
  };

  return (
    <div className={css.filtersWrapper}>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <Form className={css.form}>
          <PriceRangeFilter min={0} max={9999} onChange={handleChange} />
          <label className={css.inputLabel}>
            Rooms
            <Field className={`input`} name="rooms" as="select">
              <option value="">Any</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4+</option>
            </Field>
          </label>
          <label className={css.inputLabel}>
            Size (m2)
            <Field className={`input`} name="size" type="number"></Field>
          </label>
        </Form>
      </Formik>
    </div>
  );
}

export default Filters;
