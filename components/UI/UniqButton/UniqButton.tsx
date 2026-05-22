"use client";

import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";
import css from "./UniqButton.module.css";
import { useRouter } from "next/navigation";

interface LinkProps extends Omit<
  ComponentPropsWithoutRef<typeof Link>,
  "type"
> {
  type: "link";
  href: string;
}

interface ButtonProps extends Omit<ComponentPropsWithoutRef<"button">, "type"> {
  type?: "button" | "submit" | "reset";
  href?: never;
}

interface RouteBackProps extends Omit<
  ComponentPropsWithoutRef<"button">,
  "type"
> {
  type: "routeBack";
  href?: never;
}

type Props = LinkProps | ButtonProps | RouteBackProps;

function UniqButton(props: Props) {
  const router = useRouter();

  if (props.type === "link") {
    const { type, ...linkProps } = props;
    return <Link className={css.button} {...linkProps} />;
  }

  if (props.type === "routeBack") {
    const { type, onClick, ...backProps } = props;

    const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (onClick) onClick(e);

      if (typeof window !== "undefined" && window.history.length > 2) {
        router.back();
      } else {
        router.push("/catalog");
      }
    };

    return (
      <button
        className={css.button}
        type="button"
        onClick={handleBack}
        {...backProps}
      />
    );
  }

  const { type, ...buttonProps } = props;
  return (
    <button className={css.button} type={type || "button"} {...buttonProps} />
  );
}

export default UniqButton;
