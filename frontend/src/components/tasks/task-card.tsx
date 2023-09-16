


interface TaskCardProps {
  name : string ,
  subTaskNumber : number,
  subTaskCompletedNumber : number,

}

const TaskCard = ({name, subTaskNumber,subTaskCompletedNumber }: TaskCardProps) => {
  return ( 
    <div className="p-4 bg-white rounded-md w-[280px] text-left">
      <h3 className="font-semibold text-base text-black">{name}</h3>
      <span> {subTaskCompletedNumber } of {subTaskNumber} substasks</span>
    </div>
   );
}
 
export default TaskCard
