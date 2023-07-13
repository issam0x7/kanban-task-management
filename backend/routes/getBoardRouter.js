const router = require('express').Router();
const controller = require('../controllers/getBoardController');

router.get('/:id', controller);

exports.router = router;