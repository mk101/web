require('dotenv').config()
const cokieSecret = process.env.COOKIE_SECRET

const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()

const frontentRouter = require('./routes/frontend.route')
const commentsRouter = require('./routes/comments.route')
const authRouter     = require('./routes/auth.route')
const userRouter     = require('./routes/user.route')

app.use(express.json())
app.use(cookieParser(cokieSecret))

app.use(express.static(__dirname + '/public'))
app.set('view engine', 'ejs')

app.use('/', frontentRouter)
app.use('/api/v1/comments', commentsRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/user', userRouter)

app.listen(80)