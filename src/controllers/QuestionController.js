const connection = require('../database/connection')

module.exports = {
    async getQuestionsByGame(request, response) {
        const params = request.params;
        let questions;

        try {
            questions = await connection('questions').select('*').where('gameId', params.gameId);
        } catch(error) {
            return response.status(404).send("The game id format is unsupported!");
        }

        return response.json(questions);
    },

    async create(request, response) {
        const { gameId, text, subject, difficulty } = request.body;
        
        if (assertDifficulty(difficulty)) {
            let id;

            try {
                [id] = await connection('questions').insert({
                    gameId: gameId,
                    text: text,
                    subject: subject.toLowerCase(),
                    difficulty: difficulty
                }, ['id']);

                return response.json(id);

            } catch(error) {
                return response.status(500).send(`Something went wrong, it was not possible to insert 
                                                  the question. Make sure the text is unique to this game. \n Err: ${error}`);
            }
        } else {
            return response.status(500).send('difficulty value from question is not in range [1, 5]');
        }
    },

    async delete(request, response) {
        const { questionId } = request.params;

        try {
            await connection('questions').where('id', questionId).delete();
        } catch(error) {
            return response.status(500).send(`Something went wrong, it was not possible to delete the question. 
                                              \n Err: ${error}`)
        }

        return response.status(204).send();
    }
}

function assertDifficulty(difficulty) {
    return (Number.isInteger(difficulty) && difficulty >= 0 && difficulty <= 5);
}