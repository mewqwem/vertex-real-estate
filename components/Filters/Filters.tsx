"use client";

import css from "./Filters.module.css";
import fieldCss from "./PropertySearchFields.module.css";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { PriceRangeFilter } from "../UI/RangeInput/RangeInput";
import UniqButton from "../UniqButton/UniqButton";
import { TbFilterSearch } from "react-icons/tb";
import { useState } from "react";
import {
  APARTMENT_TYPE_OPTIONS,
  ApartmentFilters,
  ApartmentFiltersFormValues,
  PRICE_FILTER_MAX,
} from "@/types/apartmentFilters";
import {
  filtersToFormValues,
  formValuesToFilters,
} from "@/lib/apartmentFilters";

const validationSchema = Yup.object().shape({
  location: Yup.string(),
  dealType: Yup.string().oneOf(["buy", "rent"]),
  apartmentType: Yup.string(),
  priceRange: Yup.array().of(Yup.number().min(0)),
  rooms: Yup.string(),
  area: Yup.string(),
});

interface FiltersProps {
  apartmentsCount: number;
  filters: ApartmentFilters;
  onApplyFilters: (filters: ApartmentFilters) => void;
}

function Filters({
  apartmentsCount,
  filters,
  onApplyFilters,
}: FiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (values: ApartmentFiltersFormValues) => {
    onApplyFilters(formValuesToFilters(values));
    setIsOpen(false);
  };

  return (
    <>
      <div className={css.filterBtnWrapper}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={css.filterBtn}
          aria-label="Open search filters"
        >
          <TbFilterSearch className={css.filterIcon} />
          <span className={css.filterText}>Filters</span>
        </button>
      </div>
      <p className="neutralText">Found {apartmentsCount} appartments</p>

      {isOpen && (
        <div className={css.filtersWrapper}>
          <Formik
            enableReinitialize
            onSubmit={handleSubmit}
            initialValues={filtersToFormValues(filters)}
            validationSchema={validationSchema}
          >
            {({ values, setFieldValue }) => (
              <Form className={css.form}>
                <div className={fieldCss.radioGroup}>
                  <label className={fieldCss.radioLabel}>
                    <Field type="radio" name="dealType" value="buy" />
                    <span>Buy</span>
                  </label>
                  <label className={fieldCss.radioLabel}>
                    <Field type="radio" name="dealType" value="rent" />
                    <span>Rent</span>
                  </label>
                </div>

                <div className={fieldCss.fieldGroup}>
                  <Field
                    as="select"
                    name="apartmentType"
                    className={fieldCss.select}
                  >
                    {APARTMENT_TYPE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Field>
                </div>

                <div className={fieldCss.fieldGroup}>
                  <Field
                    name="location"
                    placeholder="City, region..."
                    className={fieldCss.input}
                  />
                </div>

                <PriceRangeFilter
                  min={0}
                  max={PRICE_FILTER_MAX}
                  value={values.priceRange}
                  onChange={(priceRange) =>
                    setFieldValue("priceRange", priceRange)
                  }
                />

                <label className={css.inputLabel}>
                  Rooms
                  <Field className="input" name="rooms" as="select">
                    <option value="">Any</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4+</option>
                  </Field>
                </label>

                <label className={css.inputLabel}>
                  Size (m2)
                  <Field className="input" name="area" type="number" />
                </label>

                <UniqButton type="submit">Search</UniqButton>
              </Form>
            )}
          </Formik>
        </div>
      )}
    </>
  );
}

export default Filters;
