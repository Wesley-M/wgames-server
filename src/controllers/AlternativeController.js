const connection = require('../database/connection')

module.exports = {
    async getAlternativesByQuestion(request, response) {
        const params = request.params;
        
        const scores = await connection('alternatives').select('*').where('questionId', params.questionId);

        return response.json(scores);
    },

    async create(request, response) {
        const { questionId, text, isCorrect } = request.body;
    
        let id;
        
        if (assertBoolean(isCorrect)) {
            try {
                [id] = await connection('alternatives').insert({
                    questionId,
                    text,
                    isCorrect
                });
            } catch(error) {
                response.status(500);
                response.send('It was not possible to insert the alternative, make sure the alternative is unique to this question.');
            }
        } else {
            response.status(500);
            response.send("Something is wrong with the isCorrect flag");
        }

        return response.json({ id });
    }
}

function assertBoolean(flag) {
    return (flag === true || flag === false);
}