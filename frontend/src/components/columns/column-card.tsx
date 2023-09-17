import Draggable from "../dnd/draggable";
import TaskCard from "../tasks/task-card";
import ColumnDroppable from "./column-droppable";
import ColumnHeader from "./column-header";

const ColumnCard = () => {
  return (
    <div className="">
      <ColumnHeader name="TODO" color="#333" taskNumber={5} />
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
