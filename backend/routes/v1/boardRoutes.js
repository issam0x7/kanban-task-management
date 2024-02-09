const router = require('express').Router();
const {
    createBoard,
    getBoard,
    getBoards,
    updateBoard,
    deleteBoard,
    updateBoardCloumns,
    deleteColumn,
} = require('../../controllers/boardControllers');
const validate = require('../../middleware/validate');
const { boardValidation } = require('../../utils/validation');

router.get('/' ,getBoards)
    .post('/', validate(boardValidation.createBoard), createBoard)
    .get('/:id', getBoard)
    .put('/:id', updateBoard)
    .put('/:id/columns', updateBoardCloumns)
    .delete('/:id', deleteBoard)
    .delete('/:id/columns', deleteColumn)

module.exports = router;
