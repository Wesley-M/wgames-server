const express = require('express');

const GameController = require('./controllers/GameController');
const ScoreController = require('./controllers/ScoreController');
const QuestionController = require('./controllers/QuestionController');
const AlternativeController = require('./controllers/AlternativeController');

const routes = express.Router();

routes.get('/games', GameController.index);
routes.post('/games', GameController.create);

routes.get('/scores/:gameId', ScoreController.getScoresByGame);
routes.post('/scores', ScoreController.create);

routes.get('/questions/:gameId', QuestionController.getQuestionsByGame);
routes.post('/questions', QuestionController.create);

routes.get('/alternatives/:questionId', AlternativeController.getAlternativesByQuestion);
routes.post('/alternatives', AlternativeController.create);

module.exports = routes;