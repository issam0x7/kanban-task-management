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
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from "../ui/form";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Input } from "../ui/Input";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";
import { Textarea } from "../ui/textarea";
import { useBoardState } from "@/store/boardStore";
import SubTaskCheckBox from "../SubTaskCheckbox";

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
      task : state.task
   }));

   console.log(task)

   const { isOpen, onClose, type } = useModal();

   const isModalOpen = isOpen && type === "taskDetail";

   const { control, ...form } = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         title: "",
         description: "",
         subtasks: [
            { title: "", isCompleted: false },
            { title: "", isCompleted: false },
         ],
      },
   });

   const { fields, append, prepend, remove, swap, move, insert, replace } =
      useFieldArray({
         name: "subtasks",
         control,
      });

   async function onSubmit(values: z.infer<typeof formSchema>) {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      console.log(values);
      try {
         const response = await apiClient.post("/api/tasks/create", values);

         if (response.status === 201) {
            form.reset();
            onClose();
         }
      } catch (error) {
         throw new Error("Network Error");
      }
   }

   const handleClose = () => {
      form.reset();
      onClose();
   };

   const isSubmitign = form.formState.isSubmitting;

   return (
      <Dialog open={isModalOpen} onOpenChange={handleClose}>
         <DialogContent className="border-none py-8 px-8 gap-8">
            <DialogHeader>
               <DialogTitle className="font-bold text-xl text-black">
                  Research pricing points of various competitors and trial
                  different business models
               </DialogTitle>
            </DialogHeader>
            <DialogDescription className="text-base">
               Research pricing points of various competitors and trial
               different business models
            </DialogDescription>
            <Form {...form} control={control}>
               <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
               >
                  <div className="subtasks-item">
                     <label className="block text-sm font-medium mb-4"> Subtasks (2 of 3)</label>
                     <div className="grid gap-2">
                        <SubTaskCheckBox label="test"  />
                        <SubTaskCheckBox label="test" />
                        <SubTaskCheckBox label="test" />
                     </div>
                  </div>

                  <FormField
                     control={control}
                     name="columnId"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Email</FormLabel>
                           <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                           >
                              <FormControl>
                                 <SelectTrigger>
                                    <SelectValue
                                       className="text-foreground"
                                       placeholder="Select a column"
                                    />
                                 </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                 {Array.from(board?.columns.values()).map(
                                    (column) => (
                                       <SelectItem
                                          key={column._id}
                                          value={column._id}
                                       >
                                          {column.name}
                                       </SelectItem>
                                    )
                                 )}
                              </SelectContent>
                           </Select>
                           {/* <FormDescription>
                              You can manage email addresses in your{" "}
                              <Link href="/examples/forms">email settings</Link>
                              .
                           </FormDescription> */}
                           <FormMessage />
                        </FormItem>
                     )}
                  />
                  <Button
                     disabled={isSubmitign}
                     className="w-full rounded-full"
                     type="submit"
                  >
                     Create New Board
                  </Button>
               </form>
            </Form>
         </DialogContent>
      </Dialog>
   );
};

export default TaskDetailModal;
