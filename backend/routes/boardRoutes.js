const router = require('express').Router();
const {
    createBoard,
    getBoard,
    getBoards,
    updateBoard,
    deleteBoard,
    updateBoardCloumns,
    deleteColumn,
} = require('../controllers/boardControllers');

router.get('/', getBoards)
    .post('/', createBoard)
    .get('/:id', getBoard)
    .put('/:id', updateBoard)
    .put('/:id/columns', updateBoardCloumns)
    .delete('/:id', deleteBoard)
    .delete('/:id/columns', deleteColumn)

module.exports = router;
