const Board = require('../models/boardModel');

// @desc Create a board
// @route POST /api/boards
// @access Private
async function createBoard(req, res) {
    try {
        const { name, columns } = req.body;

        // Confirm data
        if (!name) {
            return res.status(400).json({ message: 'Board name required' });
        } else if (!columns) {
            return res.status(400).json({ message: 'Board columns required' });
        } else if (!Array.isArray(columns)) {
            return res.status(400).json({ message: 'Board columns must be an array' });
        }

        const newBoard = await Board.create({name, columns});

        return res.status(201).json({ message: 'Board created', board: newBoard });
    } catch (error) {
        console.error('Error creating the board:', error.message);
        res.status(500).json({ message: 'Server Error' });
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
            return res.status(404).json({ message: 'Board not found' });
        }

        res.json({ board });
    } catch (error) {
        console.error('Error getting the board:', error.message);
        res.status(500).json({ message: 'Server Error' });
    }
}

// @desc Get all boards
// @route GET /api/boards
// @access Private
async function getBoards(req, res) {
    try {
        // Fetch all boards from the database
        const boards = await Board.find();

        res.json(boards);
    } catch (error) {
        console.error('Error getting boards:', error);
        res.status(500).json({ message: 'Server Error' });
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
            return res.status(400).json({ message: 'Board ID required' });
        }

        // Confirm board exists to update
        const board = await Board.findById(id).exec();

        if (!board) {
            return res.status(404).json({ message: 'Board not found' });
        }

        // Update board
        board.name = name;
        board.columns = columns;

        const updatedBoard = await board.save();

        res.json(`'${updatedBoard.name}' updated`);
    } catch (error) {
        console.error('Error updating the board:', error);
        res.status(500).json({ message: 'Server Error' });
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
            return res.status(400).json({ message: 'Board ID required' });
        }

        // Confirm board exists to delete
        const board = await Board.findById(id).exec();

        if (!board) {
            return res.status(404).json({ message: 'Board not found' });
        }

        const result = await board.deleteOne();

        const reply = `Board '${result.name}' with ID ${result._id} deleted`;

        res.json(reply);
    } catch (error) {
        console.error('Error deleting the board:', error);
        res.status(500).json({ message: 'Server Error' });
    }
}

module.exports = {
    createBoard,
    getBoard,
    getBoards,
    updateBoard,
    deleteBoard
};
