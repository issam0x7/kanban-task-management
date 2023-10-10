import { Button } from "../ui/button";

type BoradHeaderType = {
   boardName : string,

}

const BoradHeader = ({boardName}: BoradHeaderType) => {
   return ( 
      <div className="flex items-center justify-between py-2 px-4 h-[100px]">
         <h3 className="text-xl font-bold text-black dark:text-white">{boardName}</h3>
         <Button size="lg">
            + Add New Task
         </Button>
      </div>
    );
}
 
export default BoradHeader;