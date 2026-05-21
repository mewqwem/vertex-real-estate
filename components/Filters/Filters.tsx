"use client";

import css from "./Filters.module.css";
import fieldCss from "./PropertySearchFields.module.css";
import { Field, Form, Formik, FormikProps } from "formik";
import * as Yup from "yup";
import { PriceRangeFilter } from "../UI/RangeInput/RangeInput";
import UniqButton from "../UniqButton/UniqButton";
import { TbFilterSearch } from "react-icons/tb";
import { useRef, useState } from "react";
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
import { AutoCompletePlace } from "../UI/AutoCompletePlace/AutoCompletePlace";

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
  isLoading: boolean;
  isError: boolean;
}

function Filters({
  apartmentsCount,
  filters,
  onApplyFilters,
  isLoading,
  isError,
}: FiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const formikRef = useRef<FormikProps<ApartmentFiltersFormValues>>(null);

  const isFiltersEmpty = Object.keys(filters).length === 0;

  const handleSubmit = (values: ApartmentFiltersFormValues) => {
    onApplyFilters(formValuesToFilters(values));
    setIsOpen(false);
  };

  const handleClearAll = () => {
    const currentDealType = formikRef.current?.values?.dealType;

    const emptyValues = filtersToFormValues({});

    if (currentDealType) {
      emptyValues.dealType = currentDealType;
    }

    if (formikRef.current) {
      formikRef.current.resetForm({ values: emptyValues });
    }

    onApplyFilters(currentDealType ? { dealType: currentDealType } : {});
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
            innerRef={formikRef}
            enableReinitialize
            onSubmit={handleSubmit}
            initialValues={filtersToFormValues(filters)}
            validationSchema={validationSchema}
          >
            {({ values, setFieldValue }) => {
              return (
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
                    {/* <Field
                      name="location"
                      placeholder="City, region..."
                      className={fieldCss.input}
                    /> */}
                    <AutoCompletePlace
                      name="location"
                      placeholder="City, region..."
                      className={`fieldCss.input`}
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

                  {/* <label className={css.inputLabel}>
                    Size (m2)
                    <Field className="input" name="area" type="number" />
                  </label> */}

                  <div className={css.buttonsWrapper}>
                    <div className={css.btnWrapper}>
                      <UniqButton type="submit">Search</UniqButton>
                    </div>

                    {!isFiltersEmpty && (
                      <div className={css.btnWrapper}>
                        <UniqButton
                          type="button"
                          onClick={handleClearAll}
                          className={css.resetButton}
                        >
                          Clear all
                        </UniqButton>
                      </div>
                    )}
                  </div>
                </Form>
              );
            }}
          </Formik>
        </div>
      )}
      {apartmentsCount === 0 && !isLoading && !isError && (
        <>
          <div className={css.errorWrapper}>
            <h1 className={css.errorTitle}>No appartments found</h1>
            <p className={css.errorText}>
              There are no items matching your selected filters. Try adjusting
              your settings.
            </p>
          </div>
          <UniqButton
            type="button"
            onClick={handleClearAll}
            className={css.resetButton}
          >
            Clear all
          </UniqButton>
        </>
      )}
    </>
  );
}

export default Filters;
