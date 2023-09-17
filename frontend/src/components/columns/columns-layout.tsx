"use client";

import { DndContext } from "@dnd-kit/core";
import ColumnCard from "./column-card";

const ColumnsLayout = () => {
  return (
    <div className="p-6 bg-gray-light w-full h-full">
      <DndContext>
        <div className="flex gap-8">
          <ColumnCard />
          <ColumnCard />
        </div>
      </DndContext>
    </div>
  );
};

export default ColumnsLayout;
