import { apiClient } from "@/lib/api";
import { BoardType, TaskType } from "@/types/board";
import { create } from "zustand";



interface BoardState {
   board : BoardType ,
   setBoardState: (board: BoardType) => void ,
   updateTask : (task : TaskType, columnId: string) => void,
}

export const useBoardState = create<BoardState>((set,get) => ({
   board : { columns : [], name : "", _id : ""},
   setBoardState : (board) => set({board}),
   updateTask : async (task, columnId) => {
      await apiClient.put("/api/tasks/" + task._id ,{ task : {...task, columnId : columnId}});
   }
}));