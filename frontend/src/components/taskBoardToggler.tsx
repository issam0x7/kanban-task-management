import Image from "next/image";
import Link from "next/link"



const TaskBoardToggler = () => {
  return (
    <div className="task-toggler py-3 hover:bg-primary hover:text-white ps-6 w-[85%] rounded-e-full">
      <Link href="#" className="flex items-center gap-4" >
        <Image src="/board.svg" alt="board-icon" width={16} height={16} className="fill-lines" />
        test
      </Link>
    </div>
  )
}

export default TaskBoardToggler;