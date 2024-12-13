import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { PlusIcon } from "lucide-react";

export function NewContentModal() {
  const [open, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-violet-600 hover:bg-violet-700 dark:bg-violet-700 dark:hover:bg-violet-800">
          <PlusIcon className="mr-2 h-4 w-4" />
          New Content
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] dark:bg-gray-800 dark:text-gray-100">
        <DialogHeader>
          <DialogTitle>Add New Content</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter content title"
              className="dark:border-gray-600 dark:bg-gray-700"
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="Enter content description"
              className="dark:border-gray-600 dark:bg-gray-700"
            />
          </div>
          <div>
            <Label htmlFor="priority">Priority</Label>
            <Select>
              <SelectTrigger className="dark:border-gray-600 dark:bg-gray-700">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-700">
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Input
              id="status"
              placeholder="Enter current status"
              className="dark:border-gray-600 dark:bg-gray-700"
            />
          </div>
          <div>
            <Label htmlFor="progress">Progress</Label>
            <Input
              id="progress"
              type="number"
              min="0"
              max="100"
              placeholder="Enter progress (0-100)"
              className="dark:border-gray-600 dark:bg-gray-700"
            />
          </div>
          <Button type="submit" className="w-full">
            Add Content
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
