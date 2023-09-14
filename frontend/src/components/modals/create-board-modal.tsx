"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { Input } from "../ui/Input";
import { Button } from "../ui/button";
import { X } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Board name is required ",
  }),
  columns: z.array(
    z.object({
      column: z.string().min(3),
    })
  ),
});

const CreateBoardModal = () => {
  const { control, ...form } = useForm<any>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      columns: [{ column: "Todo" }, { column: "Doing" }],
    },
  });

  const { fields, append, prepend, remove, swap, move, insert, replace } =
    useFieldArray({
      name: "columns",
      control,
    });

  console.log(fields);

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <Dialog open>
      <DialogContent className="border-none py-8 px-8">
        <DialogHeader>
          <DialogTitle className="font-bold text-xl text-black">
            Add New Board
          </DialogTitle>
        </DialogHeader>
        <Form {...form} control={control}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name :</FormLabel>
                  <FormControl>
                    <Input placeholder="eg test" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-3">
              <label htmlFor="">Board Columns :</label>
              {fields.map((item, i) => (
                <div className="flex items-center">
                  <Input type="text" {...form.register(`columns.${i}.column`)} />
                  <Button className="pe-0" size="sm" variant="transparent" onClick={() => remove(i)}>
                    <X />
                  </Button>
                </div>
              ))}
            <Button className="w-full rounded-full" variant="secondary" onClick={() => {
              append({column : ""})
            }} >Create New Board</Button>
            </div>
            <Button className="w-full rounded-full" type="submit">Create New Board</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBoardModal;
