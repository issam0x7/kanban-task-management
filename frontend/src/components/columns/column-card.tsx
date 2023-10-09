import { TaskType } from "@/types/board";

import TaskCard from "../tasks/task-card";
import ColumnDroppable from "./column-droppable";
import ColumnHeader, { ColumnHeaderProps } from "./column-header";
import { Draggable, Droppable } from "@hello-pangea/dnd";

interface ColumnCardProps extends ColumnHeaderProps {
   tasks: TaskType[];
}

const ColumnCard = ({ name, color, taskNumber, tasks }: ColumnCardProps) => {
   return (
      <div className="">
         <ColumnHeader name={name} color="#333" taskNumber={taskNumber} />
         <Droppable droppableId={name}>
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
