import React from "react";
import css from "./Navigation.module.css";
import Link from "next/link";
import UniqButton from "../UniqButton/UniqButton";
import { BsTelephoneForward } from "react-icons/bs";

function Navigation() {
  return (
    <nav className={css.nav}>
      <ul className={css.navList}>
        <li className={css.navItem}>
          <Link href={"#home"}>Home</Link>
        </li>
        <li className={css.navItem}>
          <Link href={"#catalog"}>Catalog</Link>
        </li>
        <li className={css.navItem}>
          <Link href={"#services"}>Services</Link>
        </li>
        <li className={css.navItem}>
          <Link href={"#aboutUs"}>About us</Link>
        </li>
        <div className={css.navButtonWrapper}>
          <UniqButton>
            <BsTelephoneForward className={css.btnIcon} />
            Contact
          </UniqButton>
        </div>
      </ul>
    </nav>
  );
}

export default Navigation;
