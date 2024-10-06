// src/components/Column.tsx
import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import Task from "./task";
import { ColumnData } from "../page";

interface ColumnProps {
  column: ColumnData;
  color: string;
}

const Column: React.FC<ColumnProps> = ({ column, color }) => {
  return (
    <Droppable droppableId={column.id}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={`rounded-lg ${color} p-4 shadow dark:${color}`}
        >
          <h2 className="mb-4 font-semibold text-gray-800 dark:text-black">
            {column.title}
          </h2>
          {column.tasks.map((task, index) => {
            return <Task key={task.id} task={task} index={index} />;
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Column;
