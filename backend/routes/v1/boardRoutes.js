const router = require("express").Router();
const {
  createBoard,
  getBoard,
  getBoards,
  updateBoard,
  deleteBoard,
  updateBoardCloumns,
  deleteColumn,
} = require("../../controllers/boardControllers");
const validate = require("../../middleware/validate");
const { boardValidation } = require("../../validation");

router
  .get("/", getBoards)
  .post("/", validate(boardValidation.createBoard), createBoard)
  .get("/:id", validate(boardValidation.getBoard), getBoard)
  .put("/:id", validate(boardValidation.updateBoard), updateBoard)
  .put(
    "/:id/columns",
    validate(boardValidation.updateBoardCloumns),
    updateBoardCloumns
  )
  .delete("/:id", validate(boardValidation.removeBoard), deleteBoard)
  .delete("/:id/columns", validate(boardValidation.removeColumn), deleteColumn);

module.exports = router;
