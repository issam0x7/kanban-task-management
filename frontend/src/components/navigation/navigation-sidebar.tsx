import ThemeSwitcher from "@/components/ThemeSwitcher";


import NavigationHeader from "./navigation-header";
import NavigationItem from "./navigation-item";
import CreateBoardNavigation from "./navigation-create-board";

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
              return <NavigationItem taskName={board.name} />;
            })}

            <CreateBoardNavigation />
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
