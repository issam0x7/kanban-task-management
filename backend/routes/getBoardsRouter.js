const router = require('express').Router();
const controller = require('../controllers/getBoardsController');

router.get('/', controller);

exports.router = router;
