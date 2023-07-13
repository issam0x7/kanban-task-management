function createBoard(req, res) {
    res.send(`The board with ${req.params.id} id was created`);
}

module.exports = createBoard;