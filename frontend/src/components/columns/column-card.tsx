import { Draggable, Droppable } from "@hello-pangea/dnd";

import TaskCard from "../tasks/task-card";
import ColumnHeader, { ColumnHeaderProps } from "./column-header";
import { TaskType } from "@/types/board";
import { useBoardState } from "@/store/boardStore";
import { useModal } from "@/hooks/use-modal-store";
import React from "react";

interface ColumnCardProps extends ColumnHeaderProps {
   _id: string;
   tasks: TaskType[];
}

const ColumnCard = ({
   _id,
   name,
   color,
   taskNumber,
   tasks,
}: ColumnCardProps) => {
   const { setTask } = useBoardState((state) => ({
      setTask: state.setTask,
   }));

   const { setIsOpen } = useModal((state) => ({
      setIsOpen: state.setIsOpen,
   }));

   const handleCardClick = (e : React.MouseEvent<HTMLAnchorElement> ,task : TaskType) => {
      setIsOpen("taskDetail");
      setTask(task)
   };

   return (
      <div className="">
         <ColumnHeader name={name} color="#333" taskNumber={taskNumber} />
         <Droppable droppableId={_id}>
            {(provided, snapshot) => (
               <div
                  className="flex flex-col gap-4 min-w-[280px] h-full"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
               >
                  {tasks.map((task, index) => (
                     <Draggable
                        draggableId={task._id}
                        index={index}
                        key={task._id}
                     >
                        {(provided, snapshot) => (
                           <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                           >
                              <TaskCard
                                 name={task.title}
                                 subTaskNumber={task.subtasks?.length}
                                 subTaskCompletedNumber={2}
                                 onClick={(e : React.MouseEvent<HTMLAnchorElement>) => handleCardClick(e, task)}
                              />
                           </div>
                        )}
                     </Draggable>
                  ))}
                  {provided.placeholder}
               </div>
            )}
         </Droppable>
      </div>
   );
};

export default ColumnCard;
