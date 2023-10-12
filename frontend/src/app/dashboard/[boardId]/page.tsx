import { getBoard } from "@/api/boards";
import BoardLayout from "@/components/board/board-layout";

const BoardPage = async ({ params }: { params: { boardId: string } }) => {
   // const board = await getBoard(params.boardId);

   return <BoardLayout boardId={params.boardId} />;
};

export default BoardPage;
