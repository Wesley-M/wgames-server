const connection = require('../database/connection')

module.exports = {
    async getScoresByGame(request, response) {
        const params = request.params;
        
        const scores = await connection('scores').select('*').where('gameId', params.gameId);

        return response.json(scores);
    },

    async create(request, response) {
        const { gameId, name, score } = request.body;
        
        let [id] = await connection('scores').insert({
            gameId,
            name,
            score
        });

        return response.json({ id });
    }
}