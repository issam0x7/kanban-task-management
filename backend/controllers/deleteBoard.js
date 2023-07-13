function deleteBoard(req, res) {
    res.send(`The board with ${req.params.id} id was deleted`);
}

module.exports = deleteBoard;