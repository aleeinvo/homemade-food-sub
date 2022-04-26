var express = require('express');
const { homeController, authController } = require('../controllers');
var router = express.Router();

/* GET home page. */
router.get('/', homeController.index);

router.post('/register', authController.register);

module.exports = router;
