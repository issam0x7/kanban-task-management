"use client";


import { useEffect } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import ColumnCard from "./column-card";

import { BoardType } from "@/types/board";
import { useBoardState } from "@/store/boardStore";

const ColumnsLayout = ({ boardData }: { boardData: BoardType }) => {

   const {setBoradState, board} = useBoardState(state => ({setBoradState : state.setBoardState, board : state.board}));
   console.log(board)
   useEffect(() => {
      setBoradState(boardData);
   },[])

   const onDragEnd = (result : any )   => {
      console.log(result);
   }
   return (
      <div className="p-6 bg-gray-light w-full h-full">
         <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex gap-8">
               {board?.columns?.map((columns: any, id: number) => (
                  <ColumnCard
                     name={columns.name}
                     key={id}
                     color="#333"
                     taskNumber={columns.tasks.length}
                     tasks={columns.tasks}
                  />
               ))}
            </div>
         </DragDropContext>
      </div>
   );
};

export default ColumnsLayout;
