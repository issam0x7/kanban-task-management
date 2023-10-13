"use client";

import { useEffect } from "react";
import { useBoardState } from "@/store/boardStore";

import BoradHeader from "@/components/board/board-header";
import ColumnsLayout from "@/components/columns/columns-layout";

const BoardLayout = ({boardId}: {boardId :string}) => {
   const { setBoard, board, boards } = useBoardState((state) => ({
      setBoard: state.setBoardState,
      board: state.board,
      boards: state.boards,
   }));

   

   useEffect(() => {
      setBoard(boards.get(boardId) || {_id : "", name : "", columns : new Map()});
   }, [boardId, boards]);

   return (
      <>
         <BoradHeader boardName={board?.name} />
         <ColumnsLayout boardData={board} />
      </>
   );
};

export default BoardLayout;
