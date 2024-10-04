import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calendar, Target, Video, Image, Film } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import CustomProgress from "./custom-progress";

interface TaskDetailsProps {
  task: {
    type: string;
    progress: number;
  };
}

const TaskAccordionItem: React.FC<{
  value: string;
  title: string;
  taskCount: number;
  status: string;
  tasks: { id: string; label: string; status?: string }[];
}> = ({ value, title, taskCount, status, tasks }) => (
  <AccordionItem value={value}>
    <AccordionTrigger className="bg-muted rounded-md p-2">
      <div className="flex w-full items-center justify-between">
        <span className="font-medium">{title}</span>
        <span className={`text-sm text-${status}-600`}>{taskCount} Tasks</span>
      </div>
    </AccordionTrigger>
    <AccordionContent>
      <div className="space-y-2 pl-4 pt-2">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center space-x-2">
            <Checkbox id={task.id} />
            <label htmlFor={task.id} className="text-sm">
              {task.label}
            </label>
            {task.status && (
              <span className="ml-auto text-xs text-blue-600">
                {task.status}
              </span>
            )}
          </div>
        ))}
      </div>
    </AccordionContent>
  </AccordionItem>
);

const TaskDetails: React.FC<TaskDetailsProps> = ({ task }) => {
  const accordionItems = [
    {
      value: "item-1",
      title: "Initial Planning",
      taskCount: 4,
      status: "green",
      tasks: [
        { id: "task1", label: "Add a title" },
        { id: "task2", label: "Add a description", status: "In progress" },
        { id: "task3", label: "Add a thumbnail" },
        { id: "task4", label: "Add a tagline" },
      ],
    },
    {
      value: "item-2",
      title: "Scripting",
      taskCount: 4,
      status: "blue",
      tasks: [
        { id: "task5", label: "Add a script" },
        { id: "task6", label: "story", status: "In progress" },
        { id: "task7", label: "character" },
        { id: "task8", label: "shooting" },
      ],
    },
    {
      value: "item-3",
      title: "Editing",
      taskCount: 4,
      status: "muted-foreground",
      tasks: [
        { id: "task9", label: "Add a voiceover" },
        {
          id: "task10",
          label: "Add a background music",
          status: "In progress",
        },
        { id: "task11", label: "Add a sound effect" },
        { id: "task12", label: "Add a subtitle" },
      ],
    },
    {
      value: "item-4",
      title: "Adding resources",
      taskCount: 4,
      status: "muted-foreground",
      tasks: [
        { id: "task13", label: "Add brand assets" },
        { id: "task14", label: "Add referal links", status: "In progress" },
        { id: "task15", label: "Add social media links" },
        { id: "task16", label: "Add video to the video section" },
      ],
    },
  ];

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader className="flex flex-row items-center">
        <div className="rounded-md p-2">
          {task.type === "Video" && (
            <Video className="text-blue-600" size={24} />
          )}
          {task.type === "Shorts" && (
            <Image className="text-pink-600" size={24} />
          )}
          {task.type === "Blog" && <Film className="text-blue-600" size={24} />}{" "}
          {task.type}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <CustomProgress value={task.progress} className="mr-4" />
            <span className="text-muted-foreground text-sm">2 days left</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Start: Nov 12</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="h-4 w-4" />
              <span>End: Dec 12</span>
            </div>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {accordionItems.map((item) => (
              <TaskAccordionItem key={item.value} {...item} />
            ))}
          </Accordion>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskDetails;
