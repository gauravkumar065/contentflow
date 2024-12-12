// src/components/CreateTaskDialog.tsx
import React, { useState, ChangeEvent, useEffect } from "react";
import { IdeaStatus } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { NewIdea } from "../page"; // Import the NewIdea type from Dashboard

interface CreateTaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTask: (task: NewIdea) => void;
  user: number; // Add userId prop
}

const CreateTaskDialog: React.FC<CreateTaskDialogProps> = ({
  isOpen,
  onClose,
  onCreateTask,
  user,
}) => {
  const [newIdea, setNewIdea] = useState<NewIdea>({
    user: user,
    title: "",
    description: "",
    type: "",
    status: IdeaStatus.NEW,
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setNewIdea((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setNewIdea((prev) => ({ ...prev, type: value }));
  };

  const handleSubmit = () => {
    console.log("user", user);
    setNewIdea({
      user: user,
      title: "",
      description: "",
      type: "",
      status: IdeaStatus.NEW,
    });
    console.log("newidea======>", newIdea);
    onCreateTask(newIdea);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Idea</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              name="title"
              value={newIdea.title}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              name="description"
              value={newIdea.description}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Type
            </Label>
            <Select onValueChange={handleSelectChange} value={newIdea.type}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select content type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Shorts">Shorts</SelectItem>
                <SelectItem value="Video">Video</SelectItem>
                <SelectItem value="Blog">Blog</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button onClick={handleSubmit}>Create Idea</Button>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTaskDialog;
