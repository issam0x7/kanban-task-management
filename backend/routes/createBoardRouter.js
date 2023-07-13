const router = require('express').Router();
const controller = require('../controllers/createBoard');

router.post('/', controller);

module.exports = router;