'use client';

import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { apiClient } from '@/lib/api';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '../ui/Input';
import { Button } from '../ui/button';
import { X } from 'lucide-react';
import { useModal } from '@/hooks/use-modal-store';
import { Textarea } from '../ui/textarea';
import { useBoardState } from '@/store/boardStore';

const formSchema = z.object({
    title: z.string().min(3, {
        message: 'Task title is required ',
    }),
    description: z.string().min(3, {
        message: 'Task description is required ',
    }),
    columnId: z.string().min(3, {
        message: 'Column is required ',
    }),
    subtasks: z.array(
        z.object({
            title: z.string().min(3),
            isCompleted: z.boolean(),
        }),
    ),
});

const CreateTaskModal = () => {
   //  const { board } = useBoardState((state) => ({
   //      board: state.board,
   //  }));

    const { isOpen, onClose, type } = useModal();

    const isModalOpen = isOpen && type === 'createTask';

    const { control, ...form } = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            description: '',
            subtasks: [
                { title: '', isCompleted: false },
                { title: '', isCompleted: false },
            ],
        },
        mode : "onChange"
    });

    const { fields, append, remove } = useFieldArray({
        name: 'subtasks',
        control,
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        try {
            const response = await apiClient.post('/api/tasks/create', values);

            if (response.status === 201) {
                form.reset();
                onClose();
            }
        } catch (error) {
            throw new Error('Network Error');
        }
    }

    const handleClose = () => {
        form.reset();
        onClose();
    };

    const isSubmitign = form.formState.isSubmitting;


   //  const selectItems = Array.from(board.columns.entries()).map(([id, value]) => (<SelectItem key={id} value={id}> {value.name}</SelectItem>));
    

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="border-none py-8 px-8">
                <DialogHeader>
                    <DialogTitle className="font-bold text-xl text-black dark:text-white">Add New Task</DialogTitle>
                </DialogHeader>
                <Form {...form} control={control}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title :</FormLabel>
                                    <FormControl>
                                        <Input placeholder="eg test" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description :</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="eg test" {...field} />
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
                                <FormField
                                    control={control}
                                    name={`subtasks.${i}.title`}
                                    key={i}
                                    render={({ field }) => {
                                        return (
                                            <FormItem>
                                                <FormControl>
                                                    <Input placeholder="eg test" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        );
                                    }}
                                />
                            ))}
                            <Button
                                className="w-full rounded-full"
                                variant="secondary"
                                onClick={(e) => {
                                    e.preventDefault();
                                    append({ title: '', isCompleted: false });
                                }}
                            >
                                + Add new Subtask
                            </Button>
                        </div>

                        <FormField
                            control={control}
                            name="columnId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Status : </FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                    className="text-foreground"
                                                    placeholder="Select a column"
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                           {/* {selectItems} */}
                                           <SelectItem value="lasjfdla"> test</SelectItem>
                                           <SelectItem value="oajsdn">test </SelectItem>
                                           <SelectItem value="flsafdo">test </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                        <Button disabled={isSubmitign} className="w-full rounded-full" type="submit">
                            Create New Board
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateTaskModal;
