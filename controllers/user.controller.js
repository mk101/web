const db = require('../db')
const authService = require('../services/auth.service')

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

class UserController {
    async change(req, res) {
        if (!validateField('address', 'no address in request', req, res)) {
            return
        }

        if (!validateField('phone', 'no phone in request', req, res)) {
            return
        }

        const user = await authService.getUser(req, res)
        if (user == null) {
            res.sendStatus(401)
            return
        }

        const query = `UPDATE users SET user_address = '${req.body.address}', user_phone = '${req.body.phone}' WHERE user_id = '${user.user_id}'`
        await db.query(query)

        res.sendStatus(200)
    }
}

module.exports = new UserController()