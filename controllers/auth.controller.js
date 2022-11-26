const bcrypt = require('bcryptjs')
const {v4: uuidv4} = require('uuid')

const db = require('../db')
const tokenService = require('../services/token.service')

function validateField(field, message, req, res) {
    if (!(field in req.body)) {
        res.status(400)
        res.json({
            message: message
        })

        return false
    }

    return true
}

class AuthController {
    async login(req, res) { 
        if (!validateField('login', 'login expected', req, res)) {
            return
        }
        if (!validateField('password', 'password expected', req, res)) {
            return
        }

        const login = req.body.login
        const password = req.body.password

        const querySelect = 'SELECT * FROM users WHERE user_login = $1'

        const userResponse = await db.query(querySelect, [login])

        if (userResponse.rowCount === 0) {
            res.status(400)
            res.json({
                message: 'Login or password is incorrect'
            })
            return
        }

        const user = userResponse.rows[0]

        if (!bcrypt.compareSync(password, user.user_password)) {
            res.status(400)
            res.json({
                message: 'Login or password is incorrect'
            })
            return
        }

        const refresh = tokenService.generateRefreshToken(user.user_id)
        const queryUpdate = `UPDATE users SET user_refresh = '${refresh}' WHERE user_id = '${user.user_id}'`
        await db.query(queryUpdate)

        const access = tokenService.generateAccessToken(user.user_id)

        tokenService.setCookies(access, refresh, res)

        res.json({
            id: user.user_id,
            accessToken: access,
            refreshToken: refresh
        })
    }
    
    async register(req, res) {
        if (!validateField('login', 'login expected', req, res)) {
            return
        }
        if (!validateField('password', 'password expected', req, res)) {
            return
        }
        if (!validateField('address', 'address expected', req, res)) {
            return
        }
        if (!validateField('phone', 'phone expected', req, res)) {
            return
        }

        const login = req.body.login
        const password = req.body.password
        const address = req.body.address
        const phone = req.body.phone

        const querySelect = 'SELECT * FROM users WHERE user_login = $1'
        const findUserQuery = await db.query(querySelect, [login])
        if (findUserQuery.rowCount !== 0) {
            res.status(400)
            res.json({
                message: 'Login is already taken'
            })
            return
        }

        const id = uuidv4()
        const passCrypt = bcrypt.hashSync(password, 10)
        const access = tokenService.generateAccessToken(id)
        const refresh = tokenService.generateRefreshToken(id)

        const queryInsert = 'INSERT INTO ' +
            'users ' + 
            'VALUES ($1, $2, $3, $4, $5, $6)'

        await db.query(queryInsert, [id, login, passCrypt, address, phone, refresh])

        tokenService.setCookies(access, refresh, res)

        res.json({
            id: id,
            accessToken: access,
            refreshToken: refresh
        })
    }

    async logout(req, res) {
        tokenService.removeCookies(res)
        res.sendStatus(200)
    }
}

module.exports = new AuthController()