const connection = require('../database/connection')

module.exports = {
    async getScoresByGame(request, response) {
        const params = request.params;
        let scores;

        try {
            scores = await connection('scores').select('*').where('gameId', params.gameId);
        } catch(error) {
            return response.status(404).send("The game id format is unsupported!");
        }

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
            }, ['id']);

            return response.json(id);

        } catch (error) {
            return response.status(500).send(`Something went wrong, it was not possible to 
                                              insert the score. \n Err: ${error}`);
        }
    }
}