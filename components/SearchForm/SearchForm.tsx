"use client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import css from "./SearchForm.module.css";
import UniqButton from "../UniqButton/UniqButton";

type apartmentTypes =
  | "apartment"
  | "house"
  | "cottage"
  | "villa"
  | "townhouse"
  | "duplex"
  | "";

type dealTypes = "buy" | "rent";

interface SearchFormValues {
  location: string;
  apartmentType: apartmentTypes;
  dealType: dealTypes;
}

const initialValues: SearchFormValues = {
  location: "",
  apartmentType: "",
  dealType: "buy",
};

const validationSchema = Yup.object().shape({
  location: Yup.string().min(2, "Too short").required("Please enter location"),
  dealType: Yup.string()
    .oneOf(["buy", "rent"])
    .required("Please select deal type"),
});

function SearchForm() {
  const handleSubmit = (values: SearchFormValues) => {
    console.log("Form Data:", values);
  };
  return (
    <div className={css.formWrapper}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className={css.form}>
            {/* Радіо-кнопки (Deal Type) */}
            <div className={css.radioGroup}>
              <label className={css.radioLabel}>
                <Field type="radio" name="dealType" value="buy" />
                <span>Buy</span>
              </label>
              <label className={css.radioLabel}>
                <Field type="radio" name="dealType" value="rent" />
                <span>Rent</span>
              </label>
              <ErrorMessage
                name="dealType"
                component="span"
                className={css.error}
              />
            </div>
            {/* Селект Тип Апартаментів */}
            <div className={css.fieldGroup}>
              <Field as="select" name="apartmentType" className={css.select}>
                <option value="">Select property type</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="cottage">Cottage</option>
                <option value="villa">Villa</option>
                <option value="townhouse">Townhouse</option>
                <option value="duplex">Duplex</option>
              </Field>
              <ErrorMessage
                name="apartmentType"
                component="span"
                className={css.error}
              />
            </div>
            {/* Поле Локація */}
            <div className={css.fieldGroup}>
              <Field
                name="location"
                placeholder="City, region..."
                className={`${css.input} ${errors.location && touched.location ? css.isInvalid : ""}`}
              />
              <ErrorMessage
                name="location"
                component="span"
                className={css.error}
              />
            </div>

            <UniqButton type="submit">Search</UniqButton>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default SearchForm;
