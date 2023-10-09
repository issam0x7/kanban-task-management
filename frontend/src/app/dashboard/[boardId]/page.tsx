import { getBoard } from "@/api/boards";
import ColumnsLayout from "@/components/columns/columns-layout";





const BoardPage =async ({ params }: { params: { boardId: string } }) => {

  const board = await getBoard(params.boardId);
  
  return ( 
    <ColumnsLayout boardData={board.board} />
   );
}
 
export default BoardPage;