import { create } from "zustand";

export type ModalType = "createBoard" ;

interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;
  setIsOpen: (type: ModalType) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  isOpen: false,
  setIsOpen: (type) => set({ isOpen: true, type}),
  onClose: () => set((state) => ({ isOpen: false, type : null })),
}));
