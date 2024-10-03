"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { File, ChevronRight, ChevronDown } from "lucide-react";
import { Highlight, themes } from "prism-react-renderer";

// Import shadcn components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";

interface FileStructure {
  [key: string]: string[];
}

export default function CodeVisualizer() {
  const [files, setFiles] = useState<FileStructure>({});
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [newFileName, setNewFileName] = useState("");
  const [newCode, setNewCode] = useState("");

  const addFile = () => {
    if (newFileName) {
      setFiles((prev) => ({ ...prev, [newFileName]: [] }));
      setNewFileName("");
    }
  };

  const addCode = () => {
    if (selectedFile && newCode) {
      setFiles((prev) => ({
        ...prev,
        [selectedFile]: [...(prev[selectedFile] || []), newCode],
      }));
      setNewCode("");
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 p-4">
        <h2 className="mb-4 text-xl font-bold">Explorer</h2>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          {Object.entries(files).map(([fileName, codeSnippets]) => (
            <motion.div
              key={fileName}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-2"
            >
              <div
                className="flex cursor-pointer items-center"
                onClick={() => setSelectedFile(fileName)}
              >
                {codeSnippets.length > 0 ? (
                  <ChevronDown className="mr-1 h-4 w-4" />
                ) : (
                  <ChevronRight className="mr-1 h-4 w-4" />
                )}
                <File className="mr-2 h-4 w-4" />
                <span>{fileName}</span>
              </div>
            </motion.div>
          ))}
        </ScrollArea>
        <div className="-mt-20">
          <Input
            type="text"
            placeholder="New file name"
            value={newFileName}
            onChange={(e) => setNewFileName(e.target.value)}
            className="mb-2"
          />
          <Button onClick={addFile} className="w-full">
            Add File
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-4">
        {selectedFile && (
          <div>
            <h2 className="mb-4 text-xl font-bold">{selectedFile}</h2>
            <ScrollArea className="mb-4 h-[calc(100vh-16rem)]">
              <AnimatePresence>
                {files[selectedFile].map((snippet, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="mb-4"
                  >
                    <Highlight
                      theme={themes.dracula}
                      code={snippet}
                      language="javascript"
                    >
                      {({
                        className,
                        style,
                        tokens,
                        getLineProps,
                        getTokenProps,
                      }) => (
                        <pre
                          className={className}
                          style={{
                            ...style,
                            background: "transparent",
                            padding: "1em",
                          }}
                        >
                          {tokens.map((line, i) => (
                            <div key={i} {...getLineProps({ line, key: i })}>
                              {line.map((token, key) => (
                                <span
                                  key={key}
                                  {...getTokenProps({ token, key })}
                                />
                              ))}
                            </div>
                          ))}
                        </pre>
                      )}
                    </Highlight>
                  </motion.div>
                ))}
              </AnimatePresence>
            </ScrollArea>
            <div className="-mt-20">
              <Textarea
                placeholder="Add code snippet"
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
                className="mb-2 h-32"
              />
              <Button onClick={addCode} className="w-full">
                Add Code Snippet
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
