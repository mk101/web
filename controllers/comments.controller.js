const db = require('../db')

class CommentsController {
    async addComment(req, res) {
        if ( !('name' in req.body) ) {
            res.status(400)
            res.send(JSON.stringify({
                message: 'Request must contains name field'
            }))
        }

        if ( !('comment' in req.body) ) {
            res.status(400)
            res.send(JSON.stringify({
                message: 'Request must contains comment field'
            }))
        }

        const name = req.body.name
        const comment = req.body.comment

        const query = 'INSERT INTO comments(comment_un, comment_value) VALUES ($1, $2)'
        try {
            const queryResult = await db.query(query, [name, comment])
            res.json(queryResult)
        } catch(e) {
            console.error(e);
            res.status(500)
            res.send(JSON.stringify({
                message: 'Faild to add comment into bd'
            }))
        }
    }

    async getAll(req, res) {
        const query = 'SELECT * FROM comments'
        const result = await db.query(query)

        res.json(result.rows)
    }
}

module.exports = new CommentsController()