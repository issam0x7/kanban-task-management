const { default: mongoose } = require("mongoose");
const Board = require("../models/boardModel");
const Task = require("../models/taskModel");
const { boardService } = require("../services");
const httpStatus = require("http-status");

/** @desc Create a board
 *  @route POST /api/boards
 *  @access Private
 */
async function createBoard(req, res) {
  const board = await boardService.createBoard({ ...req.body });

  res.status(httpStatus.CREATED).send(board);
}

/** @desc Get a board
 * @route GET /api/boards/:id
 * @access Private
 */
async function getBoard(req, res, next) {
  try {
    const boardId = req.params.id;
    const board = await boardService.getBoardById(boardId);

    if (!board) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ message: "Board not found" });
    }

    res.json({ board: board[0] });
  } catch (error) {
    return next(error);
  }
}

/**
 * @desc Get all boards
 * @route GET /api/boards
 * @access Private
 */
async function getBoards(req, res, next) {
  try {
    // Fetch all boards from the database
    const boards = await boardService.getBoards();
    res.json(boards);
  } catch (error) {
    next(error);
  }
}

/**
 * @desc Update a board
 * @route PATCH /api/boards/:id
 * @access Private
 */
async function updateBoard(req, res, next) {
  try {
    const board = await boardService.updateBoard(req.params.id, req.body);

    res.json({ message: "Board Updated", board: board });
  } catch (error) {
    next(error);
  }
}

/**
 * @desc Delete a board
 * @route DELETE /api/boards/:id
 * @access Private
 */
async function deleteBoard(req, res, next) {
  try {
    const board = await boardService.deleteBoard(req.params.id);
    res.json({message : `the Board ${board.name} is deleted`});
  } catch (error) {
    next(error);
  }
}

async function updateBoardCloumns(req, res) {
  try {
   

    

    

    res.json({ message: `'${updatedBoard.name}' updated`, board: board });
  } catch (error) {
    // next(error);
    console.log(error);
  }
}

async function deleteColumn(req, res) {
  try {
    const { id } = req.params;

    const { _id } = req.body;
    // Confirm data
    if (!id && _id) {
      return res.status(400).json({ message: "Board ID required" });
    }

    // Confirm board exists to delete
    const result = await Board.updateOne(
      {
        _id: id,
      },
      { $pull: { columns: { _id: _id } } }
    ).exec();

    const removeReslut = await Task.deleteMany({ columnId: _id }).exec();

    // if (!board) {
    //    return res.status(404).json({ message: "Board not found" });
    // }

    // const result = await board.deleteOne();

    // const reply = `Board '${result.name}' with ID ${result._id} deleted`;

    res.json({ result, removeReslut });
  } catch (error) {
    // next(error);
    console.log(error);
  }
}

module.exports = {
  createBoard,
  getBoard,
  getBoards,
  updateBoard,
  deleteBoard,
  updateBoardCloumns,
  deleteColumn,
};
