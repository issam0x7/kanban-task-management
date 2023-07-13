const router = require('express').Router();
const controller = require('../controllers/updateBoardController');

router.put('/:id', controller);

exports.router = router;