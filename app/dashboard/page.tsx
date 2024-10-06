// src/components/Dashboard.tsx
"use client";
import React, { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import Column from "./_components/column";
import CreateTaskDialog from "./_components/task-dailog";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { IdeaStatus, ResourceType } from "@prisma/client";
import { useUser } from "@clerk/nextjs";
import config from "@/config";
import fetchUserData from "@/utils/data/userdetails";
import NoIdea from "./_components/no-idea";

export interface Idea {
  id: string;
  userId: number; // Changed from string to number
  title: string;
  description: string;
  progress: number;
  type: string;
  status: IdeaStatus; // Using the enum from Prisma
  createdAt: Date;
  updatedAt: Date;
  scripts: Script[];
  resources: Resource[];
  aiContent?: AIContent;
}

export interface Script {
  id: string;
  ideaId: string;
  version: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Resource {
  id: string;
  ideaId: string;
  type: ResourceType; // Using the enum from Prisma
  url: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AIContent {
  id: string;
  ideaId: string;
  twitterPost: string;
  instagramPost: string;
  hashtags: string[];
  blogPost: string;
  youtubeCommunityPost: string;
  youtubeTitle: string;
  youtubeDescription: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ColumnData {
  id: string;
  title: string;
  tasks: Idea[];
}

export type Columns = {
  [key: string]: ColumnData;
};

const initialColumns: Columns = {
  "new-idea": {
    id: "new-idea",
    title: "New Idea",
    tasks: [],
  },
  "do-today": {
    id: "do-today",
    title: "Do today",
    tasks: [],
  },
  "in-progress": {
    id: "in-progress",
    title: "In progress",
    tasks: [],
  },
  publish: {
    id: "publish",
    title: "Publish",
    tasks: [],
  },
};
export interface NewIdea {
  userId: number;
  title: string;
  description: string;
  type: string;
  status: IdeaStatus;
}

const Dashboard: React.FC = () => {
  const [columns, setColumns] = useState<Columns>(initialColumns);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();

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

  const addNewTask = (newIdea: NewIdea) => {
    const newTaskId = `task-${Date.now()}`;
    const updatedColumns = {
      ...columns,
      "new-idea": {
        ...columns["new-idea"],
        tasks: [
          {
            id: newTaskId,
            userId: userData.userId,
            title: newIdea.title,
            description: newIdea.description,
            progress: 2,
            type: newIdea.type,
            status: IdeaStatus.NEW,
            createdAt: new Date(),
            updatedAt: new Date(),
            scripts: [],
            resources: [],
          },
          ...columns["new-idea"].tasks,
        ],
      },
    };
    setColumns(updatedColumns);
    setIsDialogOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (user?.id && config?.auth?.enabled) {
        const userData = await fetchUserData(user?.id);
        setUserData(userData);
      } else {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const areAllColumnsEmpty = Object.values(columns).every(
    (column) => column.tasks.length === 0,
  );
  const highlightColors = [
    "bg-red-300",
    "bg-blue-300",
    "bg-green-300",
    "bg-yellow-300",
    "bg-purple-300",
    "bg-pink-300",
  ];
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
        {areAllColumnsEmpty ? (
          <div className="-m-20 flex h-full items-center justify-center">
            <NoIdea />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {Object.values(columns).map((column, i) => (
              <Column
                key={column.id}
                column={column}
                color={highlightColors[i]}
              />
            ))}
          </div>
        )}
      </DragDropContext>
      <CreateTaskDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onCreateTask={addNewTask}
        userId={userData?.userId}
      />
    </div>
  );
};

export default Dashboard;
