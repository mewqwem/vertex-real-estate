"use client";

import React from "react";
import css from "./ApartmentMap.module.css";
import {
  AdvancedMarker,
  APIProvider,
  Map,
  Pin,
} from "@vis.gl/react-google-maps";
import { API_KEY, MAP_ID } from "@/lib/api";

interface ApartmentMapProps {
  lat: number;
  lng: number;
  addressName?: string;
}

function ApartmentMap({ lat, lng, addressName }: ApartmentMapProps) {
  const position = { lat, lng };

  return (
    <section
      id="map"
      className={css.wrapper}
      style={{
        height: "400px",
        width: "100%",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        overflow: "hidden",
      }}
    >
      <h2>Address Map</h2>
      <APIProvider apiKey={API_KEY}>
        <Map
          defaultCenter={position}
          defaultZoom={15}
          mapId={MAP_ID}
          disableDefaultUI={true}
          gestureHandling={"cooperative"}
        >
          <AdvancedMarker position={position} title={addressName}>
            <Pin
              background={"#2563eb"}
              borderColor={"#1e40af"}
              glyphColor={"#ffffff"}
            />
          </AdvancedMarker>
        </Map>
      </APIProvider>
    </section>
  );
}

export default ApartmentMap;
