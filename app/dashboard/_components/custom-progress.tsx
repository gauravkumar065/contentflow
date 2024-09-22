// src/components/CustomProgress.tsx
import React from "react";
import { useTheme } from "next-themes";

const getProgressColor = (progress: number): string => {
  if (progress <= 25) return "bg-[#E11D47]";
  if (progress <= 50) return "bg-[#FBBF23]";
  if (progress <= 75) return "bg-[#2463EB]";
  return "bg-[#289D90]";
};

const getProgressDarkColor = (progress: number): string => {
  if (progress <= 25) return "bg-[#E2366F]"; // red
  if (progress <= 50) return "bg-[#E78D2F]"; // orange
  if (progress <= 75) return "bg-[#2761D8]"; // blue
  return "bg-[#2DB78A]"; // green
};

interface CustomProgressProps {
  value: number;
  className?: string;
}

const CustomProgress: React.FC<CustomProgressProps> = ({
  value,
  className = "",
}) => {
  const color = getProgressColor(value);
  const darkColor = getProgressDarkColor(value);
  const { theme, setTheme } = useTheme();

  return (
    <div className={`h-2.5 w-full rounded-full bg-gray-200 ${className}`}>
      <div
        className={`h-2.5 rounded-full ${theme == "light" ? color : darkColor}`}
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
};

export default CustomProgress;
