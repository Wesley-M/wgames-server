const connection = require('../database/connection')

module.exports = {
    async tagsFromGame(game) {
        let tags = await connection('tags').select('name').where('gameId', game.id);
        return tags.map(tag => tag.name);
    },

    async addTagForGame(gameId, tag) {
        return await connection('tags').insert({
            gameId: gameId,
            name: tag
        });
    }
}