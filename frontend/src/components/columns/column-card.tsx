import Draggable from "../dnd/draggable";
import TaskCard from "../tasks/task-card";
import ColumnDroppable from "./column-droppable";
import ColumnHeader from "./column-header";

const ColumnCard = () => {
  return (
    <div className="">
      <ColumnHeader name="TODO" color="#333" taskNumber={5} />
      <ColumnDroppable id="lansfdl">
        <Draggable id="task">
          <TaskCard name="task" subTaskNumber={5} subTaskCompletedNumber={2} />
        </Draggable>
      </ColumnDroppable>
    </div>
  );
};

export default ColumnCard;
