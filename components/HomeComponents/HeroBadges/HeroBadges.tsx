import React from "react";
import css from "./HeroBadges.module.css";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { BsGraphUpArrow } from "react-icons/bs";
import { FaRegClock } from "react-icons/fa";

function HeroBadges() {
  return (
    <ul className={css.featuresList}>
      <li className={css.featuresItem}>
        <span className={css.featuresIconWrapper}>
          <AiOutlineSafetyCertificate className={css.icon} />
        </span>
        <div className={css.featuresContentWrapper}>
          <h3 className={css.featuresTitle}>100% Safety</h3>
          <p className={css.featuresText}>Legal review</p>
        </div>
      </li>
      <li className={css.featuresItem}>
        <span className={css.featuresIconWrapper}>
          <BsGraphUpArrow className={css.icon} />
        </span>
        <div className={css.featuresContentWrapper}>
          <h3 className={css.featuresTitle}>2000+ deals</h3>
          <p className={css.featuresText}>Satisfied customers</p>
        </div>
      </li>
      <li className={css.featuresItem}>
        <span className={css.featuresIconWrapper}>
          <FaRegClock className={css.icon} />
        </span>
        <div className={css.featuresContentWrapper}>
          <h3 className={css.featuresTitle}>15+ years</h3>
          <p className={css.featuresText}>Experience</p>
        </div>
      </li>
    </ul>
  );
}

export default HeroBadges;
