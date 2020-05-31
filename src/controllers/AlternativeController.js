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
                }, ['id']);

                return response.json({ id });
                
            } catch(error) {
                response.status(500).send(`Something went wrong, it was not possible to insert 
                                           the question. Make sure the alternative is unique to 
                                           this question. \n Err: ${error}`);
            }
        } else {
            response.status(500).send("Something is wrong with the isCorrect flag");
        }
    }
}

function assertBoolean(flag) {
    return (flag === true || flag === false);
}