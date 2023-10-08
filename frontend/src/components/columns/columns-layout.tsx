"use client";

import { DndContext } from "@dnd-kit/core";
import ColumnCard from "./column-card";

import { BoardType } from "@/types/board";

const ColumnsLayout = ({board} : { board :BoardType}) => {

  console.log(board);
  return (
    <div className="p-6 bg-gray-light w-full h-full">
      <DndContext>
        <div className="flex gap-8">
          {board.columns?.map((columns : any, id : number) => (
            <ColumnCard
              name={columns.name}
              key={id}
              color="#333"
              taskNumber={columns.tasks.length}
              tasks={columns.tasks}
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
};

export default ColumnsLayout;
