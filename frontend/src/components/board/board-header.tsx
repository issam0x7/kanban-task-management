import BtnCreateTask from "./btn-create-task";

type BoradHeaderType = {
   boardName: string;
};

const BoradHeader = ({ boardName }: BoradHeaderType) => {
   return (
      <div className="flex items-center justify-between py-2 px-4 h-[100px]">
         <h3 className="text-xl font-bold text-black dark:text-white">
            {boardName}
         </h3>
         <BtnCreateTask />
      </div>
   );
};

export default BoradHeader;
