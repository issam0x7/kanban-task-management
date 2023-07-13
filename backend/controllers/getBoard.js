function getBoard(req, res) {
    res.send(`The board with ${req.params.id} id was sent`);
}

module.exports = getBoard;