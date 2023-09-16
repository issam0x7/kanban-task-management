"use client";

import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { api } from "@/lib/api";
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
import { useModal } from "@/hooks/use-modal-store";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Board name is required ",
  }),
  columns: z.array(
    z.object({
      name: z.string().min(3),
    })
  ),
});

const CreateBoardModal = () => {
  const { isOpen, onClose, type } = useModal();

  const isModalOpen = isOpen && type === "createBoard";

  const { control, ...form } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      columns: [{ name: "Todo" }, { name: "Doing" }],
    },
  });

  const { fields, append, prepend, remove, swap, move, insert, replace } =
    useFieldArray({
      name: "columns",
      control,
    });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      const response = await api.post("/api/boards", values);

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
              <label htmlFor="" className="text-sm font-medium">
                Board Columns :
              </label>
              {fields.map((item, i) => (
                <div className="flex items-center" key={i}>
                  <Input type="text" {...form.register(`columns.${i}.name`)} />
                  <Button
                    className="pe-0"
                    size="sm"
                    variant="transparent"
                    onClick={() => remove(i)}
                  >
                    <X />
                  </Button>
                </div>
              ))}
              <Button
                className="w-full rounded-full"
                variant="secondary"
                onClick={(e) => {
                  e.preventDefault();
                  append({ name: "" });
                }}
              >
                Create New Board
              </Button>
            </div>
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

export default CreateBoardModal;
