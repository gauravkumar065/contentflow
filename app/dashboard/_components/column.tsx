// src/components/Column.tsx
import React from "react";
import { Droppable } from "@hello-pangea/dnd";
import Task from "./task";
import { ColumnData } from "../page";

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
          className={`rounded-lg bg-gray-100 p-4 shadow dark:bg-gray-800`}
        >
          <h2 className="mb-4 font-semibold text-gray-800 dark:text-white">
            {column.title}
          </h2>
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
