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
import { ColumnType, TaskType } from "@/types/board";
import { CheckedState } from "@radix-ui/react-checkbox";

const TaskDetailModal = () => {
   const { board, task, setBoardState } = useBoardState((state) => ({
      board: state.board,
      task: state.task,
      setBoardState: state.setBoardState,
   }));

   const { isOpen, onClose, type } = useModal();

   const isModalOpen = isOpen && type === "taskDetail";

   const subtaskLength = task.subtasks.length;
   const completedSubtaskLength = task.subtasks.filter(subtask => subtask.isCompleted).length

   async function onChecked(checkedState: CheckedState, subtaskID: string) {
      try {
         const res = await apiClient.put(`/api/tasks/${task._id}/subtasks`, {
            subtasks: { _id: subtaskID, isCompleted: checkedState },
         });

         if (res.status === 200) {
            const columns = board.columns;
            const currentColumn = board.columns.get(
               task.columnId
            ) as ColumnType;
            const newTasks = currentColumn.tasks.map((taskItem) => {
               if (task._id === taskItem._id) {
                  return {
                     ...taskItem,
                     subtasks: taskItem.subtasks.map((subTask) => {
                        if (subTask._id === subtaskID) {
                           return {
                              ...subTask,
                              isCompleted: checkedState as boolean,
                           };
                        }
                        return subTask;
                     }),
                  };
               }
               return taskItem;
            });

            columns.set(task.columnId, { ...currentColumn, tasks: newTasks });

            setBoardState({ ...board, columns });
         }
      } catch (err) {
         console.log(err);
      }
   }

   async function onStatusChange(value: string) {
      try {
         const res = await apiClient.put("/api/tasks/" + task._id, {
            task: { columnId: value },
         });

         if (res.status === 200) {
            const columns = board.columns;

            const currentColumn = board.columns.get(
               task.columnId
            ) as ColumnType;
            const targetCoulumn = board.columns.get(value) as ColumnType;

            const currentColumnTasks = currentColumn?.tasks.filter(
               (newTask) => newTask._id !== task._id
            );
            const targetColumnTasks = targetCoulumn?.tasks as TaskType[];
            targetColumnTasks?.push({ ...task, columnId: value });

            columns.set(currentColumn?._id, {
               ...currentColumn,
               tasks: currentColumnTasks,
            });

            columns.set(value, { ...targetCoulumn, tasks: targetColumnTasks });

            setBoardState({ ...board, columns });
         }
      } catch (err) {
         console.log(err);
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
                     Subtasks ({completedSubtaskLength} of {subtaskLength})
                  </label>
                  <div className="grid gap-2">
                     {task.subtasks.map((item) => (
                        <SubTaskCheckBox
                           label={item.title}
                           key={item._id}
                           onCheckedChange={(checkedState) =>
                              onChecked(checkedState, item._id)
                           }
                           checked={!!item.isCompleted}
                        />
                     ))}
                  </div>
               </div>

               <Select
                  onValueChange={onStatusChange}
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
