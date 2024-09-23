"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Tiptap from "./components/texteditor";

const scriptTemplates = {
  "youtube-shorts": `
    <h2>YouTube Shorts Script</h2>
    <h3>Hook:</h3>
    <p>[Your attention-grabbing opening]</p>
    <h3>Main Content:</h3>
    <p>[Your main points or story]</p>
    <h3>Call to Action:</h3>
    <p>[What you want viewers to do]</p>
  `,
  "youtube-video": `
    <h2>YouTube Video Script</h2>
    <h3>Intro:</h3>
    <p>[Introduce yourself and the topic]</p>
    <h3>Main Points:</h3>
    <ol>
      <li>[First main point]</li>
      <li>[Second main point]</li>
      <li>[Third main point]</li>
    </ol>
    <h3>Conclusion:</h3>
    <p>[Summarize and call to action]</p>
  `,
  "blog-post": `
    <h2>Blog Post Outline</h2>
    <h3>Title: [Your catchy title]</h3>
    <h3>Introduction:</h3>
    <p>[Hook and brief overview]</p>
    <h3>Main Sections:</h3>
    <ol>
      <li>[First main point]</li>
      <li>[Second main point]</li>
      <li>[Third main point]</li>
    </ol>
    <h3>Conclusion:</h3>
    <p>[Wrap up and final thoughts]</p>
  `,
  podcast: `
    <h2>Podcast Episode Outline</h2>
    <h3>Intro:</h3>
    <p>[Introduce the show and topic]</p>
    <h3>Main Segments:</h3>
    <ol>
      <li>[First segment]</li>
      <li>[Second segment]</li>
      <li>[Third segment]</li>
    </ol>
    <h3>Outro:</h3>
    <p>[Wrap up and tease next episode]</p>
  `,
};

interface Script {
  id: string;
  title: string;
  content: string;
  versions: { timestamp: number; content: string }[];
}

export default function EnhancedScriptWriter() {
  const [scripts, setScripts] = useState<Script[]>([]);
  const [currentScriptId, setCurrentScriptId] = useState<string | null>(null);
  const [title, setTitle] = useState("Untitled Script");
  const [content, setContent] = useState(`
      <h1 style="text-align:center">
        Devs Just Want to Have Fun by Cyndi Lauper
      </h1>
      <p style="text-align:center">
        I come home in the morning light<br>
        My mother says, <mark>“When you gonna live your life right?”</mark><br>
        Oh mother dear we’re not the fortunate ones<br>
        And devs, they wanna have fun<br>
        Oh devs just want to have fun</p>
      <p style="text-align:center">
        The phone rings in the middle of the night<br>
        My father yells, "What you gonna do with your life?"<br>
        Oh daddy dear, you know you’re still number one<br>
        But <s>girls</s>devs, they wanna have fun<br>
        Oh devs just want to have
      </p>
      <p style="text-align:center">
        That’s all they really want<br>
        Some fun<br>
        When the working day is done<br>
        Oh devs, they wanna have fun<br>
        Oh devs just wanna have fun<br>
        (devs, they wanna, wanna have fun, devs wanna have)
      </p>`);
  const [template, setTemplate] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [versionIndex, setVersionIndex] = useState(0);
  const [expandedScripts, setExpandedScripts] = useState<{
    [key: string]: boolean;
  }>({});

  useEffect(() => {
    const savedScripts = localStorage.getItem("scripts");
    if (savedScripts) {
      setScripts(JSON.parse(savedScripts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("scripts", JSON.stringify(scripts));
  }, [scripts]);

  const createNewScript = () => {
    const newScript: Script = {
      id: Date.now().toString(),
      title: "Untitled Script",
      content: "",
      versions: [{ timestamp: Date.now(), content: "" }],
    };
    setScripts((prevScripts) => [...prevScripts, newScript]);
    setCurrentScriptId(newScript.id);
    setTitle(newScript.title);
    setContent(`${newScript.content}`);
    setVersionIndex(0);
  };

  const saveCurrentScript = () => {
    setScripts((prevScripts) => {
      if (currentScriptId) {
        return prevScripts.map((script) =>
          script.id === currentScriptId
            ? {
                ...script,
                title,
                content,
                versions: [
                  { timestamp: Date.now(), content },
                  ...script.versions,
                ].slice(0, 10),
              }
            : script,
        );
      } else {
        const newScript: Script = {
          id: Date.now().toString(),
          title,
          content,
          versions: [{ timestamp: Date.now(), content }],
        };
        setCurrentScriptId(newScript.id);
        return [...prevScripts, newScript];
      }
    });
    setVersionIndex(0);
  };

  const loadScript = (scriptId: string, versionIndex: number = 0) => {
    const script = scripts.find((s) => s.id === scriptId);
    if (script) {
      setCurrentScriptId(script.id);
      setTitle(script.title);
      setContent(`${script.versions[versionIndex].content}`);
      setVersionIndex(versionIndex);
    }
  };

  const handleTemplateChange = (value: string) => {
    setTemplate(value);
    setContent(`${scriptTemplates[value as keyof typeof scriptTemplates]}`);
  };

  const changeVersion = (direction: "prev" | "next") => {
    if (!currentScriptId) return;

    const currentScript = scripts.find((s) => s.id === currentScriptId);
    if (!currentScript) return;

    let newIndex = direction === "prev" ? versionIndex + 1 : versionIndex - 1;
    newIndex = Math.max(
      0,
      Math.min(newIndex, currentScript.versions.length - 1),
    );

    setVersionIndex(newIndex);
    setContent(`${currentScript.versions[newIndex].content}`);
  };

  const toggleScriptExpansion = (scriptId: string) => {
    setExpandedScripts((prev) => ({
      ...prev,
      [scriptId]: !prev[scriptId],
    }));
  };

  const currentScript = currentScriptId
    ? scripts.find((s) => s.id === currentScriptId)
    : null;

  return (
    <div className="bg-background flex h-screen">
      {/* Sidebar */}
      <div
        className={`bg-secondary ${
          sidebarOpen ? "w-64" : "w-0"
        } overflow-hidden transition-all duration-300`}
      >
        <ScrollArea className="h-full">
          <div className="space-y-4 p-4">
            <Button onClick={createNewScript} className="w-full">
              New Script
            </Button>
            {scripts.map((script) => (
              <Collapsible
                key={script.id}
                open={expandedScripts[script.id]}
                onOpenChange={() => toggleScriptExpansion(script.id)}
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant={
                      currentScriptId === script.id ? "default" : "ghost"
                    }
                    className="w-full justify-between"
                  >
                    <span>{script.title}</span>
                    {expandedScripts[script.id] ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="space-y-2 pl-4 pt-2">
                  {script.versions.map((version, index) => (
                    <Button
                      key={version.timestamp}
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                      onClick={() => loadScript(script.id, index)}
                    >
                      Version {script.versions.length - index}
                    </Button>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Toggle Sidebar Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="left-4 top-4 z-10"
      >
        {sidebarOpen ? <ChevronLeft /> : <ChevronRight />}
      </Button>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-8">
        <div className="mx-auto max-w-4xl space-y-6">
          <div className="flex items-center justify-between">
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="m-2 border-none bg-transparent p-0 text-2xl font-bold focus:outline-none focus:ring-0"
              aria-label="Script title"
            />
            <Select onValueChange={handleTemplateChange} value={template}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="youtube-shorts">YouTube Shorts</SelectItem>
                <SelectItem value="youtube-video">YouTube Video</SelectItem>
                <SelectItem value="blog-post">Blog Post</SelectItem>
                <SelectItem value="podcast">Podcast</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border-secondary bg-background focus:ring-primary min-h-[500px] resize-none border-2 p-4 text-lg leading-relaxed focus:outline-none focus:ring-1"
            placeholder="Start writing your script here..."
            aria-label="Script content"
          /> */}
          <Tiptap content={content} />

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => changeVersion("next")}
                disabled={!currentScript || versionIndex === 0}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span>
                Version {versionIndex + 1} of{" "}
                {currentScript?.versions.length || 1}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => changeVersion("prev")}
                disabled={
                  !currentScript ||
                  versionIndex === currentScript.versions.length - 1
                }
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <Button onClick={saveCurrentScript}>Save</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
