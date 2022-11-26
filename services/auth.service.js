const db = require('../db')
const jwt = require('jsonwebtoken')
const tokenService = require('../services/token.service')

const key = process.env.JWT_KEY

class AuthService {
    async checkCookie(req, res) {
        let access = req.signedCookies['accessToken']
        let refresh = req.signedCookies['refreshToken']

        if (refresh === undefined) {
            return {status: false}
        }

        try {
            const accessPayload = jwt.verify(access, key)
            return {status: true, id: accessPayload.sub}
        } catch (err) {
            try {
                const payload = jwt.verify(refresh, key)
                const querySelect = `SELECT * FROM users WHERE user_id = '${payload.sub}' AND user_refresh = '${refresh}'`
                const user = await db.query(querySelect)

                if (user.rowCount !== 1) {
                    return {status: false}
                }

                access = tokenService.generateAccessToken(payload.sub)
                refresh = tokenService.generateRefreshToken(payload.sub)

                const queryUpdate = `UPDATE users SET user_refresh = '${refresh}' WHERE user_id = '${payload.sub}'`
                await db.query(queryUpdate)

                tokenService.setCookies(access, refresh, res)
                
                return {status: true, id: payload.sub}
            } catch(e) {
                return {status: false}
            }
        }
    }

    async getUser(req, res) {
        const cookie = await this.checkCookie(req, res)
        if (!cookie.status) {
            return null
        }

        const query = `SELECT * FROM users WHERE user_id = '${cookie.id}'`
        const user = await (await db.query(query)).rows[0]

        return user
    }
}

module.exports = new AuthService()