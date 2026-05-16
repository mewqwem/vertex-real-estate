type ApartmentWithImages = {
  image?: string;
  images?: string[];
};

export function getApartmentImages(apartment: ApartmentWithImages): string[] {
  if (apartment.images?.length) {
    return apartment.images;
  }
  if (apartment.image) {
    return [apartment.image];
  }
  return [];
}

export function getApartmentMainImage(
  apartment: ApartmentWithImages,
  fallback: string,
): string {
  return getApartmentImages(apartment)[0] ?? fallback;
}
