const router = require('express').Router();
const {
    createBoard,
    getBoard,
    getBoards,
    updateBoard,
    deleteBoard,
    updateTask
} = require('../controllers/boardControllers');

router.get('/', getBoards)
    .post('/', createBoard)
    .get('/:id', getBoard)
    .put('/:id', updateBoard)
    .put('/:id/task', updateTask)
    .delete('/:id', deleteBoard);

module.exports = router;
