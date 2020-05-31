const connection = require('../database/connection')

module.exports = {
    async getScoresByGame(gameId) {
        let scores;

        try {
            scores = await connection('scores').select('*').where('gameId', gameId);
        } catch(error) {
            throw `The game id format is unsupported! \n Err: ${error}`;
        }

        // Sorting scores in descending order
        const orderedScores = scores.sort((sc1, sc2) => sc1.value - sc2.value).reverse();

        return orderedScores;
    },
}