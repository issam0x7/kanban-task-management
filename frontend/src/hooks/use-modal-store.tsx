import { create } from "zustand";

export type ModalType = "createBoard" | "createTask" | "taskDetail" | "editBoard" ;

interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;
  setIsOpen: (type: ModalType) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  isOpen: false,
  setIsOpen: (type) => set(() => ({ isOpen: true,type : type})),
  onClose: () => set(() => ({ isOpen: false, type : null })),
}));
