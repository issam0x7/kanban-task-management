const Board = require("../models/boardModel");

// @desc Create a board
// @route POST /api/boards
// @access Private
async function createBoard(req, res) {
  try {
    const { name, columns } = req.body;
    

    if (!name || !columns || !Array.isArray(columns)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid data provided" });
    }

    
    const newBoard = await Board.create({ name, columns });

    return res
      .status(201)
      .json({ success: true, message: "Board created", board: newBoard });
  } catch (error) {
    // console.log(error)
  }
}

// @desc Get a board
// @route GET /api/boards/:id
// @access Private
async function getBoard(req, res) {
  try {
    const boardId = req.params.id;
    const board = await Board.findById(boardId).exec();

    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    res.json({ board });
  } catch (error) {
    next(error);
  }
}

// @desc Get all boards
// @route GET /api/boards
// @access Private
async function getBoards(req, res) {
  try {
    // Fetch all boards from the database
    const boards = await Board.find({}).populate('columns').exec();
    console.log(boards)
    res.json(boards);
  } catch (error) {
    next(error);
  }
}

// @desc Update a board
// @route PATCH /api/boards/:id
// @access Private
async function updateBoard(req, res) {
  try {
    const { id, name, columns } = req.body;

    // Confirm data
    if (!id) {
      return res.status(400).json({ message: "Board ID required" });
    }

    // Confirm board exists to update
    const board = await Board.findById(id).exec();

    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    // Update board
    board.name = name;
    board.columns = columns;

    const updatedBoard = await board.save();

    res.json(`'${updatedBoard.name}' updated`);
  } catch (error) {
    next(error);
  }
}

async function updateTask(req, res) {
  try {
    console.log(req.params);
    const { id, name, columns, taskId } = req.body;

    // // Confirm data
    // if (!id) {
    //     return res.status(400).json({ message: 'Board ID required' });
    // }

    // Confirm board exists to update
    const board = await Board.findOne({ _id : id ,
      'columns.tasks._id' :  taskId
    }, { 'columns.tasks.$': 1 }).exec();
    console.log(board);

    // if (!board) {
    //     return res.status(404).json({ message: 'Board not found' });
    // }

    // // Update board
    // board.name = name;
    // board.columns = columns;

    // const updatedBoard = await board.save();

    // res.json(`'${updatedBoard.name}' updated`);
  } catch (error) {
    console.log(error);
  }
}

// @desc Delete a board
// @route DELETE /api/boards/:id
// @access Private
async function deleteBoard(req, res) {
  try {
    const { id } = req.params;

    // Confirm data
    if (!id) {
      return res.status(400).json({ message: "Board ID required" });
    }

    // Confirm board exists to delete
    const board = await Board.findById(id).exec();

    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    const result = await board.deleteOne();

    const reply = `Board '${result.name}' with ID ${result._id} deleted`;

    res.json(reply);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createBoard,
  getBoard,
  getBoards,
  updateBoard,
  deleteBoard,
  updateTask,
};
