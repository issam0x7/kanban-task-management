import Link from "next/link"
import { LayoutDashboard  } from "lucide-react";


const TaskBoardToggler = () => {
  return (
    <div className="task-toggler py-3 hover:bg-primary hover:text-white ps-6 w-[85%] rounded-e-full mt-4">
      <Link href="#" className="flex items-center gap-4 font-bold" >
        <LayoutDashboard />
        test
      </Link>
    </div>
  )
}

export default TaskBoardToggler;