const db = require('../db')
const authService = require('../services/auth.service')

async function getData() {
    const pizzasQuery = 'SELECT ' + 
        'p.pizza_id, p.pizza_name, p.pizza_desc, p.pizza_url, p.pizza_price, i.ingredients_id, i.cheese, i.meat, i.cucumbers, i.tomatoes, i.pineapple, i.mushrooms ' + 
        'FROM pizzas p JOIN ingredients i ON p.pizza_id = i.pizza_id'
    const ingQuery = 'SELECT * FROM ingredients_price'

    const pizzasRes = await db.query(pizzasQuery)
    const pizzas = pizzasRes.rows.map((p) => ({
        id: p.pizza_id,
        name: p.pizza_name,
        desc: p.pizza_desc,
        url: p.pizza_url,
        price: Number(p.pizza_price),
        ingredients: {
            id: p.ingredients_id,
            cheese: p.cheese,
            meat: p.meat,
            cucumbers: p.cucumbers,
            tomatoes: p.tomatoes,
            pineapple: p.pineapple,
            mushrooms: p.mushrooms
        }
    }))

    const ingRes = await db.query(ingQuery)
    const prices = ingRes.rows.map((p) => ({
        name: p.i_name,
        price: Number(p.i_price)
    }))

    return {
        pizzas: pizzas,
        prices: prices
    }
}

class FrontendController {
    async root(req, res) {
        const data = await getData()
        const user = await authService.getUser(req, res)

        res.render('index', {
            pizzas: data.pizzas,
            user: user
        })
    }

    async order(req, res) {
        const data = await getData()
        const user = await authService.getUser(req, res)

        const ids = req.query.id ? req.query.id.split(',').map(i => Number(i)) : []
        const pzs = data.pizzas.filter(p => ids.includes(p.id))

        res.render('order', {
            ids: ids,
            pizzas: pzs,
            prices: data.prices,
            user: user
        })
    }

    async comment(req, res) {
        const user = await authService.getUser(req, res)
        res.render('comment', {
            user: user
        })
    }

    async login(req, res) {
        if ((await authService.checkCookie(req, res)).status) {
            res.redirect('/')
            return
        }

        res.render('login')
    }

    async signUp(req, res) {
        if ((await authService.checkCookie(req, res)).status) {
            res.redirect('/')
            return
        }

        res.render('signup')
    }

    async profile(req, res) {
        const user = await authService.getUser(req, res)

        if (user == null) {
            res.redirect('/login')
            return
        }

        res.render('profile', {
            user: user
        })
    }
}

module.exports = new FrontendController()