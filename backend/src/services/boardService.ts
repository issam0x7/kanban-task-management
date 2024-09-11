import httpStatus from "http-status";
import mongoose, { Document, Types } from "mongoose";
import Board, { IBoard } from "../models/boardModel";
import Task from "../models/taskModel";
import ApiError from "../utils/apiError";

interface IBoardBody {
  name: string;
  columns: Array<{ name: string; _id: Types.ObjectId }>;
}

interface IColumn {
  name: string;
  _id: Types.ObjectId;
  tasks?: Array<{ title: string; description: string }>;
}

/**
 * Create Board
 * @param {IBoardBody} boardBody
 * @return {Promise<IBoard>}
 */
export const createBoard = async (boardBody: IBoardBody): Promise<IBoard> => {
  try {
    return await Board.create(boardBody);
  } catch (error) {
    console.log(error);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Failed to create board");
  }
};

/**
 * Get a board By ID
 * @param {string} id
 * @returns {Promise<IBoard>}
 */
export const getBoardById = (id: string): Promise<IBoard | null> => {
  return Board.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(id) } },
    {
      $lookup: {
        from: "tasks",
        localField: "columns._id",
        foreignField: "columnId",
        as: "tasks",
      },
    },
    {
      $group: {
        _id: "$_id",
        name: { $first: "$name" },
        columns: {
          $push: {
            name: "$columns.name",
            _id: "$columns._id",
            tasks: "$tasks",
          },
        },
      },
    },
    {
      $replaceRoot: {
        newRoot: "$$ROOT",
      },
    },
  ]).exec();
};

/**
 * Get All Boards
 * @returns {Promise<IBoard[]>}
 */
export const getBoards = (): Promise<IBoard[]> => {
  return Board.aggregate([
    { $unwind: "$columns" },
    {
      $lookup: {
        from: "tasks",
        localField: "columns._id",
        foreignField: "columnId",
        as: "tasks",
        pipeline: [
          { $project: { _id: 0, id: "$_id", title: 1, description: 1 } },
        ],
      },
    },
    {
      $group: {
        _id: "$_id",
        name: { $first: "$name" },
        columns: {
          $push: {
            name: "$columns.name",
            id: "$columns._id",
            tasks: "$tasks",
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        id: "$_id",
        name: "$name",
        columns: "$columns",
      },
    },
  ]).exec();
};

/**
 * Update a Board
 * @param {string} boardId
 * @param {Partial<IBoardBody>} boardBody
 * @return {Promise<IBoard>}
 */
export const updateBoard = async (boardId: string, boardBody: Partial<IBoardBody>): Promise<IBoard | null> => {
  const board = await Board.findById(boardId);

  if (!board) {
    throw new ApiError(httpStatus.NOT_FOUND, "Board not found");
  }

  Object.assign(board, boardBody);
  await board.save();

  return board;
};

/**
 * Delete a Board service
 * @param {string} boardId
 * @return {Promise<IBoard | null>}
 */
export const deleteBoard = async (boardId: string): Promise<IBoard | null> => {
  const board = await Board.findByIdAndDelete(boardId);

  if (!board) {
    throw new ApiError(httpStatus.NOT_FOUND, "Board not found");
  }

  return board;
};

/**
 * Update Board columns
 * @param {string} boardId
 * @param {IColumn[]} columns
 * @return {Promise<IBoard>}
 */
export const updateBoardColumns = async (boardId: string, columns: IColumn[]): Promise<IBoard | null> => {
  const board = await Board.findById(boardId);

  if (!board) {
    throw new ApiError(httpStatus.NOT_FOUND, "Board not found");
  }

  const colIds = board.columns.map(col => col._id.toString());

  columns.forEach(col => {
    const isExist = colIds.includes(col._id.toString());
    if (!isExist) {
      board.columns.push(col);
    } else {
      board.columns.forEach(column => {
        if (column._id.toString() === col._id.toString()) {
          column.name = col.name;
        }
      });
    }
  });

  await board.save();

  return board;
};

/**
 * Remove Column from board
 * @param {string} boardId
 * @param {string} columnId
 * @return {Promise<any>}
 */
export const removeColumn = async (boardId: string, columnId: string): Promise<any> => {
  const board = await Board.updateOne(
    {
      _id: boardId,
    },
    { $pull: { columns: { _id: columnId } } }
  );

  if (!board) {
    throw new ApiError(httpStatus.NOT_FOUND, "Board not exist");
  }

  await Task.deleteMany({ columnId });

  return board;
};