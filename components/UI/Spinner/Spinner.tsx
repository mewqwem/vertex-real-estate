import css from "./Spinner.module.css";

interface SpinnerProps {
  size?: number;
}

function Spinner({ size = 40 }: SpinnerProps) {
  return (
    <div
      className={css.spinner}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    ></div>
  );
}

export default Spinner;
