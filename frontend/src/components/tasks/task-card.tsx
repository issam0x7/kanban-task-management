import React from "react";

interface TaskCardProps {
   name: string;
   subTaskNumber: number;
   subTaskCompletedNumber: number;
   onClick: (e : React.MouseEvent<HTMLAnchorElement>) => void;
}

const TaskCard = ({
   name,
   subTaskNumber,
   subTaskCompletedNumber,
   onClick,
}: TaskCardProps) => {
   return (
      <a
         role="button"
         className="block p-4  bg-white rounded-md w-[280px] text-left dark:bg-gray-dark"
         onClick={onClick}
      >
         <h3 className="font-semibold text-base text-black dark:text-white">{name}</h3>
         <span className="dark:text-gray-medium text-sm">
            {" "}
            {subTaskCompletedNumber} of {subTaskNumber} substasks
         </span>
      </a>
   );
};

export default TaskCard;
