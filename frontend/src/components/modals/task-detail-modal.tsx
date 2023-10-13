"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { apiClient } from "@/lib/api";
import {
   Dialog,
   DialogContent,
   DialogFooter,
   DialogHeader,
   DialogTitle,
   DialogDescription,
} from "../ui/dialog";

import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";

import { useModal } from "@/hooks/use-modal-store";

import { useBoardState } from "@/store/boardStore";
import SubTaskCheckBox from "../SubTaskCheckbox";
import { ColumnType } from "@/types/board";


const formSchema = z.object({
   title: z.string().min(3, {
      message: "Task title is required ",
   }),
   description: z.string().min(3, {
      message: "Task description is required ",
   }),
   columnId: z.string().min(3, {
      message: "Column is required ",
   }),
   subtasks: z.array(
      z.object({
         title: z.string().min(3),
         isCompleted: z.boolean(),
      })
   ),
});

const TaskDetailModal = () => {
   
   
   const { board, task } = useBoardState((state) => ({
      board: state.board,
      task: state.task,
   }));

   const { isOpen, onClose, type } = useModal();

   const isModalOpen = isOpen && type === "taskDetail";

   

   async function onSubmit(values: z.infer<typeof formSchema>) {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      console.log(values);
      try {
         const response = await apiClient.post("/api/tasks/create", values);

         if (response.status === 201) {
            
            onClose();
         }
      } catch (error) {
         throw new Error("Network Error");
      }
   }

   async function onChecked(
      event: React.ChangeEvent<HTMLInputElement>,
      subtaskID: string
   ) {}

   async function onStatusChange(
     value : string
   ) {
      try{  
         // const res = await apiClient.put("/api/tasks/" + task._id , { task : {columnId : value}});

         // if (res.status === 200) {
            const columns = board.columns;
            const  currentTaskColumn  = board.columns.get(task.columnId) as ColumnType;
            const newTasks = currentTaskColumn?.tasks.filter(newTask => newTask._id !== task._id);
            
            columns.set(currentTaskColumn?._id, {...currentTaskColumn, tasks : newTasks})
            

         // }
         
      } catch(err) {

      }
   }

   const handleClose = () => {
      onClose();
   };

   

   return (
      <Dialog open={isModalOpen} onOpenChange={handleClose}>
         <DialogContent className="border-none py-8 px-8 gap-8">
            <DialogHeader>
               <DialogTitle className="font-bold text-xl text-black dark:text-white">
                  Research pricing points of various competitors and trial
                  different business models
               </DialogTitle>
            </DialogHeader>
            <DialogDescription className="text-base">
               Research pricing points of various competitors and trial
               different business models
            </DialogDescription>

            <form className="space-y-8">
               <div className="subtasks-item">
                  <label className="block text-sm font-medium mb-4">
                     {" "}
                     Subtasks (2 of 3)
                  </label>
                  <div className="grid gap-2">
                     {task.subtasks.map((item) => (
                        <SubTaskCheckBox label={item.title} key={item._id} />
                     ))}
                  </div>
               </div>

               <Select
                  onValueChange={ onStatusChange}
                  defaultValue={task.columnId}
                  
               >
                  <SelectTrigger>
                     <SelectValue
                        className="text-foreground"
                        placeholder="Select a column"
                        
                     />
                  </SelectTrigger>

                  <SelectContent>
                     {Array.from(board?.columns.values()).map((column) => (
                        <SelectItem key={column._id} value={column._id}>
                           {column.name}
                        </SelectItem>
                     ))}
                  </SelectContent>
               </Select>
            </form>
         </DialogContent>
      </Dialog>
   );
};

export default TaskDetailModal;
