const express = require('express');
const router = express.Router();
//Controllers
const authController = require( '../controllers/auth.controller' );

//Routes
router.post( '/', authController.login );

module.exports = router;
