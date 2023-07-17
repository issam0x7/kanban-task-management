function createBoard(req, res) {
    res.send(`The board with ${req.params.id} id was created`);
}

function getBoard(req, res) {
    res.send(`The board with ${req.params.id} id was sent`);
}

function getBoards(req, res) {
    res.send('Boards sent');
}

function updateBoard(req, res) {
    res.send('Board created!');
}

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