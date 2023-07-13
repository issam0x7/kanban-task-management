const router = require('express').Router();
const controller = require('../controllers/getBoards');

router.get('/', controller);

module.exports = router;
