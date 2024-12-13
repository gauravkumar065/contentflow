"use client";

import {
  X,
  Bold,
  Italic,
  Underline,
  List,
  Link,
  ListOrdered,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface ScriptEditorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  script: {
    title: string;
    version: string;
    lastEdited: string;
    status: string;
  };
}

export function ScriptEditor({
  open,
  onOpenChange,
  script,
}: ScriptEditorProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-[90vh] w-full max-w-6xl flex-col p-0">
        <div className="flex items-center justify-between border-b p-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-semibold">{script.title}</h2>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <Select defaultValue={script.version}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={script.version}>
                    Version {script.version}
                  </SelectItem>
                  <SelectItem value="2.0">Version 2.0</SelectItem>
                  <SelectItem value="1.9">Version 1.9</SelectItem>
                </SelectContent>
              </Select>
              <span>Last edited {script.lastEdited}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          <div className="flex flex-1 flex-col">
            <div className="flex gap-2 border-b p-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Bold className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Italic className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Underline className="h-4 w-4" />
              </Button>
              <div className="mx-2 h-8 w-px bg-gray-200" />
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <List className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ListOrdered className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Link className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 overflow-auto p-4">
              <Textarea
                placeholder="Start writing your script here..."
                className="min-h-[500px] resize-none border-0 p-0 focus-visible:ring-0"
              />
            </div>
          </div>

          <div className="w-80 overflow-y-auto border-l">
            <div className="p-4">
              <h3 className="mb-4 font-semibold">Details</h3>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select defaultValue={script.status.toLowerCase()}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="review">Review</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Collaborators</label>
                  <div className="flex -space-x-2">
                    <Avatar className="border-background h-8 w-8 border-2">
                      <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                    <Avatar className="border-background h-8 w-8 border-2">
                      <AvatarFallback>B</AvatarFallback>
                    </Avatar>
                    <Avatar className="border-background h-8 w-8 border-2">
                      <AvatarFallback>C</AvatarFallback>
                    </Avatar>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Tags</label>
                  <div className="flex flex-wrap gap-2">
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-700 hover:bg-blue-200"
                    >
                      marketing
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-700 hover:bg-green-200"
                    >
                      product
                    </Badge>
                    <Button variant="outline" size="sm" className="h-6">
                      + Add Tag
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="border-t p-4">
          <Button variant="outline">Cancel</Button>
          <Button className="bg-purple-600 hover:bg-purple-700">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
