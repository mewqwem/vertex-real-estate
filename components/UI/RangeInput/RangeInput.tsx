"use client";

import { useEffect, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

interface PriceRangeFilterProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (values: [number, number]) => void;
}

export const PriceRangeFilter = ({
  min,
  max,
  value,
  onChange,
}: PriceRangeFilterProps) => {
  const [range, setRange] = useState<[number, number]>(value);

  useEffect(() => {
    setRange(value);
  }, [value]);

  const handleSliderChange = (next: number | number[]) => {
    if (Array.isArray(next)) {
      setRange([next[0], next[1]]);
    }
  };

  const handleAfterChange = (next: number | number[]) => {
    if (Array.isArray(next)) {
      onChange([next[0], next[1]]);
    }
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100">
      <h4 className="text-sm font-medium text-gray-700 mb-6">Price Range</h4>

      <Slider
        range
        min={min}
        max={max}
        value={range}
        onChange={handleSliderChange}
        onChangeComplete={handleAfterChange}
        trackStyle={[{ backgroundColor: "#2563eb", height: 6 }]}
        handleStyle={[
          {
            borderColor: "#2563eb",
            height: 20,
            width: 20,
            marginTop: -7,
            opacity: 1,
            boxShadow: "none",
          },
          {
            borderColor: "#2563eb",
            height: 20,
            width: 20,
            marginTop: -7,
            opacity: 1,
            boxShadow: "none",
          },
        ]}
        railStyle={{ backgroundColor: "#e5e7eb", height: 6 }}
      />

      <div className="flex justify-between mt-4">
        <div className="flex flex-col">
          <span className="text-xs text-gray-400">Min price</span>
          <span className="text-sm font-semibold">
            ${range[0].toLocaleString()}
          </span>
        </div>
        <div className="flex flex-col text-right">
          <span className="text-xs text-gray-400">Max price</span>
          <span className="text-sm font-semibold">
            ${range[1].toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};



