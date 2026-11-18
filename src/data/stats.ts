import type { Stat } from "@/types";

export const stats: Stat[] = [
  { label: "Campaigns launched", value: 480, suffix: "+", decimals: 0 },
  {
    label: "Ad spend managed",
    value: 12,
    prefix: "$",
    suffix: "M+",
    decimals: 0,
  },
  { label: "Average ROAS", value: 4.6, suffix: "x", decimals: 1 },
  { label: "Client retention", value: 92, suffix: "%", decimals: 0 },
];

export const clientWordmarks = [
  "Kopi Senja",
  "Lumio",
  "Terra Wear",
  "Nimbus Pay",
  "Pasar Kita",
  "Orbit Fit",
] as const;
