const { default: mongoose } = require("mongoose");
const Board = require("../models/boardModel");
const Task = require("../models/taskModel");

// @desc Create a board
// @route POST /api/boards
// @access Private
async function createBoard(req, res) {
   try {

      const name = req.body.name;
      const columns = req.body.columns;

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
      const board = await Board.aggregate([
         { $match: { _id: new mongoose.Types.ObjectId(boardId) } },
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

      if (!board) {
         return res.status(404).json({ message: "Board not found" });
      }

      res.json({ board: board[0] });
   } catch (error) {
      // next(error);
      console.log(error);
   }
}

// @desc Get all boards
// @route GET /api/boards
// @access Private
async function getBoards(req, res) {
   try {
      // Fetch all boards from the database
      const boards = await Board.aggregate([
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
      ]);
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

async function updateBoardCloumns(req, res) {
   try {
      const { id } = req.params;

      const { name, columns } = req.body;

      // Confirm data
      if (!id) {
         return res.status(400).json({ message: "Board ID required" });
      }

      // Confirm board exists to update
      const board = await Board.findById(id).exec();

      if (!board) {
         return res.status(404).json({ message: "Board not found" });
      }

      board.name = name;

      const colIds = Array.from(board.columns.map((col) => col._id.toString()));

      columns.forEach((col) => {
         const isExist = colIds.includes(col._id);
         if (isExist) {
            board.columns.forEach((column) => {
               if (column._id.toString() === col?._id) {
                  column.name = col.name;
                  return;
               }
            });
         } else {
            board.columns.push(col);
         }
      });

      const updatedBoard = await board.save();

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

      const removeReslut = await Task.deleteMany(
        { "columnId" : _id}
      ).exec();

      // if (!board) {
      //    return res.status(404).json({ message: "Board not found" });
      // }

      // const result = await board.deleteOne();

      // const reply = `Board '${result.name}' with ID ${result._id} deleted`;

      res.json({result, removeReslut});
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
   deleteColumn
};
