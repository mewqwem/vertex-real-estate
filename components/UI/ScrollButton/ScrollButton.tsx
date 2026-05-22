"use client";

import css from "./ScrollButton.module.css";

function ScrollButton() {
  const handleScroll = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };
  return (
    <button
      className={css.scrollBtn}
      onClick={handleScroll}
      aria-label="Scroll down to content"
    >
      <span className={css.arrow}></span>
    </button>
  );
}

export default ScrollButton;
