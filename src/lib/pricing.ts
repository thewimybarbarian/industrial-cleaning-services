export const BASE_PRICE = 99;
export const PER_BEDROOM = 30;
export const PER_BATHROOM = 20;

export const FREQUENCY_OPTIONS = [
  { id: "once", label: "One time", discount: 0 },
  { id: "weekly", label: "Every week", discount: 0.20, badge: "Most popular" },
  { id: "biweekly", label: "Every 2 weeks", discount: 0.15 },
  { id: "monthly", label: "Every 4 weeks", discount: 0.10 },
] as const;

export type FrequencyId = (typeof FREQUENCY_OPTIONS)[number]["id"];

export function calculatePrice(bedrooms: number, bathrooms: number, frequency: FrequencyId): number {
  const base = BASE_PRICE + (bedrooms - 1) * PER_BEDROOM + (bathrooms - 1) * PER_BATHROOM;
  const option = FREQUENCY_OPTIONS.find((o) => o.id === frequency);
  const discount = option?.discount ?? 0;
  return Math.round(base * (1 - discount));
}
