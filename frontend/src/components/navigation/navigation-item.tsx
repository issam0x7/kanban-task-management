import Link from "next/link"
import { LayoutDashboard  } from "lucide-react";


interface boardTogglerProps {
  taskName : string,
}

const NavigationItem = ({taskName} : boardTogglerProps  ) => {
  return (
    <div className="task-toggler py-3 hover:bg-primary-hover/10 ps-6 w-[85%] rounded-e-full group">
      <Link href="#" className="flex items-center gap-4 font-bold group-hover:text-primary" >
        <LayoutDashboard size={20} />
        {taskName}
      </Link>
    </div>
  )
}

export default NavigationItem