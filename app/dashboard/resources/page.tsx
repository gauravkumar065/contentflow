"use client";
import React, { useState } from "react";
import { Search, ChevronDown, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";

const ScreenwritingApp = () => {
  const [scriptContent, setScriptContent] = useState(`11

JOHN
Well, one can't have everything.

CUT TO:

EXT. JOHN AND MARY'S HOUSE - CONTINUOUS
An old car pulls up to the curb and a few KNOCKS as the engine shuts down.

MIKE steps out of the car and walks up to the front door. He rings the doorbell.

BACK TO:

INT. KITCHEN - CONTINUOUS

JOHN
Who on Earth could that be?

MARY
I'll go and see

Mary gets up and walks out.

The front door lock CLICKS door CREAKS a little as its opened.`);

  const [activeFormat, setActiveFormat] = useState("Action");

  const handleFormatClick = (format: any) => {
    setActiveFormat(format);
    // In a real application, you would apply the formatting to the selected text here
  };

  const handleScriptChange = (e: any) => {
    setScriptContent(e.target.value);
  };

  const formatButtons = [
    "Heading",
    "Action",
    "Character",
    "Parenthetical",
    "Dialogue",
    "Transition",
  ];

  return (
    <div className="flex h-screen flex-col bg-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between border-b bg-white p-4">
        <div className="flex items-center space-x-4">
          <span className="text-gray-500">Projects /</span>
          <span className="text-gray-500">Into the wild /</span>
          <span className="font-semibold">Scripts</span>
        </div>
        <div className="relative">
          <Input
            type="search"
            placeholder="Search"
            className="rounded-md py-2 pl-8 pr-4"
          />
          <Search className="absolute left-2 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </header>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left panel */}
        <div className="w-2/3 overflow-auto p-4">
          <div className="rounded-lg bg-white p-4 shadow">
            <div className="mb-4 flex space-x-2 overflow-x-auto">
              {formatButtons.map((format) => (
                <Button
                  key={format}
                  variant="outline"
                  className={activeFormat === format ? "bg-blue-100" : ""}
                  onClick={() => handleFormatClick(format)}
                >
                  {format}
                </Button>
              ))}
              <Button variant="outline">
                More <ChevronDown className="ml-1 h-4 w-4" />
              </Button>
            </div>
            <Textarea
              value={scriptContent}
              onChange={handleScriptChange}
              className="h-[calc(100vh-250px)] w-full resize-none font-mono"
            />
          </div>
        </div>

        {/* Right panel */}
        <div className="w-1/3 space-y-4 overflow-auto p-4">
          {["INT. HOME - NIGHT", "INT. HOME - NIGHT", "INT. HOME - NIGHT"].map(
            (title, index) => (
              <Card
                key={index}
                className={`border-l-4 ${
                  index === 0
                    ? "border-l-red-500"
                    : index === 1
                      ? "border-l-purple-500"
                      : "border-l-green-500"
                }`}
              >
                <CardHeader className="p-2 text-xs text-gray-500">
                  {title}
                </CardHeader>
                <CardContent className="p-2">
                  <p className="text-sm">
                    An old car pulls up to the curb and ...
                  </p>
                </CardContent>
              </Card>
            ),
          )}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Page 1 (1/8 Page)</span>
            <Button variant="outline" size="sm">
              Show
            </Button>
          </div>
          <div className="space-y-2">
            {["Format", "Characters", "Locations", "Other"].map(
              (item, index) => (
                <Button
                  key={item}
                  variant="outline"
                  className={`w-full justify-start ${
                    index === 1 ? "bg-gray-100" : ""
                  }`}
                >
                  {item}
                </Button>
              ),
            )}
          </div>
          <div className="space-y-2">
            {[
              { name: "Kathryn Murphy", username: "pointingaxis" },
              { name: "Guy Hawkins", username: "daylighttouch" },
              { name: "Elaine Richards", username: "carriermorse" },
              { name: "Jessica M", username: "carriermorse" },
            ].map((user, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Avatar>
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-semibold">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.username}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="flex justify-end bg-white p-2">
        <Button variant="ghost" size="icon">
          <Maximize2 className="h-4 w-4" />
        </Button>
      </footer>
    </div>
  );
};

export default ScreenwritingApp;
