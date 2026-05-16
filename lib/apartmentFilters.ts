import {
  ApartmentFilters,
  ApartmentFiltersFormValues,
  PRICE_FILTER_MAX,
} from "@/types/apartmentFilters";

export function buildApartmentParams(
  filters: ApartmentFilters,
): Record<string, string | number> {
  const params: Record<string, string | number> = {};

  if (filters.location?.trim()) {
    params.location = filters.location.trim();
  }
  if (filters.dealType) {
    params.dealType = filters.dealType;
  }
  if (filters.apartmentType) {
    params.apartmentType = filters.apartmentType;
  }
  if (filters.minPrice != null && filters.minPrice > 0) {
    params.minPrice = filters.minPrice;
  }
  if (filters.maxPrice != null && filters.maxPrice < PRICE_FILTER_MAX) {
    params.maxPrice = filters.maxPrice;
  }
  if (filters.rooms != null && filters.rooms > 0) {
    params.rooms = filters.rooms;
  }
  if (filters.area != null && filters.area > 0) {
    params.area = filters.area;
  }

  return params;
}

export function filtersToSearchParams(filters: ApartmentFilters): string {
  const params = new URLSearchParams();

  Object.entries(buildApartmentParams(filters)).forEach(([key, value]) => {
    params.set(key, String(value));
  });

  return params.toString();
}

export function parseFiltersFromSearchParams(
  searchParams: URLSearchParams,
): ApartmentFilters {
  const filters: ApartmentFilters = {};

  const location = searchParams.get("location");
  if (location?.trim()) {
    filters.location = location.trim();
  }

  const dealType = searchParams.get("dealType");
  if (dealType === "buy" || dealType === "rent") {
    filters.dealType = dealType;
  }

  const apartmentType = searchParams.get("apartmentType");
  if (apartmentType) {
    filters.apartmentType = apartmentType as ApartmentFilters["apartmentType"];
  }

  const minPrice = searchParams.get("minPrice");
  if (minPrice != null && minPrice !== "") {
    filters.minPrice = Number(minPrice);
  }

  const maxPrice = searchParams.get("maxPrice");
  if (maxPrice != null && maxPrice !== "") {
    filters.maxPrice = Number(maxPrice);
  }

  const rooms = searchParams.get("rooms");
  if (rooms != null && rooms !== "") {
    filters.rooms = Number(rooms);
  }

  const area = searchParams.get("area");
  if (area != null && area !== "") {
    filters.area = Number(area);
  }

  return filters;
}

export function filtersToFormValues(
  filters: ApartmentFilters,
): ApartmentFiltersFormValues {
  return {
    location: filters.location ?? "",
    dealType: filters.dealType ?? "buy",
    apartmentType: filters.apartmentType ?? "",
    priceRange: [filters.minPrice ?? 0, filters.maxPrice ?? PRICE_FILTER_MAX],
    rooms: filters.rooms ? String(filters.rooms) : "",
    area: filters.area ? String(filters.area) : "",
  };
}

export function formValuesToFilters(
  values: ApartmentFiltersFormValues,
): ApartmentFilters {
  const [minPrice, maxPrice] = values.priceRange;

  return {
    location: values.location.trim() || undefined,
    dealType: values.dealType,
    apartmentType: values.apartmentType || undefined,
    minPrice: minPrice > 0 ? minPrice : undefined,
    maxPrice:
      maxPrice > 0 && maxPrice < PRICE_FILTER_MAX ? maxPrice : undefined,
    rooms: values.rooms ? Number(values.rooms) : undefined,
    area: values.area ? Number(values.area) : undefined,
  };
}
