import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low" | "Scheduled";
  assignee: {
    name: string;
    avatar: string;
  };
  status: string;
  progress: number;
}

interface TaskDetailModalProps {
  task: Task | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TaskDetailModal({
  task,
  open,
  onOpenChange,
}: TaskDetailModalProps) {
  if (!task) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] dark:bg-gray-800 dark:text-gray-100">
        <DialogHeader>
          <DialogTitle>{task.title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {task.description}
            </p>
            <Badge
              variant={task.priority === "High" ? "destructive" : "default"}
              className={`${
                task.priority === "High"
                  ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                  : task.priority === "Medium"
                    ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                    : task.priority === "Low"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
              }`}
            >
              {task.priority}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={task.assignee.avatar} />
              <AvatarFallback>
                {task.assignee.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm">{task.assignee.name}</span>
          </div>
          <div>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {task.status}
              </span>
              <span className="text-sm font-medium">{task.progress}%</span>
            </div>
            <Progress value={task.progress} className="h-2" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
