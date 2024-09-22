// src/components/CreateTaskDialog.tsx
import React, { useState, ChangeEvent } from "react";
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
import { NewTask } from "../page"; // Import the NewTask type from Dashboard

interface CreateTaskDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTask: (task: NewTask) => void;
}

const CreateTaskDialog: React.FC<CreateTaskDialogProps> = ({
  isOpen,
  onClose,
  onCreateTask,
}) => {
  const [newTask, setNewTask] = useState<NewTask>({
    title: "",
    description: "",
    type: "",
    resources: [],
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setNewTask((prev) => ({ ...prev, type: value }));
  };

  const handleResourcesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const resources = e.target.value
      .split(",")
      .map((resource) => resource.trim());
    setNewTask((prev) => ({ ...prev, resources }));
  };

  const handleSubmit = () => {
    onCreateTask(newTask);
    setNewTask({ title: "", description: "", type: "", resources: [] });
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
              Topic
            </Label>
            <Input
              id="title"
              name="title"
              value={newTask.title}
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
              value={newTask.description}
              onChange={handleInputChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">
              Type
            </Label>
            <Select onValueChange={handleSelectChange} value={newTask.type}>
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="resources" className="text-right">
              Resources
            </Label>
            <Input
              id="resources"
              name="resources"
              value={newTask.resources.join(", ")}
              onChange={handleResourcesChange}
              placeholder="Comma-separated list of resources"
              className="col-span-3"
            />
          </div>
        </div>
        <Button onClick={handleSubmit}>Create idea</Button>
      </DialogContent>
    </Dialog>
  );
};

export default CreateTaskDialog;
