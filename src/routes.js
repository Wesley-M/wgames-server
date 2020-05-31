const express = require('express');

const GameController = require('./controllers/GameController');
const ScoreController = require('./controllers/ScoreController');
const QuestionController = require('./controllers/QuestionController');
const AlternativeController = require('./controllers/AlternativeController');

const routes = express.Router();

// Get all the games in the DB
routes.get('/games', GameController.index);
// Create a game
routes.post('/games', GameController.create);
// Delete a game based on a ID
routes.delete('/games/:gameId', GameController.delete);

// Get all scores from the game with id == :gameId
routes.get('/scores/:gameId', ScoreController.getScoresByGame);
// Add a score to a game
routes.post('/scores', ScoreController.create);

// Get all question from game with id == :gameId
routes.get('/questions/:gameId', QuestionController.getQuestionsByGame);
// Add a question to a game
routes.post('/questions', QuestionController.create);
// Delete a question
routes.delete('/questions/:questionId', QuestionController.delete);

// Get all alternatives from a question
routes.get('/questions/:questionId/alternatives', AlternativeController.getAlternativesByQuestion);
// Add a alternative to a question
routes.post('/questions/alternatives', AlternativeController.create);
// Delete a alternative from a question
routes.delete('/questions/alternatives/:alternativeId', AlternativeController.delete);

module.exports = routes;