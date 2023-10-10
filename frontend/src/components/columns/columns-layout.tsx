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

   console.log(board);
   useEffect(() => {
      setBoradState(boardData);
   }, []);

   const onDragEnd = (result: any) => {
      const { destination, source } = result;

      if (!destination) return;

      const columnDestinationId = destination.droppableId;
      const columns = Array.from(board.columns);
      console.log(columns);
      // console.log(source);
      const startCol = columns.filter(
         (col) => col._id === source.droppableId
      )[0];
      const finishCol = columns.filter(
         (col) => col._id === columnDestinationId
      )[0];

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

         const newColumns = columns.map((column) => {
            if (column._id === columnDestinationId)
               return { ...column, tasks: finishTasks };
            return column;
         });

         console.log(newColumns);

         setBoradState({ ...board, columns: newColumns });
         updateTask(todoMoved, columnDestinationId)
      }
   };
   return (
      <div className="p-6 bg-gray-light w-full h-full">
         <DragDropContext onDragEnd={onDragEnd}>
            <div className="flex gap-8">
               {board?.columns?.map((columns: any, id: number) => (
                  <ColumnCard
                     name={columns.name}
                     key={id}
                     _id={columns._id}
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
