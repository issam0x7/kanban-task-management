const router = require('express').Router();
const controller = require('../controllers/deleteBoard');

router.delete('/:id', controller);

module.exports = router;