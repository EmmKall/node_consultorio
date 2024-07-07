const express = require('express');
const router = express.Router();
//Controllers
const userController = require( '../controllers/user.controller' );


//Routes
router.get( '/', userController.getAll );
router.get( '/:id', userController.findById );
router.post( '/', userController.store );

module.exports = router;

