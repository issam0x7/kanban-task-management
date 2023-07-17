// @desc Create a board
// @route POST /api/boards
// @access Private
function createBoard(req, res) {
    res.send(`The board with ${req.params.id} id was created`);
}

// @desc Get a board
// @route GET /api/boards/:id
// @access Private
function getBoard(req, res) {
    res.send(`The board with ${req.params.id} id was sent`);
}

// @desc Get all boards
// @route GET /api/boards
// @access Private
function getBoards(req, res) {
    res.send('Boards sent');
}

// @desc Update a board
// @route PATCH /api/boards/:id
// @access Private
function updateBoard(req, res) {
    res.send('Board created!');
}

// @desc Delete a board
// @route DELETE /api/boards/:id
// @access Private
function deleteBoard(req, res) {
    res.send(`The board with ${req.params.id} id was deleted`);
}

module.exports = {
    createBoard,
    getBoard,
    getBoards,
    updateBoard,
    deleteBoard
}