// src/components/Dashboard.tsx
"use client";
import React, { useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import Column from "./_components/column";
import CreateTaskDialog from "./_components/task-dailog";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

export interface Task {
  id: string;
  content: string;
  progress: number;
  title: string;
  description: string;
  type: string;
  resources: string[];
}

export interface ColumnData {
  id: string;
  title: string;
  tasks: Task[];
}

export type Columns = {
  [key: string]: ColumnData;
};
const initialColumns: Columns = {
  "new-idea": {
    id: "new-idea",
    title: "New Idea",
    tasks: [
      {
        id: "task-1",
        content: "Brainstorm content topics for Q4",
        progress: 0,
        title: "Q4 Content Brainstorm",
        description: "Generate new ideas for content to be created in Q4",
        type: "Shorts",
        resources: [],
      },
      {
        id: "task-2",
        content: "Research emerging trends in social media",
        progress: 0,
        title: "Social Media Trends",
        description: "Identify new trends and how they can be leveraged",
        type: "Video",
        resources: [],
      },
    ],
  },
  "do-today": {
    id: "do-today",
    title: "Do today",
    tasks: [
      {
        id: "task-6",
        content: "Update website homepage with new banner",
        progress: 10,
        title: "Homepage Update",
        description: "Change the homepage banner to reflect the new campaign",
        type: "Shorts",
        resources: [],
      },
      {
        id: "task-7",
        content: "Write a blog post on the latest industry trends",
        progress: 20,
        title: "Blog Post",
        description:
          "Draft and publish a blog post discussing recent industry developments",
        type: "Blog",
        resources: [],
      },
    ],
  },
  "in-progress": {
    id: "in-progress",
    title: "In progress",
    tasks: [
      {
        id: "task-11",
        content: "Edit the video for the new product launch",
        progress: 45,
        title: "Product Launch Video",
        description: "Work on editing the footage for the product launch",
        type: "Blog",
        resources: [],
      },
      {
        id: "task-12",
        content: "Develop the landing page for the new course",
        progress: 60,
        title: "Course Landing Page",
        description: "Design and build the landing page for the new course",
        type: "Blog",
        resources: [],
      },
    ],
  },
  publish: {
    id: "publish",
    title: "Publish",
    tasks: [
      {
        id: "task-16",
        content: "Figure out how to use Clever from the help center!",
        progress: 10,
        title: "Learn Clever",
        description: "Explore the help center to understand Clever usage",
        type: "Blog",
        resources: [],
      },
      {
        id: "task-17",
        content: "Build some new components in Figma",
        progress: 83,
        title: "Figma Components",
        description: "Create new reusable components in Figma",
        type: "Blog",
        resources: [],
      },
    ],
  },
};

export interface NewTask {
  title: string;
  description: string;
  type: string;
  resources: string[];
}

const Dashboard: React.FC = () => {
  const [columns, setColumns] = useState<Columns>(initialColumns);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.tasks];
      const destItems = [...destColumn.tasks];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          tasks: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          tasks: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.tasks];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          tasks: copiedItems,
        },
      });
    }
  };

  const addNewTask = (newTask: NewTask) => {
    const newTaskId = `task-${Date.now()}`;
    const updatedColumns = {
      ...columns,
      "new-idea": {
        ...columns["new-idea"],
        tasks: [
          {
            id: newTaskId,
            content: newTask.title,
            progress: 0,
            title: newTask.title,
            description: newTask.description,
            type: newTask.type,
            resources: newTask.resources,
          },
          ...columns["new-idea"].tasks,
        ],
      },
    };
    setColumns(updatedColumns);
    setIsDialogOpen(false);
  };

  return (
    <div
      style={{ flex: "1 1 auto" }}
      className="bg-background min-h-screen flex-1 p-6"
    >
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-foreground text-2xl font-bold">Content Progress</h1>
        <Button
          className="bg-blue-500 text-white hover:bg-blue-600"
          onClick={() => setIsDialogOpen(true)}
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Create
        </Button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {Object.values(columns).map((column) => (
            <Column key={column.id} column={column} />
          ))}
        </div>
      </DragDropContext>
      <CreateTaskDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onCreateTask={addNewTask}
      />
    </div>
  );
};

export default Dashboard;
