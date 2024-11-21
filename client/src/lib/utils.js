import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const colors = [
  "bg-[#712ca57] text-[#ff006e] border-[1px] border-[#ff006faa]",
  "bg-[#ff006e] text-[#fffd60a2] border-[1px] border-[#fffd60abb]",
  "bg-[#96d60a2a] text-[#06d6a0] border-[1px] border-[#06d6a0bb]",
  "bg-[#4cc9f02a] text-[#4cc9f0] border-[1px] border-[#4cc9f0bb]",
];

export const getColor = (color) => {
  if (color >= 0 && color < colors.length) {
    return colors[color];
  }
  return colors[0];
};
