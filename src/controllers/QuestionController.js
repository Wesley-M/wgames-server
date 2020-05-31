const connection = require('../database/connection')

module.exports = {
    async getQuestionsByGame(request, response) {
        const params = request.params;
        let scores;

        try {
            scores = await connection('questions').select('*').where('gameId', params.gameId);
        } catch(error) {
            response.status(404);
            response.send("The game id was not found!");
        }

        return response.json(scores);
    },

    async create(request, response) {
        const { gameId, text, subject, difficulty } = request.body;
        
        if (assertDifficulty(difficulty)) {
            let id;

            try {
                id = await connection('questions').insert({
                    gameId: gameId,
                    text: text,
                    subject: subject.toLowerCase(),
                    difficulty: difficulty
                }, ['id']);
            } catch(error) {
                return response.status(500).send(`Something went wrong, it was not possible to insert 
                                                  the question. Make sure the text is unique to this game. \n Err: ${error}`);
            }

            return response.status(200).send({id});
        } else {
            return response.status(500).send('difficulty value from question is not in range [1, 5]');
        }
    }
}

function assertDifficulty(difficulty) {
    return (Number.isInteger(difficulty) && difficulty >= 0 && difficulty <= 5);
}