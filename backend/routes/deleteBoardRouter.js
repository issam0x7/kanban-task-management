const router = require('express').Router();
const controller = require('../controllers/deleteBoardController');

router.delete('/:id', controller);

exports.router = router;