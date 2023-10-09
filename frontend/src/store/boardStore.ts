import { BoardType } from "@/types/board";
import { create } from "zustand";



interface BoardState {
   board : BoardType ,
   setBoardState: (board: BoardType) => void  
}

export const useBoardState = create<BoardState>((set,get) => ({
   board : { columns : [], name : "", _id : ""},
   setBoardState : (board) => set({board})
}));