import { useModal } from "@/hooks/use-modal-store";

const BtnNewColumn = () => {

   const { setIsOpen } = useModal();
   return (
      <button
         className="bg-[#E9EFFA] dark:bg-gray-dark mt-9   min-w-[280px] rounded-md block"
         style={{ height: "calc(100% - 36px)" }}
         onClick={() => setIsOpen("editBoard")}
      >
         + New Column
      </button>
   );
};

export default BtnNewColumn;
