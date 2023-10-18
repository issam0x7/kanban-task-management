'use client';

import { useEffect, useMemo } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { X, Trash2 } from 'lucide-react';

import { useModal } from '@/hooks/use-modal-store';
import { useBoardState } from '@/store/boardStore';

import { apiClient } from '@/lib/api';

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/Input';
import { Button } from '../ui/button';

const formSchema = z.object({
    name: z.string().min(3, {
        message: 'Board name is required ',
    }),
    columns: z.array(
        z.object({
            name: z.string().min(3),
            _id: z.optional(z.string()),
        }),
    ),
});

const CreateBoardModal = () => {
    const { isOpen, onClose, type } = useModal();

    const { board, boards, setBoards, getBoardsRequest } = useBoardState((state) => ({
        board: state.board,
        boards: state.boards,
        setBoards: state.setBoards,
        getBoardsRequest: state.getBoardsRequest,
    }));

    const isModalOpen = isOpen && (type === 'createBoard' || type === 'editBoard');

    const isModalOpenForEdit = isOpen && type === 'editBoard';

    type BoardFromType = z.infer<typeof formSchema>;

    const defaultValue: Partial<BoardFromType> = {
        name: isModalOpenForEdit ? board.name : '',
        columns: isModalOpenForEdit
            ? Array.from(board.columns).map(([, column]) => ({
                  name: column.name,
                  _id: column._id,
              }))
            : [{ name: 'Todo' }, { name: 'Doing' }],
    };

    console.log(defaultValue);

    const { control, ...form } = useForm<BoardFromType>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValue,
    });

    const { fields, append, prepend, remove, swap, move, insert, replace } = useFieldArray({
        name: 'columns',
        control,
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        try {
            if (isModalOpenForEdit) {
                const res = await apiClient.put(`/api/boards/${board._id}/columns`, values);
                if (res.status === 200) {
                    getBoardsRequest();
                }
                return;
            }

            const response = await apiClient.post('/api/boards', values);

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

    useEffect(() => {
        form.reset({
            name: isModalOpenForEdit ? board.name : '',
            columns: isModalOpenForEdit
                ? Array.from(board.columns).map(([, column]) => ({
                      name: column.name || '',
                      _id: column._id,
                  }))
                : [{ name: 'Todo' }, { name: 'Doing' }],
        });
    }, [isModalOpenForEdit]);

    const isSubmitign = form.formState.isSubmitting;

    return (
        <Dialog open={isModalOpen} onOpenChange={handleClose}>
            <DialogContent className="border-none py-8 px-8">
                <DialogHeader>
                    <DialogTitle className="font-bold text-xl text-black dark:text-white">Add New Board</DialogTitle>
                </DialogHeader>

                <Form {...form} control={control}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name : </FormLabel>
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
                                <FormField
                                    control={control}
                                    name={`columns.${i}.name`}
                                    key={i}
                                    render={({ field }) => {
                                        return (
                                            <FormItem>
                                                <FormControl>
                                                    <div className="flex">
                                                        <Input placeholder="eg test" {...field} />
                                                        {item._id ? (
                                                            <Button
                                                                className="pe-0"
                                                                size="sm"
                                                                variant="transparent"
                                                                onClick={(): void => remove(i)}
                                                            >
                                                               <Trash2 className="text-destructive" />
                                                            </Button>
                                                        ) : (
                                                            <Button
                                                                className="pe-0"
                                                                size="sm"
                                                                variant="transparent"
                                                                onClick={(): void => remove(i)}
                                                            >
                                                                <X />
                                                            </Button>
                                                        )}
                                                    </div>
                                                </FormControl>
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
                                    append({ name: '' });
                                }}
                            >
                                Add New Column
                            </Button>
                        </div>
                        <Button disabled={isSubmitign} className="w-full rounded-full" type="submit">
                            {isModalOpenForEdit ? 'Save Board' : 'Create New Board'}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateBoardModal;
