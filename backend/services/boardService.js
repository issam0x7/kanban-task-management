const { default: mongoose } = require("mongoose");
const Board = require("../models/boardModel");
const ApiError = require("../utils/apiError");
const httpStatus = require("http-status");

/**
 * Create Board
 * @param {Object} BoardBody
 * @return {Promise<Board>}
 */
const createBoard = async (BoardBody) => {
  try {
    return Board.create(BoardBody);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Get a board By ID
 * @param {string} id
 * @returns {Promise<Board>}
 */

const getBoardById = (id) => {
  return Board.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(id) } },
    // { $unwind: "$rootArray" /* Unwind the columns array*/ },
    {
      $lookup: {
        from: "tasks",
        /* Name of the tasks collection*/
        localField: "columns._id",
        foreignField: "columnId",
        as: "tasks",
      },
    },
    {
      $group: {
        _id: "$_id",
        name: { $first: "$name" },
        /* Keep the board name*/
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
        newRoot: "$$ROOT", // Replace the root with the entire document
      },
    },
  ]);
};

/**
 * get All Boards
 * @returns {Promise<Board[]>}
 */

const getBoards = () => {
  return Board.aggregate([
    { $unwind: "$columns" /* Unwind the columns array*/ },
    {
      $lookup: {
        from: "tasks",
        /* Name of the tasks collection*/
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
        /* Keep the board name*/
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
  ]);
};

/**
 * @desc Update a Board
 * @param {string} boardId
 * @param {object} boardBody
 */

const updateBoard = async (boardId, boardBody) => {
  const board = await Board.findById(boardId);

  if (!board) {
    throw new ApiError(httpStatus.NOT_FOUND, "board not found");
  }

  Object.assign(board, boardBody);

  await board.save();

  return board;
};

/**
 * @desc Delete a Board service
 * @param {string} boardId
 */

const deleteBoard = async (boardId) => {
  const board = await Board.findByIdAndDelete(boardId);
  console.log(board);
  if (!board) {
    throw new ApiError(httpStatus.NOT_FOUND, "board not found");
  }

  // await board.remove();

  return board;
};

module.exports = {
  createBoard,
  getBoardById,
  getBoards,
  updateBoard,
  deleteBoard,
};
