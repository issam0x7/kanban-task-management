
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

// import { Plus } from "lucide"
 
export default async function DashboardPage () {

  

  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-4">
        <p className="font-bold text-lg">This board is empty. Create a new column to get started.</p>
        <Button variant="default">
          <Plus /> <span>Add New Board</span>
        </Button>
    </div>
  )
}