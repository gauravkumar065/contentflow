"use client";

import { useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusIcon } from "lucide-react";
import { DraggableColumn } from "@/components/draggable-column";

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
}

interface ColumnData {
  [key: string]: Task[];
}

export default function ProjectDashboard() {
  const [columns, setColumns] = useState<ColumnData>({
    scripting: [
      {
        id: "1",
        title: "Product Review Video",
        description: "Draft script for new tech review",
        priority: "High",
        assignee: { name: "Sarah Johnson", avatar: "/placeholder.svg" },
        status: "Due in 2 days",
      },
      {
        id: "2",
        title: "Brand Campaign",
        description: "Create campaign storyline",
        priority: "High",
        assignee: { name: "Emma Davis", avatar: "/placeholder.svg" },
        status: "Due tomorrow",
      },
    ],
    shooting: [
      {
        id: "3",
        title: "Tutorial Series",
        description: "Record intro segments",
        priority: "Medium",
        assignee: { name: "Mike Chen", avatar: "/placeholder.svg" },
        status: "In Progress",
      },
      {
        id: "4",
        title: "Product Launch",
        description: "Film product features",
        priority: "Medium",
        assignee: { name: "Tom Miller", avatar: "/placeholder.svg" },
        status: "Starting next week",
      },
    ],
    editing: [
      {
        id: "5",
        title: "Social Media Posts",
        description: "Final edits for weekly content",
        priority: "Low",
        assignee: { name: "Rachel Johnson", avatar: "/placeholder.svg" },
        status: "70% Complete",
      },
      {
        id: "6",
        title: "Promo Video",
        description: "Final cut review",
        priority: "Low",
        assignee: { name: "Alex Kim", avatar: "/placeholder.svg" },
        status: "90% Complete",
      },
    ],
    publishing: [
      {
        id: "7",
        title: "Blog Article",
        description: "Ready for publication",
        priority: "Scheduled",
        assignee: { name: "John Doe", avatar: "/placeholder.svg" },
        status: "Tomorrow 9AM",
      },
      {
        id: "8",
        title: "Newsletter",
        description: "Monthly digest",
        priority: "Scheduled",
        assignee: { name: "Mary Lee", avatar: "/placeholder.svg" },
        status: "Next Monday",
      },
    ],
  });

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn];
      const destItems = [...destColumn];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: sourceItems,
        [destination.droppableId]: destItems,
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: copiedItems,
      });
    }
  };

  return (
    <div className="mx-auto max-w-[1400px] p-6">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Project Overview</h1>
        <div className="flex gap-3">
          <Button className="bg-violet-600 hover:bg-violet-700">
            <PlusIcon className="mr-2 h-4 w-4" />
            New Content
          </Button>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Projects" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Projects</SelectItem>
              <SelectItem value="active">Active Projects</SelectItem>
              <SelectItem value="completed">Completed Projects</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Team Members" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Team Members</SelectItem>
              <SelectItem value="designers">Designers</SelectItem>
              <SelectItem value="developers">Developers</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Project Columns */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="mb-8 grid grid-cols-4 gap-6">
          <DraggableColumn
            title="Scripting"
            tasks={columns.scripting}
            id="scripting"
          />
          <DraggableColumn
            title="Shooting"
            tasks={columns.shooting}
            id="shooting"
          />
          <DraggableColumn
            title="Editing"
            tasks={columns.editing}
            id="editing"
          />
          <DraggableColumn
            title="Publishing"
            tasks={columns.publishing}
            id="publishing"
          />
        </div>
      </DragDropContext>

      {/* Bottom Section */}
      <div className="grid grid-cols-2 gap-6">
        {/* Team Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Team Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>SJ</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Sarah Johnson</p>
                  <p className="text-sm text-gray-500">
                    Completed script review for Product Video
                  </p>
                  <p className="text-sm text-gray-400">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>MC</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Mike Chen</p>
                  <p className="text-sm text-gray-500">
                    Started editing Tutorial Series footage
                  </p>
                  <p className="text-sm text-gray-400">4 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src="/placeholder.svg" />
                  <AvatarFallback>ED</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">Emma Davis</p>
                  <p className="text-sm text-gray-500">
                    Scheduled social media posts for next week
                  </p>
                  <p className="text-sm text-gray-400">Yesterday</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <div>
              <div className="mb-2 flex justify-between">
                <span className="text-sm font-medium">Completion Rate</span>
                <span className="text-sm font-medium text-violet-600">85%</span>
              </div>
              <Progress value={85} className="h-2" />
            </div>
            <div>
              <div className="mb-2 flex justify-between">
                <span className="text-sm font-medium">Team Velocity</span>
                <span className="text-sm font-medium text-violet-600">
                  12 tasks/week
                </span>
              </div>
            </div>
            <div>
              <div className="mb-2 flex justify-between">
                <span className="text-sm font-medium">Upcoming Deadlines</span>
                <span className="text-sm font-medium text-violet-600">4</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
