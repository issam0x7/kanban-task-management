"use client"

import React from "react";
import { useDroppable } from "@dnd-kit/core";


interface ColumnDroppable {
  id : string,
  children : React.ReactNode,
}

const ColumnDroppable = (props : ColumnDroppable) => {
  const {setNodeRef} = useDroppable({
    id: props.id,
  });
  
  return (
    <div ref={setNodeRef}>
      {props.children}
    </div>
  );
}
 
export default ColumnDroppable;