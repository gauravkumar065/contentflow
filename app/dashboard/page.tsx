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
      {
        id: "task-3",
        content: "Explore new tools for video editing",
        progress: 0,
        title: "Video Editing Tools",
        description: "Find and evaluate the latest tools for video editing",
        type: "Video",
        resources: [],
      },
      {
        id: "task-4",
        content: "Draft ideas for a podcast series",
        progress: 0,
        title: "Podcast Series Ideas",
        description: "Come up with topics and formats for a new podcast series",
        type: "Video",
        resources: [],
      },
      {
        id: "task-5",
        content: "Plan a collaboration with influencers",
        progress: 0,
        title: "Influencer Collaboration",
        description:
          "Outline potential collaborations with industry influencers",
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
      {
        id: "task-8",
        content: "Respond to comments on the latest video",
        progress: 50,
        title: "Engage with Audience",
        description: "Reply to comments and questions on the most recent video",
        type: "Shorts",
        resources: [],
      },
      {
        id: "task-9",
        content: "Schedule social media posts for the week",
        progress: 70,
        title: "Social Media Schedule",
        description:
          "Plan and schedule posts across all social media platforms",
        type: "Shorts",
        resources: [],
      },
      {
        id: "task-10",
        content: "Prepare a script for the next video",
        progress: 30,
        title: "Video Script",
        description: "Write and refine the script for the upcoming video",
        type: "Shorts",
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
      {
        id: "task-13",
        content: "Create promotional graphics for social media",
        progress: 30,
        title: "Promotional Graphics",
        description:
          "Design graphics to promote the new content on social platforms",
        type: "Blog",
        resources: [],
      },
      {
        id: "task-14",
        content: "Draft the email newsletter for subscribers",
        progress: 50,
        title: "Email Newsletter",
        description: "Compose the content for the upcoming email newsletter",
        type: "Shorts",
        resources: [],
      },
      {
        id: "task-15",
        content: "Test the new feature on the mobile app",
        progress: 40,
        title: "Mobile App Testing",
        description: "Run tests on the newly developed feature in the app",
        type: "Shorts",
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
      {
        id: "task-18",
        content: "Create wireframes for the new dashboard",
        progress: 4,
        title: "Dashboard Wireframes",
        description: "Design initial wireframes for the upcoming dashboard",
        type: "Blog",
        resources: [],
      },
      {
        id: "task-19",
        content: "Publish the product launch video",
        progress: 100,
        title: "Publish Video",
        description: "Upload and publish the video on all platforms",
        type: "Blog",
        resources: [],
      },
      {
        id: "task-20",
        content: "Send the email newsletter to subscribers",
        progress: 100,
        title: "Send Newsletter",
        description: "Send out the prepared newsletter to the email list",
        type: "Blog",
        resources: [],
      },
      {
        id: "task-21",
        content: "Update social media with the new course announcement",
        progress: 100,
        title: "Social Media Update",
        description:
          "Post updates about the new course across all social media channels",
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
