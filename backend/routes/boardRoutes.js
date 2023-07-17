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
    .patch('/:id', updateBoard)
    .delete('/:id', deleteBoard);

module.exports = router;
