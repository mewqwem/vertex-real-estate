import React from "react";
import css from "./Navigation.module.css";
import Link from "next/link";
import UniqButton from "../../UI/UniqButton/UniqButton";
import { BsTelephoneForward } from "react-icons/bs";

interface NavigationProps {
  path: string;
}

function Navigation({ path }: NavigationProps) {
  return (
    <nav className={css.nav}>
      <ul className={css.navList}>
        <li className={`${css.navItem} ${path === "/" ? css.activeTab : ""}`}>
          <Link href={"/"}>Home</Link>
        </li>
        <li
          className={`${css.navItem} ${path === "/catalog" ? css.activeTab : ""}`}
        >
          <Link href={"/catalog"}>Catalog</Link>
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
