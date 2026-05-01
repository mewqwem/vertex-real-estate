import Link from "next/link";
import React from "react";
import UniqButton from "../UniqButton/UniqButton";
import css from "./MobileMenu.module.css";
import { BsTelephoneForward } from "react-icons/bs";

interface MobileMenuProps {
  onLinkClick?: () => void;
}

function MobileMenu({ onLinkClick }: MobileMenuProps) {
  return (
    <nav className={css.nav}>
      <ul className={css.navList}>
        <li className={css.navItem}>
          <Link href={"#home"} onClick={onLinkClick}>
            Home
          </Link>
        </li>
        <li className={css.navItem}>
          <Link href={"#catalog"} onClick={onLinkClick}>
            Catalog
          </Link>
        </li>
        <li className={css.navItem}>
          <Link href={"#services"} onClick={onLinkClick}>
            Services
          </Link>
        </li>
        <li className={css.navItem}>
          <Link href={"#aboutUs"} onClick={onLinkClick}>
            About us
          </Link>
        </li>
        <div className={css.navButtonWrapper}>
          <UniqButton onClick={onLinkClick}>
            <BsTelephoneForward className={css.btnIcon} />
            Contact
          </UniqButton>
        </div>
      </ul>
    </nav>
  );
}

export default MobileMenu;
