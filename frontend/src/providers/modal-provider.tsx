"use client"

import CreateBoardModal from "@/components/modals/create-board-modal";
import { useEffect, useState } from "react";


const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  },[])

  if(!isMounted) {
    return null;
  }
  return ( 
    <>
      <CreateBoardModal />
    </>
   );
}
 
export default ModalProvider;

