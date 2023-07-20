import React, { ComponentPropsWithoutRef, ElementRef, InputHTMLAttributes, forwardRef } from "react";
import { Checkbox } from "./ui/checkbox";
import { twMerge } from "tailwind-merge";

interface SubTaskCheckBoxProps extends InputHTMLAttributes<HTMLButtonElement> {
  label : string
} 


const SubTaskCheckBox = forwardRef<HTMLButtonElement,SubTaskCheckBoxProps>(({className,name, label,...props}, ref) => {
  return (
    <div className="checkbox__container ">
      <div className={twMerge("flex items-center py-3 px-3 bg-gray-light dark:bg-gray-dark dark:hover:bg-primary/25  rounded-md gap-3 hover:bg-primary/25 transition-all", className)}>
     <Checkbox className="rounded-[2px] bg-white" ref={ref} />
     
     <span className={twMerge("text-black dark:text-white text-sm font-bold", props.checked ? "line-through" : "")}>{label}</span>
     </div>
    </div>
  )
});

export default SubTaskCheckBox;