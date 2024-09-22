import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import CustomProgress from "./custom-progress";
import TaskDetails from "./TaskDetails";

interface TaskProps {
  task: {
    id: string;
    content: string;
    progress: number;
    title: string;
    description: string;
    type: string;
  };
  index: number;
}

const Task: React.FC<TaskProps> = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <Dialog>
          <DialogTrigger asChild>
            <Card
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className="mb-4 bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <CardHeader>
                <CardTitle className="text-sm font-medium text-gray-700">
                  {task.content}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CustomProgress value={task.progress} className="mb-2" />
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center space-x-1">
                    <span className="text-xs text-gray-500">18</span>
                    <span className="text-xs text-gray-500">7</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{task.title}</DialogTitle>
              <DialogDescription>{task.description}</DialogDescription>
            </DialogHeader>
            <TaskDetails task={task} />
          </DialogContent>
        </Dialog>
      )}
    </Draggable>
  );
};

export default Task;
