import { Apartment } from "@/types/apartments";
import css from "./ApartmentList.module.css";
import ApartmentItem from "../ApartmentItem/ApartmentItem";

interface ApartmentListProps {
  apartments: Apartment[];
}

function ApartmentList({ apartments }: ApartmentListProps) {
  return (
    <ul className={css.apartmentList}>
      {apartments
        .filter((apartment) => apartment.status !== "Archive")
        .map((apartment, index) => (
          <ApartmentItem
            key={apartment._id}
            apartment={apartment}
            apartmentIndex={index}
          />
        ))}
    </ul>
  );
}

export default ApartmentList;
