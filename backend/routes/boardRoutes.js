const router = require('express').Router();
const {
    createBoard,
    getBoard,
    getBoards,
    updateBoard,
    deleteBoard
} = require('../controllers/boardControllers');

router.get('/', getBoards)
    .post('/', createBoard)
    .get('/:id', getBoard)
    .put('/:id', updateBoard)
    .delete('/:id', deleteBoard);

module.exports = router;
