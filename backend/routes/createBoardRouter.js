const router = require('express').Router();
const controller = require('../controllers/createBoardController');

router.post('/', controller);

exports.router = router;