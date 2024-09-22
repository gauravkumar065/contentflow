// src/components/Column.tsx
import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import Task from "./task";
import { ColumnData } from "../page"; // Import the ColumnData type from Dashboard

interface ColumnProps {
  column: ColumnData;
}

const Column: React.FC<ColumnProps> = ({ column }) => {
  return (
    <Droppable droppableId={column.id}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className={`rounded-lg shadow p-4 bg-gray-100`}
        >
          <h2 className="font-semibold mb-4 text-gray-800">{column.title}</h2>
          {column.tasks.map((task, index) => (
            <Task key={task.id} task={task} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default Column;
