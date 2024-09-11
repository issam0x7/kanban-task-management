import { z } from "zod";



export const createBoard = {
  body: z.object({
    name: z.string(),
    columns: z.array(
      z.object({ name: z.string(), color: z.string() })
    ),
    user: z.string(),
  }),
};

export const getBoard = {
  params: z.object({
    id: z.string(),
  }),
};

export const removeBoard = {
  params: z.object({
    id: z.string(),
  }),
};

export const updateBoard = {
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    name: z.string(),
    columns: z.array(
      z.object({
        name: z.string(),
        color: z.string(),
      })
    ),
  }),
};

export const updateBoardCloumns = {
  params: z.object({
    id: z.string(),
  }),
  body: z.array(
    z.object({
      name: z.string(),
      color: z.string(),
    })
  ),
};

export const removeColumn = {
  params: z.object({
    id: z.string(),
  }),
  body: z.object({
    columnId: z.string(),
  }),
};


