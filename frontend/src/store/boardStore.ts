import { apiClient } from "@/lib/api";
import { BoardType, TaskType } from "@/types/board";
import { create } from "zustand";



interface BoardState {
   boards : Map<string, BoardType>  | [],
   board : BoardType | {} ,
   setBoards : (boards : Map<string, BoardType> ) => void,
   setBoardState: (board: BoardType) => void ,
   updateTask : (task : TaskType, columnId: string) => void,
}

export const useBoardState = create<BoardState>((set,get) => ({
   boards : [],
   board : {},
   setBoards : (boards) => set({boards}),
   setBoardState : (board) => set({board}),
   updateTask : async (task, columnId) => {
      await apiClient.put("/api/tasks/" + task._id ,{ task : {...task, columnId : columnId}});
   }
}));