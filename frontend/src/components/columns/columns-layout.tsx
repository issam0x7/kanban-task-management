"use client";

import { useEffect } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import ColumnCard from "./column-card";

import { BoardType } from "@/types/board";
import { useBoardState } from "@/store/boardStore";

const ColumnsLayout = ({ boardData }: { boardData: BoardType }) => {

   const { board, setBoradState, updateTask } = useBoardState((state) => ({
      board: state.board,
      setBoradState: state.setBoardState,
      updateTask : state.updateTask,
   }));

   const columnsData = Array.from(boardData.columns.values());
   

   useEffect(() => {
      setBoradState(boardData);
   }, []);

   const onDragEnd = (result: any) => {
      const { destination, source } = result;

      if (!destination) return;

      const columnDestinationId = destination.droppableId;
      const columns = board.columns;
      
      // console.log(source);
      const startCol = columns.get(source.droppableId);
      const finishCol = columns.get(columnDestinationId);

      if (!startCol || !finishCol) return;

      if (source.index === destination.index && startCol === finishCol) return;

      const newTasks = startCol.tasks;

      // removing todo from source column.
      const [todoMoved] = newTasks?.splice(source.index, 1);
      // console.log(todoMoved)

      if (startCol._id === finishCol._id) {
         newTasks.splice(destination.index, 0, todoMoved);
         setBoradState({ ...board, columns });
      } else {

         const finishTasks = Array.from(finishCol.tasks);

         finishTasks.splice(destination.index, 0, {
            ...todoMoved,
            columnId: columnDestinationId,
         });

         const newCol = { _id : columnDestinationId, name : finishCol.name , tasks : finishTasks}
         const newColumns =new Map(columns);
         
         newColumns.set(columnDestinationId, newCol)

        

         setBoradState({ ...board, columns: newColumns });
         updateTask(todoMoved, columnDestinationId)
      }
   };
   return (
      <div className="p-6 bg-gray-light w-full h-full dark:bg-gray-dark-1">
         <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex gap-8">
               {columnsData.map((column: any, id: number) => (
                  <ColumnCard
                     name={column.name}
                     key={id}
                     _id={column._id}
                     color="#333"
                     taskNumber={column.tasks.length}
                     tasks={column.tasks}
                  />
               ))}
            </div>
         </DragDropContext>
      </div>
   );
};

export default ColumnsLayout;
