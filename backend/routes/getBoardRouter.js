const router = require('express').Router();
const controller = require('../controllers/getBoard');

router.get('/:id', controller);

module.exports = router;