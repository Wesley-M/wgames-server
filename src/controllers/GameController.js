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
            [id] = await connection('games').insert({ name, link });
            tags.forEach(async (tag) => await tagService.addTagForGame(id, tag));
            return response.json({ id });
        } catch(error) {
            response.status(500);
            response.send(`Something went wrong, it was not possible to insert
                           the game. Make sure the name and link are unique. \n Err: ${error}`);
        }
    }
}