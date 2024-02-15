const Board = require("../models/boardModel");

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
    { $unwind: "$columns" /* Unwind the columns array*/ },
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

module.exports = {
  createBoard,
  getBoardById
};
