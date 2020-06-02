const moment = require('moment');
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
        const orderedScores = scores.sort((scoreA, scoreB) => {
            if (scoreA.value != scoreB.value) {
                return scoreB.value - scoreA.value;
            } else {
                let timestampA = moment(scoreA.created_at).valueOf();
                let timestampB = moment(scoreB.created_at).valueOf();
                return timestampA - timestampB;
            }
        });

        return orderedScores;
    },
}