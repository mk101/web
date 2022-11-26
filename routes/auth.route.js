const Router = require("express");
const router = new Router()
const authController = require('../controllers/auth.controller')

router.post('/login', authController.login)
router.post('/register', authController.register)
router.post('/logout', authController.logout)

module.exports = router