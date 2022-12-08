const Router = require("express").Router
const router = new Router()
const frontendController = require("../controllers/frontend.controller")

router.get('/', frontendController.root)
router.get('/order', frontendController.order)
router.get('/comment', frontendController.comment)
router.get('/login', frontendController.login)
router.get('/register', frontendController.signUp)
router.get('/profile', frontendController.profile)

module.exports = router