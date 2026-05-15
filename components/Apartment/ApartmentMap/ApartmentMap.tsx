"use client";

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
    <APIProvider apiKey={API_KEY}>
      <Map
        defaultCenter={position}
        defaultZoom={15}
        mapId={MAP_ID}
        disableDefaultUI={true}
        gestureHandling={"cooperative"}
      >
        <AdvancedMarker position={position} title={addressName}>
          <Pin />
        </AdvancedMarker>
      </Map>
    </APIProvider>
  );
}

export default ApartmentMap;
