"use client";

import { useModal } from "@/hooks/use-modal-store";
import { Button } from "../ui/button";

const BtnCreateTask = () => {
   const { setIsOpen } = useModal();
   const handelCreateTask = () => {
      setIsOpen("createTask");
   };
   return <Button size="lg" onClick={handelCreateTask}>+ Add New Task</Button>;
};

export default BtnCreateTask;
