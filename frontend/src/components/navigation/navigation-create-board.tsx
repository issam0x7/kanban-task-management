"use client"

import { useModal } from "@/hooks/use-modal-store";
import { LayoutDashboard } from "lucide-react";


const CreateBoardNavigation = () => {

  const { setIsOpen } = useModal();

  const handleOpenModal = () => {
    setIsOpen("createBoard");
  }

  return (
    <div className="task-toggler py-3  ps-6 w-[85%] rounded-e-full group">
      <button  className="flex items-center gap-4 font-bold" onClick={handleOpenModal} >
        <LayoutDashboard size={20} className="text-primary" />
        <span className="text-primary text-base">+ Create New Board</span>
      </button>
    </div>
  )
}

export default  CreateBoardNavigation;