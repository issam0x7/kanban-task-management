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
    res.send('Board updated!');
}

// @desc Delete a board
// @route DELETE /api/boards/:id
// @access Private
async function deleteBoard(req, res) {
    res.send(`The board with ${req.params.id} id was deleted`);
}

module.exports = {
    createBoard,
    getBoard,
    getBoards,
    updateBoard,
    deleteBoard
}