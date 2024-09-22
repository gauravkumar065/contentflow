// src/components/CustomProgress.tsx
import React from "react";

const getProgressColor = (progress: number): string => {
  if (progress <= 25) return "bg-[#776AE3]";
  if (progress <= 50) return "bg-[#FBFF67]";
  if (progress <= 75) return "bg-[#FFB44A]";
  return "bg-[#88E570]";
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

  return (
    <div className={`w-full bg-gray-200 rounded-full h-2.5 ${className}`}>
      <div
        className={`h-2.5 rounded-full ${color}`}
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
};

export default CustomProgress;
