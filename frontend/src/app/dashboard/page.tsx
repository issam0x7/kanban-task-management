"use client"

import { Button } from "@/components/ui/button";
import { useModal } from "@/hooks/use-modal-store";
import { Plus } from "lucide-react";

// import { Plus } from "lucide"
 
export default  function DashboardPage () {

  const { setIsOpen } = useModal();

  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-4">
        <p className="font-bold text-lg">This board is empty. Create a new column to get started.</p>
        <Button variant="default" onClick={() => setIsOpen("createBoard")}>
          <Plus /> <span>Add New Board</span>
        </Button>
    </div>
  )
}