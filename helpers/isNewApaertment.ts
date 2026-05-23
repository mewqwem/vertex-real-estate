export const isNewApartment = (createdAt?: string): boolean => {
  if (!createdAt) return false;
  const apartmentDate = new Date(createdAt);
  const now = new Date();
  const daysAgo =
    (now.getTime() - apartmentDate.getTime()) / (1000 * 60 * 60 * 24);
  return daysAgo <= 7;
};
