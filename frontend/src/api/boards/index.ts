import { apiClient } from "@/lib/api";
import { BoardType, ColumnIdType, ColumnType } from "@/types/board";

export async function getBoards() {
   const res = await apiClient.get("/api/boards");

   if (res.status !== 200) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
   }

   const boards = res.data;

   const boardsMap = boards.reduce(
      (map: Map<string, BoardType>, board: BoardType) => {
         const columns = Array.from(board.columns.values());

         const columnsMap = columns.reduce(
            (map: Map<string, ColumnType>, column: ColumnType) =>
               map.set(column._id, column),
            new Map<string, ColumnType>()
         );

         return map.set(board._id, { ...board, columns: columnsMap });
      },
      new Map<string, BoardType>()
   );

   return boardsMap;
}

export async function getBoard(id: string) {
   const res = await apiClient.get("/api/boards/" + id);
   if (res.status !== 200) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error("Failed to fetch data");
   }

   const data = res.data.boards;
   // const columns = data.columns;

   // const columnsMap = columns.reduce(
   //    (map: Map<ColumnIdType, ColumnType>, column: ColumnType) => {
   //       map.set(column._id, column);

   //       return map;
   //    },
   //    new Map<ColumnIdType, ColumnType>()
   // );

   // console.log(columnsMap);

   return res.data;
}
