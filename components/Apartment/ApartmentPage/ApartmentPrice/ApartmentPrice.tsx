import React from "react";
import css from "./ApartmentPrice.module.css";
import Link from "next/link";
import { FaRegCalendarAlt, FaTelegramPlane, FaWhatsapp } from "react-icons/fa";

interface ApartmentPriceProps {
  price: number;
  dealType: string | undefined;
}

function ApartmentPrice({ price, dealType }: ApartmentPriceProps) {
  if (!dealType) {
    dealType = "buy";
  }

  return (
    <>
      <div>
        <p className={css.price}>
          $ {price}
          <span className={css.dealTypeText}>
            {dealType === "rent" && "/night"}
          </span>
        </p>
      </div>
      <ul className={css.contactsList}>
        <li className={`${css.contactsItem} ${css.contactsForm}`}>
          <Link href={""} className={css.contactsLink}>
            <FaRegCalendarAlt />
            Sign up for a viewing
          </Link>
        </li>
        <li className={`${css.contactsItem} ${css.contactsTelegram}`}>
          <Link href={""} className={css.contactsLink}>
            <FaTelegramPlane />
            Telegram
          </Link>
        </li>
        <li className={`${css.contactsItem} ${css.contactsWhatsapp}`}>
          <Link href={""} className={css.contactsLink}>
            <FaWhatsapp />
            WhatsApp
          </Link>
        </li>
      </ul>
    </>
  );
}

export default ApartmentPrice;
