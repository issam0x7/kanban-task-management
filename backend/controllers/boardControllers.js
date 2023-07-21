const Board = require('../models/boardModel');

// @desc Create a board
// @route POST /api/boards
// @access Private
async function createBoard(req, res) {
    const {name, columns} = req.body;
    const newBoard = await Board.create({name, columns});

    if(newBoard) { // created
        return res.status(201).json({message: 'Board created', board: newBoard});
    }
    // not created
    res.status(400).json({message: 'Board not created'});
}

// @desc Get a board
// @route GET /api/boards/:id
// @access Private
async function getBoard(req, res) {
    res.send(`The board with ${req.params.id} id was sent`);
}

// @desc Get all boards
// @route GET /api/boards
// @access Private
async function getBoards(req, res) {
    res.send('Boards sent');
}

// @desc Update a board
// @route PATCH /api/boards/:id
// @access Private
async function updateBoard(req, res) {
    const { id, name, columns } = req.body;

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Board ID required' });
    }    

    // Confirm board exists to update
    const board = await Board.findById(id).exec();

    if (!board) {
        return res.status(400).json({ message: 'Board not found' });
    }

    // Update board
    board.name = name;
    board.columns = columns;

    const updatedBoard = await board.save()

    res.json(`'${updatedBoard.name}' updated`)
}

// @desc Delete a board
// @route DELETE /api/boards/:id
// @access Private
async function deleteBoard(req, res) {
    const { id } = req.body

    // Confirm data
    if (!id) {
        return res.status(400).json({ message: 'Board ID required' })
    }

    // Confirm board exists to delete 
    const board = await Board.findById(id).exec()

    if (!board) {
        return res.status(400).json({ message: 'Board not found' })
    }

    const result = await board.deleteOne()

    const reply = `Board '${result.name}' with ID ${result._id} deleted`

    res.json(reply)
}

module.exports = {
    createBoard,
    getBoard,
    getBoards,
    updateBoard,
    deleteBoard
}