const connection = require('../database/connection')

const tagService = require('../services/TagService')

module.exports = {
    async index(request, response) {
        const games = await connection('games').select('*');

        for (game of games) {
            let tags = await tagService.tagsFromGame(game);
            game.tags = tags;
        }

        return response.json(games);
    },

    async create(request, response) {
        const { name, link, tags } = request.body;

        let id;

        try {
            [id] = await connection('games').insert({ name, link }, ['id']);

            try {  
                tags.forEach(async (tag) => await tagService.addTagForGame(id, tag));
            } catch(error) {
                return response.status(500).send(`Something went wrong, it was not possible to insert
                                                  the tags. \n Err: ${error}`);
            }

            return response.json(id);
            
        } catch (error) {
            return response.status(500).send(`Something went wrong, it was not possible to insert
                                              the game. Make sure link and name are unique. \n Err: ${error}`);
        }
    },

    async delete(request, response) {
        const { gameId } = request.params;

        try {
            await connection('games').where('id', gameId).delete();
        } catch(error) {
            return response.status(500).send(`Something went wrong, it was not possible to delete the game. 
                                              \n Err: ${error}`)
        }

        return response.status(204).send();
    }
}