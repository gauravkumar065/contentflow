import { useState } from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { TaskDetailModal } from "./task-detail-modal";
import { VideoProductionModal } from "./detail-modal";

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

interface DraggableColumnProps {
  title: string;
  tasks: Task[];
  id: string;
}

export function DraggableColumn({ title, tasks, id }: DraggableColumnProps) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <Card className="bg-gray-50 p-4 dark:bg-gray-800">
        <Droppable droppableId={id}>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {tasks.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      onClick={() => handleTaskClick(task)}
                    >
                      <Card className="cursor-pointer bg-white transition-shadow hover:shadow-md dark:bg-gray-700">
                        <CardContent className="p-4">
                          <div className="mb-2 flex flex-col items-start justify-between sm:flex-row sm:items-center">
                            <div className="mb-2 sm:mb-0">
                              <h3 className="font-medium">{task.title}</h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">
                                {task.description}
                              </p>
                            </div>
                            <Badge
                              variant={
                                task.priority === "High"
                                  ? "destructive"
                                  : "default"
                              }
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
                          <div className="mt-4">
                            <div className="mb-1 flex items-center justify-between">
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                {task.status}
                              </span>
                              <span className="text-sm font-medium">
                                {task.progress}%
                              </span>
                            </div>
                            <Progress value={task.progress} className="h-2" />
                          </div>
                          <div className="mt-4 flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src={task.assignee.avatar} />
                              <AvatarFallback>
                                {task.assignee.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </Card>
      {/* <TaskDetailModal
        task={selectedTask}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      /> */}
      <VideoProductionModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  );
}
