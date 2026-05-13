export const formatDate = (isoString: string) => {
  return new Date(isoString).toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

//? Використання в компоненті:
//? <p>Опубліковано: {formatDate(apartment.createdAt)}</p>
//? Виведе: 20.04.2026
