import React from "react";
import css from "./TagList.module.css";
import { PiBed, PiResize, PiStairs } from "react-icons/pi";

interface TagListProps {
  rooms: number;
  area: number;
  floor: number;
  totalFloors?: number;
}

function TagList({ rooms, area, floor, totalFloors }: TagListProps) {
  return (
    <ul className={css.tagList}>
      <li className={css.tagItem}>
        <PiResize className={css.tagIcon} />
        <div className={css.tagContent}>
          <p className={css.tagNumber}>{area}м²</p>
          <p className={css.tagText}>Area</p>
        </div>
      </li>
      <li className={css.tagItem}>
        <PiBed className={css.tagIcon} />
        <div className={css.tagContent}>
          <p className={css.tagNumber}>{rooms}</p>
          <p className={css.tagText}>Rooms</p>
        </div>
      </li>
      <li className={css.tagItem}>
        <PiStairs className={css.tagIcon} />
        <div className={css.tagContent}>
          <p className={css.tagNumber}>
            {floor}/{totalFloors}
          </p>
          <p className={css.tagText}>Floor</p>
        </div>
      </li>
    </ul>
  );
}

export default TagList;
