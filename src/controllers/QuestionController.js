const connection = require('../database/connection')

module.exports = {
    async getQuestionsByGame(request, response) {
        const params = request.params;
        let scores;

        try {
            scores = await connection('questions').select('*').where('gameId', params.gameId);
        } catch(error) {
            response.status(404);
            response.send("gameId was not found!");
        }

        return response.json(scores);
    },

    async create(request, response) {
        const { gameId, text, subject, difficulty } = request.body;
        
        let id;
        
        if (assertDifficulty(difficulty)) {
            try {
                [id] = await connection('questions').insert({
                    gameId: gameId,
                    text: text,
                    subject: subject.toLowerCase(),
                    difficulty: difficulty
                });
            } catch(error) {
                response.status(500);
                response.send('It was not possible to insert the question, make sure the text is unique to this game.');
            }
        } else {
            response.status(500);
            response.send('difficulty value from question is not in range [1, 5]');
        }

        return response.json({ id });
    }
}

function assertDifficulty(difficulty) {
    return (Number.isInteger(difficulty) && difficulty >= 0 && difficulty <= 5);
}