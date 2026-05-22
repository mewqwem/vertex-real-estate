import Link from "next/link";
import css from "./MobileMenu.module.css";
import { IoHomeOutline } from "react-icons/io5";
import { CiGrid41 } from "react-icons/ci";
import Filters from "../Filters/Filters";

interface MobileMenuProps {
  onLinkClick?: () => void;
}

function MobileMenu({ onLinkClick }: MobileMenuProps) {
  return (
    <nav className={css.nav}>
      <ul className={css.navList}>
        <li className={css.navItem}>
          <Link href={"/"} onClick={onLinkClick} className={css.navLink}>
            <IoHomeOutline />
            Home
          </Link>
        </li>
        <li className={css.navItem}>
          <Link href={"/catalog"} onClick={onLinkClick} className={css.navLink}>
            <CiGrid41 />
            Catalog
          </Link>
        </li>
        {/* <div className={css.navButtonWrapper}>
          <UniqButton onClick={onLinkClick}>
            <BsTelephoneForward className={css.btnIcon} />
            Contact
          </UniqButton>
        </div> */}
      </ul>
    </nav>
  );
}

export default MobileMenu;
