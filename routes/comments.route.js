const Router = require("express").Router
const router = new Router()
const commentsController = require('../controllers/comments.controller')

router.post('/add', commentsController.addComment)
router.get('/all', commentsController.getAll)

module.exports = router