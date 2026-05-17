"use client";

import { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import {
  PRICE_SLIDER_MAX,
  parsePriceInput,
  priceToSlider,
  sliderToPrice,
  snapPrice,
} from "@/lib/priceRangeScale";
import css from "./RangeInput.module.css";

interface PriceRangeFilterProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (values: [number, number]) => void;
}

type PriceField = "min" | "max";

function clampRange(
  next: [number, number],
  min: number,
  max: number,
): [number, number] {
  const low = snapPrice(Math.min(next[0], next[1]), max);
  const high = snapPrice(Math.max(next[0], next[1]), max);
  return [
    Math.max(min, Math.min(low, high)),
    Math.min(max, Math.max(low, high)),
  ];
}

export const PriceRangeFilter = ({
  min,
  max,
  value,
  onChange,
}: PriceRangeFilterProps) => {
  const [range, setRange] = useState<[number, number]>(value);
  const [prevValue, setPrevValue] = useState(value);
  const [editing, setEditing] = useState<PriceField | null>(null);
  const [draftMin, setDraftMin] = useState("");
  const [draftMax, setDraftMax] = useState("");

  if (value[0] !== prevValue[0] || value[1] !== prevValue[1]) {
    setPrevValue(value);
    setRange(value);
  }

  const sliderValue: [number, number] = [
    priceToSlider(range[0], max),
    priceToSlider(range[1], max),
  ];

  const commitRange = (next: [number, number]) => {
    const clamped = clampRange(next, min, max);
    setRange(clamped);
    onChange(clamped);
  };

  const handleSliderChange = (next: number | number[]) => {
    if (!Array.isArray(next)) return;

    const prices: [number, number] = [
      sliderToPrice(next[0], max),
      sliderToPrice(next[1], max),
    ];
    setRange(clampRange(prices, min, max));
  };

  const handleAfterChange = (next: number | number[]) => {
    if (!Array.isArray(next)) return;

    commitRange([sliderToPrice(next[0], max), sliderToPrice(next[1], max)]);
  };

  const startEditing = (field: PriceField) => {
    setEditing(field);
    if (field === "min") {
      setDraftMin(String(range[0]));
    } else {
      setDraftMax(String(range[1]));
    }
  };

  const commitInput = (field: PriceField) => {
    const raw = field === "min" ? draftMin : draftMax;
    const parsed = snapPrice(parsePriceInput(raw), max);
    const next: [number, number] =
      field === "min" ? [parsed, range[1]] : [range[0], parsed];

    commitRange(next);
    setEditing(null);
  };

  return (
    <div className={css.wrapper}>
      <h4 className={css.title}>Price Range</h4>

      <div className={css.inputs}>
        <label className={css.field}>
          <span className={css.label}>Min price</span>
          <input
            type="number"
            inputMode="numeric"
            className={css.input}
            placeholder="$0"
            value={editing === "min" ? draftMin : String(range[0])}
            onFocus={() => startEditing("min")}
            onChange={(e) => setDraftMin(e.target.value)}
            onBlur={() => commitInput("min")}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.currentTarget.blur();
              }
            }}
          />
        </label>
        <label className={css.field}>
          <span className={css.label}>Max price</span>
          <input
            type="number"
            inputMode="numeric"
            className={css.input}
            placeholder={`$${max.toLocaleString()}`}
            value={editing === "max" ? draftMax : String(range[1])}
            onFocus={() => startEditing("max")}
            onChange={(e) => setDraftMax(e.target.value)}
            onBlur={() => commitInput("max")}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.currentTarget.blur();
              }
            }}
          />
        </label>
      </div>

      <Slider
        className={css.slider}
        range
        min={0}
        max={PRICE_SLIDER_MAX}
        value={sliderValue}
        onChange={handleSliderChange}
        onChangeComplete={handleAfterChange}
      />
    </div>
  );
};
