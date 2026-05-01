"use client";
import { useState } from "react";
import css from "./Header.module.css";
import Link from "next/link";
import { RxHamburgerMenu } from "react-icons/rx";
import { RiCloseLargeLine } from "react-icons/ri";
import MobileMenu from "../MobileMenu/MobileMenu";
import Navigation from "../Navigation/Navigation";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className={`${css.header} ${isOpen ? css.isOpen : ""}`}>
      <div className={css.logo}>
        <Link className={css.logoText} href={"/"}>
          YourLogo
        </Link>
      </div>
      <Navigation />
      <button onClick={toggleMenu} className={css.burgerButton}>
        {isOpen ? (
          <RiCloseLargeLine className={css.burgerIcon} />
        ) : (
          <RxHamburgerMenu className={css.burgerIcon} />
        )}
      </button>

      <div
        className={`${css.backdrop} ${isOpen ? css.backdropVisible : ""}`}
        onClick={closeMenu}
      ></div>

      <div className={`${css.mobileMenu} ${isOpen ? css.isOpen : ""}`}>
        <MobileMenu onLinkClick={closeMenu} />
      </div>
    </header>
  );
}

export default Header;
