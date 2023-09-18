import { getBoard } from "@/api/boards";
import ColumnsLayout from "@/components/columns/columns-layout";
import { boardType } from "@/types/board";




const BoardPage =async ({ params }: { params: { boardId: string } }) => {
  const board = await getBoard(params.boardId);
    
  return ( 
    <ColumnsLayout board={board.board} />
   );
}
 
export default BoardPage;