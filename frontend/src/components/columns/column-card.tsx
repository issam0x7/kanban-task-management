import { TaskType } from "@/types/board";
import Draggable from "../dnd/draggable";
import TaskCard from "../tasks/task-card";
import ColumnDroppable from "./column-droppable";
import ColumnHeader, { ColumnHeaderProps } from "./column-header";


interface ColumnCardProps extends ColumnHeaderProps {
  tasks : TaskType [];
}


const ColumnCard = ({name , color, taskNumber, tasks} : ColumnCardProps) => {
  return (
    <div className="">
      <ColumnHeader name={name} color="#333" taskNumber={taskNumber} />
      <ColumnDroppable id="lansfdl">
        <div className="flex flex-col gap-4">
          {tasks.map((task, index) => (
            <Draggable id={task._id}>
            <TaskCard
              name={task.title}
              subTaskNumber={task.subtasks?.length}
              subTaskCompletedNumber={2}
            />
          </Draggable>
          ))}    
        </div>
      </ColumnDroppable>
    </div>
  );
};

export default ColumnCard;
