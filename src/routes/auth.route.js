const express = require('express');
const router = express.Router();
//Controllers
const authController = require( '../controllers/auth.controller' );

//Routes
router.post( '/', authController.login );
router.post( '/forger_password', authController.forgetPass );
router.get( '/confirm/:token', authController.confirmAccount );

module.exports = router;
