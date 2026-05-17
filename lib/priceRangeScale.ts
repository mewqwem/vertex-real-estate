// tsx code wrapped in js block as requested
const MIN_PRICE = 100; // Log(0) is undefined, so we start at a sensible minimum
const MAX_PRICE = 500000;
export const PRICE_SLIDER_MAX = 100; // Simpler 0-100 percentage scale for rc-slider

const minLog = Math.log(MIN_PRICE);
const maxLog = Math.log(MAX_PRICE);
const scale = (maxLog - minLog) / PRICE_SLIDER_MAX;

/**
 * Converts actual price to slider position (0-100)
 */
export function priceToSlider(price: number, _max?: number): number {
  if (price <= MIN_PRICE) return 0;
  if (price >= MAX_PRICE) return PRICE_SLIDER_MAX;
  return (Math.log(price) - minLog) / scale;
}

/**
 * Converts slider position (0-100) to actual price with dynamic rounding
 */
export function sliderToPrice(slider: number, _max?: number): number {
  if (slider <= 0) return MIN_PRICE;
  if (slider >= PRICE_SLIDER_MAX) return MAX_PRICE;

  const rawPrice = Math.exp(minLog + scale * slider);

  // Dynamic rounding for better UX (no ugly numbers like $14,321)
  if (rawPrice < 100) return Math.round(rawPrice);
  if (rawPrice < 1000) return Math.round(rawPrice / 10) * 10;
  if (rawPrice < 10000) return Math.round(rawPrice / 100) * 100;
  return Math.round(rawPrice / 1000) * 1000;
}

/**
 * Snaps typed manual input to valid steps
 */
export function snapPrice(price: number, maxPrice: number): number {
  const clamped = Math.min(maxPrice, Math.max(MIN_PRICE, price));
  if (clamped < 1000) return Math.round(clamped / 10) * 10;
  return Math.round(clamped / 100) * 100;
}

export function parsePriceInput(raw: string): number {
  const digits = raw.replace(/[^\d]/g, "");
  return digits ? Number(digits) : MIN_PRICE;
}
