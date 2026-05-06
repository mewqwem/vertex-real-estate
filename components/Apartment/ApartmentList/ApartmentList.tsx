import { Apartment } from "@/types/apartments";
import css from "./ApartmentList.module.css";
import ApartmentItem from "../ApartmentItem/ApartmentItem";

interface ApartmentListProps {
  apartments: Apartment[];
}

function ApartmentList({ apartments }: ApartmentListProps) {
  return (
    <ul className={css.apartmentList}>
      {apartments.map((apartment) => (
        <ApartmentItem key={apartment.id} apartment={apartment} />
      ))}
    </ul>
  );
}

export default ApartmentList;
