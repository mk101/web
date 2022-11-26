const jwt = require('jsonwebtoken')
const ms = require('ms')

const key = process.env.JWT_KEY
const accessLive = process.env.ACCESS_TOKEN_EXPIRE_TIME
const refreshLive = process.env.REFRESH_TOKEN_EXPIRE_TIME

class TokenService {
    generateAccessToken(subject) {
        return jwt.sign({
            sub: subject
        }, key, {
            expiresIn: accessLive
        })
    }

    generateRefreshToken(subject) {
        return jwt.sign({
            sub: subject
        }, key, {
            expiresIn: refreshLive
        })
    }

    setCookies(access, refresh, res) {
        res.cookie('accessToken', access, {
            signed: true,
            maxAge: ms(accessLive),
            httpOnly: true
        })
    
        res.cookie('refreshToken', refresh, {
            signed: true,
            maxAge: ms(refreshLive),
            httpOnly: true
        })
    }

    removeCookies(res) {
        res.clearCookie('accessToken', {
            signed: true,
            httpOnly: true

        })
        res.clearCookie('refreshToken', {
            signed: true,
            httpOnly: true

        })
    }
}

module.exports = new TokenService()