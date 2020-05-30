const connection = require('../database/connection')

module.exports = {
    async getScoresByGame(request, response) {
        const params = request.params;
        
        const scores = await connection('scores').select('*').where('gameId', params.gameId);

        return response.json(scores);
    },

    async create(request, response) {
        const { gameId, name, score } = request.body;
        
        let id;

        try {
            [id] = await connection('scores').insert({
                gameId,
                name,
                score
            });
        } catch (error) {
            response.status(500);
            response.send(`Something went wrong, it was not possible to insert the score. \n Err: ${error}`);
        }

        return response.json({ id });
    }
}