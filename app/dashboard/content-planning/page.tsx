"use client";
import { useTheme } from "next-themes";
import { Tldraw, setUserPreferences } from "tldraw";
import "tldraw/tldraw.css";

const IndexPage = () => {
  const { theme, setTheme } = useTheme();
  setUserPreferences({
    colorScheme: theme == "dark" ? "dark" : "light",
    id: "123wdwd",
  });
  return (
    <div
      style={{ flex: "1 1 auto " }}
      className="flex items-center justify-center bg-gray-100"
    >
      <Tldraw />
    </div>
  );
};

export default IndexPage;
