"use client";

import { useState } from "react";
import { Search, Star, Share2, Filter, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScriptEditor } from "./components/script-writer";

interface Script {
  id: number;
  title: string;
  status: "Active" | "Draft" | "Review" | "In Progress";
  lastEdited: string;
  version: string;
  collaborators: number;
  isOnlyYou?: boolean;
}

const scripts: Script[] = [
  {
    id: 1,
    title: "Product Launch Script",
    status: "Active",
    lastEdited: "2 hours ago",
    version: "2.1",
    collaborators: 3,
  },
  {
    id: 2,
    title: "Social Media Campaign",
    status: "Draft",
    lastEdited: "yesterday",
    version: "1.0",
    collaborators: 1,
    isOnlyYou: true,
  },
  {
    id: 3,
    title: "Product Review",
    status: "Review",
    lastEdited: "3 days ago",
    version: "1.5",
    collaborators: 2,
  },
  {
    id: 4,
    title: "Marketing Strategy",
    status: "Active",
    lastEdited: "5 days ago",
    version: "1.2",
    collaborators: 4,
  },
  {
    id: 5,
    title: "Video Script",
    status: "In Progress",
    lastEdited: "1 week ago",
    version: "2.3",
    collaborators: 2,
  },
  {
    id: 6,
    title: "Email Newsletter",
    status: "Active",
    lastEdited: "1 day ago",
    version: "1.0",
    collaborators: 1,
  },
  {
    id: 7,
    title: "Podcast Script",
    status: "Draft",
    lastEdited: "4 days ago",
    version: "0.8",
    collaborators: 1,
    isOnlyYou: true,
  },
  {
    id: 8,
    title: "Blog Post Series",
    status: "Review",
    lastEdited: "6 days ago",
    version: "1.7",
    collaborators: 5,
  },
];

export default function ScriptsDashboard() {
  const [open, setOpen] = useState(false);
  const [scriptEditorOpen, setScriptEditorOpen] = useState(false);
  const [selectedScript, setSelectedScript] = useState<Script | null>(null);

  const getStatusColor = (status: Script["status"]) => {
    switch (status) {
      case "Active":
        return "bg-green-500/10 text-green-500 dark:bg-green-500/20";
      case "Draft":
        return "bg-yellow-500/10 text-yellow-500 dark:bg-yellow-500/20";
      case "Review":
        return "bg-blue-500/10 text-blue-500 dark:bg-blue-500/20";
      case "In Progress":
        return "bg-purple-500/10 text-purple-500 dark:bg-purple-500/20";
      default:
        return "bg-gray-500/10 text-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-white p-8 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            My Scripts
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Manage and organize your creative content
          </p>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Plus className="mr-2 h-4 w-4" />
                New Script
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Script</DialogTitle>
                <DialogDescription>
                  Add the details for your new script project.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Script Title</Label>
                  <Input id="title" placeholder="Enter script title" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter script description"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  Create Script
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <div className="flex w-full gap-2 sm:w-auto">
            <div className="relative flex-1 sm:w-[300px]">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500" />
              <Input placeholder="Search scripts..." className="w-full pl-9" />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {scripts.map((script) => (
            <Card key={script.id} className="flex flex-col">
              <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center space-x-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-purple-100 dark:bg-purple-900/50">
                    <div className="h-4 w-4 rounded-sm bg-purple-500" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">{script.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Last edited {script.lastEdited}
                    </p>
                  </div>
                </div>
                <Badge
                  variant="secondary"
                  className={`${getStatusColor(script.status)}`}
                >
                  {script.status}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-600" />
                    Version {script.version}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-600" />
                    {script.isOnlyYou
                      ? "Only you"
                      : `${script.collaborators} collaborators`}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="mt-auto flex justify-between">
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Star className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  className="text-purple-600 hover:bg-purple-50 hover:text-purple-700 dark:hover:bg-purple-950"
                  onClick={() => {
                    setSelectedScript(script);
                    setScriptEditorOpen(true);
                  }}
                >
                  Open
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        {selectedScript && (
          <ScriptEditor
            open={scriptEditorOpen}
            onOpenChange={setScriptEditorOpen}
            script={selectedScript}
          />
        )}
      </div>
    </div>
  );
}
