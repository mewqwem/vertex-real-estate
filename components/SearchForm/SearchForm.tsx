"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import css from "./SearchForm.module.css";
import UniqButton from "../UniqButton/UniqButton";
import {
  APARTMENT_TYPE_OPTIONS,
  ApartmentType,
  DealType,
} from "@/types/apartmentFilters";
import { filtersToSearchParams } from "@/lib/apartmentFilters";

interface SearchFormValues {
  location: string;
  apartmentType: ApartmentType | "";
  dealType: DealType;
}

const initialValues: SearchFormValues = {
  location: "",
  apartmentType: "",
  dealType: "buy",
};

const validationSchema = Yup.object().shape({
  location: Yup.string().min(2, "Too short"),
  dealType: Yup.string()
    .oneOf(["buy", "rent"])
    .required("Please select deal type"),
});

function SearchForm() {
  const router = useRouter();

  const handleSubmit = (values: SearchFormValues) => {
    const query = filtersToSearchParams({
      location: values.location.trim(),
      dealType: values.dealType,
      apartmentType: values.apartmentType ? values.apartmentType : undefined,
    });

    router.push(`/catalog?${query}`);
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
            <div className={css.radioGroup}>
              <label className={css.radioLabel}>
                <Field type="radio" name="dealType" value="buy" />
                <span>Buy</span>
              </label>
              <label className={css.radioLabel}>
                <Field type="radio" name="dealType" value="rent" />
                <span>Rent</span>
              </label>
            </div>

            <div className={css.fieldGroup}>
              <Field as="select" name="apartmentType" className={css.select}>
                {APARTMENT_TYPE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label === "Any property type"
                      ? "Select property type"
                      : option.label}
                  </option>
                ))}
              </Field>
            </div>

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
