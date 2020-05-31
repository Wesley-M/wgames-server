const connection = require('../database/connection')

const scoreService = require('../services/ScoreService')

const SCORES_LIMIT = 100;

module.exports = {
    async getScoresByGame(request, response) {
        const params = request.params;

        let scores;

        try {
            scores = await scoreService.getScoresByGame(params.gameId);
        } catch(error) {
            return response.status(404).send(error);
        }

        return response.json(scores);
    },

    async create(request, response) {
        const { gameId, name, value } = request.body;
    
        let currentScores;

        try {
            currentScores = await scoreService.getScoresByGame(gameId);
        } catch(error) {
            return response.status(404).send(error);
        }

        // Checking whether there is a available slot to the score
        const availableSlot = (currentScores.length < SCORES_LIMIT);

        // Checking whether there is a smaller score value than that of the one to be created
        const hasSmallerScore = (currentScores.filter(score => score.value < value).length > 0);

        // If there is no slot available and there is a smaller score 
        // value than that of the one to be created, then the smallest score leaves and
        // the new one is created.

        if (hasSmallerScore && !availableSlot) {
            let smallestScore = currentScores.reduce((a, b) => (a.value < b.value) ? a : b);  
            await connection('scores').where('id', smallestScore.id).delete();
        }

        if (availableSlot || hasSmallerScore) {
            let id;
    
            try {
                [id] = await connection('scores').insert({
                    gameId,
                    name,
                    value
                }, ['id']);
    
                return response.json(id);
    
            } catch (error) {
                return response.status(500).send(`Something went wrong, it was not possible to 
                                                  insert the score. \n Err: ${error}`);
            }
        } else {
            return response.status(406).send(`It was not possible to save the score. It's lower than the 100th score value.`);
        }
    }
}