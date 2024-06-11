const Question = require('../models/question_model');
const handleResponse = require("../utils/handleResponse");

const getRandomQuestion = async (res, request) => {
    try {
        // get the maximum id value
        const maxIdDoc = await Question.findOne().sort({ id: -1 }).limit(1);
        if (!maxIdDoc) {
            handleResponse(res, 404, { error: "No questions found" });
            return;
        }
        const maxId = maxIdDoc.id;

        // generate a random number between 1 and maxId, find that question
        const randomId = Math.floor(Math.random() * maxId) + 1;

        const question = await Question.findOne({ id: randomId });
        if (!question) {
            handleResponse(res, 404, { error: "Question not found" });
            return;
        }

        // remove the 'correct' field from the answers
        const response = {
            id: question.id,
            title: question.title,
            image: question.image,
            answers: question.answers.map(answer => ({
                key: answer.key,
                value: answer.value
            }))
        };

        handleResponse(res, 200, response);
    } catch (error) {
        console.error(error);
        handleResponse(res, 500, { error: "Error fetching random question" });
    }
};

const getQuestionById = async (res, request, id) => {
    try {
        const question = await Question.findOne({ id: parseInt(id) });
        if (!question) {
            handleResponse(res, 404, { error: "Question not found" });
            return;
        }

        // remove the 'correct' field from the answers
        const response = {
            id: question.id,
            title: question.title,
            image: question.image,
            answers: question.answers.map(answer => ({
                key: answer.key,
                value: answer.value
            }))
        };

        handleResponse(res, 200, response);
    } catch (error) {
        console.error(error);
        handleResponse(res, 500, { error: "Error fetching question by ID" });
    }
};

const checkQuestionAnswers = async (res, id, userAnswers) => {
    try {
        const question = await Question.findOne({ id: parseInt(id) });
        if (!question) {
            handleResponse(res, 404, { error: "Question not found" });
            return;
        }

        const isCorrect = userAnswers.every(answer => {
            const correctAnswer = question.answers.find(a => a.key === answer);
            return correctAnswer && correctAnswer.correct === 1;
        });

        handleResponse(res, 200, { isCorrect });
    } catch (error) {
        console.error(error);
        handleResponse(res, 500, { error: "Error checking answers" });
    }
};

module.exports = {
    getRandomQuestion,
    getQuestionById,
    checkQuestionAnswers
};