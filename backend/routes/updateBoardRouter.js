const router = require('express').Router();
const controller = require('../controllers/updateBoard');

router.put('/:id', controller);

module.exports = router;