import React from "react";
import { useField } from "formik";
import {
  GeoapifyContext,
  GeoapifyGeocoderAutocomplete,
} from "@geoapify/react-geocoder-autocomplete";
import "@geoapify/geocoder-autocomplete/styles/minimal.css";

interface GeoapifyPlaceProperties {
  city?: string;
  country?: string;
  formatted?: string;
}

interface GeoapifyPlaceFeature {
  type: string;
  properties: GeoapifyPlaceProperties;
  geometry: {
    type: string;
    coordinates: [number, number];
  };
}

interface AutoCompletePlaceProps {
  name: string;
  placeholder?: string;
  className?: string;
}

export const AutoCompletePlace: React.FC<AutoCompletePlaceProps> = ({
  name,
  placeholder,
  className,
}) => {
  const [field, , helpers] = useField<string>(name);

  // Type explicitly as GeoapifyPlaceFeature or null when cleared
  const handlePlaceSelect = (value: GeoapifyPlaceFeature | null) => {
    if (value && value.properties) {
      const locationText = value.properties.city || "";
      helpers.setValue(locationText);
    } else {
      helpers.setValue("");
    }
  };

  const handleUserInput = (value: string) => {
    helpers.setValue(value);
  };

  return (
    <GeoapifyContext apiKey="ed9862435d28494487c94ef317cd085a">
      <div className={className}>
        <GeoapifyGeocoderAutocomplete
          placeholder={placeholder}
          type="city"
          value={field.value}
          placeSelect={handlePlaceSelect}
          onUserInput={handleUserInput}
        />
      </div>
    </GeoapifyContext>
  );
};
