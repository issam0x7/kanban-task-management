import ThemeSwitcher from "@/components/ThemeSwitcher";
import { AddBoardToggler, BoardToggler } from "@/components/taskBoardToggler";
import Header from "../header";
import NavigationHeader from "./navigation-header";

type board = {
  id: string;
  name: string;
  columns: object;
};

interface sidebarProps {
  boards: board[];
}

const NavigationSidebar = ({ boards }: sidebarProps) => {
  return (
    <div>
      <NavigationHeader />
      <nav className="flex flex-col justify-between w-[300px] h-full border-r border-lines  py-8">
        <div className="boards">
          <h6 className="text-sm px-6">ALL BOARDS </h6>
          <div className="board-list mt-6">
            {boards.map((board) => {
              return <BoardToggler taskName={board.name} />;
            })}

            <AddBoardToggler />
          </div>
        </div>
        <div className="control px-6">
          <ThemeSwitcher />
        </div>
      </nav>
    </div>
  );
};

export default NavigationSidebar;
