import Draggable from "../dnd/draggable";
import TaskCard from "../tasks/task-card";
import ColumnDroppable from "./column-droppable";
import ColumnHeader, { ColumnHeaderProps } from "./column-header";


interface ColumnCardProps extends ColumnHeaderProps {
  tasks : any
}


const ColumnCard = ({name , color, taskNumber, tasks} : ColumnCardProps) => {
  return (
    <div className="">
      <ColumnHeader name={name} color="#333" taskNumber={taskNumber} />
      <ColumnDroppable id="lansfdl">
        <div className="flex flex-col gap-4">
          <Draggable id="task">
            <TaskCard
              name="task"
              subTaskNumber={5}
              subTaskCompletedNumber={2}
            />
          </Draggable>
          <Draggable id="hello">
            <TaskCard
              name="task1"
              subTaskNumber={5}
              subTaskCompletedNumber={2}
            />
          </Draggable>
        </div>
      </ColumnDroppable>
    </div>
  );
};

export default ColumnCard;
