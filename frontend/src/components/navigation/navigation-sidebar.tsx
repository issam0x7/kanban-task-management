"use client"

import ThemeSwitcher from "@/components/ThemeSwitcher";


import NavigationHeader from "./navigation-header";
import NavigationItem from "./navigation-item";
import CreateBoardNavigation from "./navigation-create-board";
import { useBoardState } from "@/store/boardStore";
import { useEffect } from "react";
import { BoardType } from "@/types/board";

type board = {
  _id: string;
  name: string;
  columns: object;
};

interface sidebarProps {
  boards: Map<string, BoardType>;
}

const NavigationSidebar = ({ boards }: sidebarProps) => {

  const { setBoards } = useBoardState(state => ({ setBoards : state.setBoards}));

  useEffect(() => {
    setBoards(boards);
  },[boards])

  return (
    <div className="h-full flex flex-col bg-gray-dark">
      <NavigationHeader />
      <nav className="flex flex-col justify-between w-[300px] h-full border-r border-lines  py-8">
        <div className="boards">
          <h6 className="text-sm px-6">ALL BOARDS </h6>
          <div className="board-list mt-6">
            {Array.from(boards.values()).map((board) => {
              return <NavigationItem key={board._id}  taskName={board.name} id={board._id} />;
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
