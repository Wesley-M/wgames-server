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

        connection('games').insert({ name, link }).then(res => {
            try {  
                tags.forEach(async (tag) => { 
                    await tagService.addTagForGame(id, tag) 
                });
            } catch(error) {
                return response.status(500).send(`Something went wrong, it was not possible to insert
                                                  the tags. \n Err: ${error}`);
            }

            return response.json({ id });
        }).catch(error => {
            return response.json(error);
        })
    }
}