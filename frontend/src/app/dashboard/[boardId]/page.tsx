import { getBoard } from "@/api/boards";
import BoradHeader from "@/components/board/board-header";
import ColumnsLayout from "@/components/columns/columns-layout";

const BoardPage = async ({ params }: { params: { boardId: string } }) => {
   const board = await getBoard(params.boardId);

   return (
      <>
         <BoradHeader boardName={board.board.name} />
         <ColumnsLayout boardData={board.board} />
      </>
   );
};

export default BoardPage;
