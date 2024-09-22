"use client";
import { Tldraw, setUserPreferences } from "tldraw";
import "tldraw/tldraw.css";

// setUserPreferences({ colorScheme: "light", id: "123wdwd" });

const IndexPage = () => {
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
