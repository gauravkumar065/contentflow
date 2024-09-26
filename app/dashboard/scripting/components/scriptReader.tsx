"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PauseIcon, PlayIcon, RotateCcwIcon } from "lucide-react";

export default function ScriptReader() {
  const [text, setText] = useState(
    `Contrary to popular belief, Lorem Ipsum is not simply random text
    It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
     Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, 
     looked up one of the more obscure Latin words, consectetur, 
     from a Lorem Ipsum passage, and going through the cites of the word in classical literature, 
     discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" 
     (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, 
     very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", 
    comes from a line in section 1.10.3
    The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. 
    Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in 
    their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
  );
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lineSpeed, setLineSpeed] = useState(60); // lines per minute
  const [wordSpeed, setWordSpeed] = useState(120); // words per minute
  const lines = text
    .repeat(5)
    .split("\n")
    .filter((line) => line.trim() !== "");
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const highlightColors = [
    "bg-red-300",
    "bg-blue-300",
    "bg-green-300",
    "bg-yellow-300",
    "bg-purple-300",
    "bg-pink-300",
  ];

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentWordIndex((prevWordIndex) => {
          const words = lines[currentLineIndex].split(/\s+/);
          if (prevWordIndex >= words.length - 1) {
            setCurrentLineIndex((prevLineIndex) => {
              if (prevLineIndex >= lines.length - 1) {
                clearInterval(intervalRef.current!);
                setIsPlaying(false);
                return prevLineIndex;
              }
              return prevLineIndex + 1;
            });
            return 0;
          }
          return prevWordIndex + 1;
        });
      }, 60000 / wordSpeed);
    } else {
      clearInterval(intervalRef.current!);
    }

    return () => clearInterval(intervalRef.current!);
  }, [isPlaying, wordSpeed, lines.length, currentLineIndex]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const container = scrollAreaRef.current;
      const highlightedLine = container.querySelector(".highlighted");
      if (highlightedLine) {
        highlightedLine.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [currentLineIndex]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const resetReader = () => {
    setCurrentLineIndex(0);
    setCurrentWordIndex(0);
    setIsPlaying(false);
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = 0;
    }
  };

  return (
    <div className="mx-auto flex h-full max-w-2xl flex-col p-4">
      <div className="mb-6 h-[60vh] flex-grow">
        <ScrollArea ref={scrollAreaRef} className="h-full">
          <div className="p-4 text-lg">
            {lines.map((line, lineIndex) => (
              <div
                key={lineIndex}
                className={`px-4 py-2 transition-all duration-500 ease-in-out ${
                  lineIndex === currentLineIndex
                    ? "highlighted rounded bg-gray-100 font-medium dark:text-black"
                    : "text-gray-700 blur-[1px]"
                }`}
              >
                {line.split(/\s+/).map((word, wordIndex) => (
                  <span
                    key={wordIndex}
                    className={`${
                      lineIndex === currentLineIndex &&
                      wordIndex <= currentWordIndex
                        ? highlightColors[wordIndex % highlightColors.length]
                        : ""
                    } inline-block px-[1px] transition-all duration-300 ease-in-out dark:text-black`}
                  >
                    {word}{" "}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="mt-auto space-y-4">
        <div className="flex items-center justify-between">
          <Button onClick={togglePlayPause} variant="outline" size="icon">
            {isPlaying ? (
              <PauseIcon className="h-4 w-4" />
            ) : (
              <PlayIcon className="h-4 w-4" />
            )}
          </Button>
          <Button onClick={resetReader} variant="outline" size="icon">
            <RotateCcwIcon className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              Line Speed: {lineSpeed} lpm
            </span>
            <Slider
              value={[lineSpeed]}
              onValueChange={(value) => setLineSpeed(value[0])}
              min={10}
              max={120}
              step={5}
              className="w-32"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">
              Word Speed: {wordSpeed} wpm
            </span>
            <Slider
              value={[wordSpeed]}
              onValueChange={(value) => setWordSpeed(value[0])}
              min={60}
              max={600}
              step={10}
              className="w-32"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
