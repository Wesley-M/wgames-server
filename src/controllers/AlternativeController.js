const connection = require('../database/connection')

module.exports = {
    async getAlternativesByQuestion(request, response) {
        const params = request.params;
        let alternatives;

        try {
            alternatives = await connection('alternatives').select('*').where('questionId', params.questionId);
        } catch(error) {
            return response.status(404).send("The question id format is unsupported!");
        }

        return response.json(alternatives);
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

                return response.json(id);

            } catch(error) {
                response.status(500).send(`Something went wrong, it was not possible to insert 
                                           the question. Make sure the alternative is unique to 
                                           this question. \n Err: ${error}`);
            }
        } else {
            response.status(500).send("Something is wrong with the isCorrect flag");
        }
    },

    async delete(request, response) {
        const { alternativeId } = request.params;

        try {
            await connection('alternatives').where('id', alternativeId).delete();
        } catch(error) {
            return response.status(500).send(`Something went wrong, it was not possible to delete the alternative. 
                                              \n Err: ${error}`)
        }

        return response.status(204).send();
    }
}

function assertBoolean(flag) {
    return (flag === true || flag === false);
}