const Router = require("express");
const router = new Router()
const userController = require('../controllers/user.controller')

router.post('/change', userController.change)

module.exports = router