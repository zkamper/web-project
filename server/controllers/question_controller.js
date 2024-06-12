const Question = require('../models/question_model');
const handleResponse = require("../utils/handleResponse");

const getRandomQuestion = async (res, req) => {
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        try {
            const parsedBody = JSON.parse(body);
            const { answeredQuestions } = parsedBody;

            // validate the input
            if (!Array.isArray(answeredQuestions) || !answeredQuestions.every(Number.isInteger)) {
                throw new Error('Invalid input: answeredQuestions must be an array of integers');
            }
            try {

                // get the maximum id value
                const maxIdDoc = await Question.findOne().sort({ id: -1 }).limit(1);
                if (!maxIdDoc) {
                    handleResponse(res, 404, { error: "No questions found" });
                    return;
                }
                const maxId = maxIdDoc.id;

                // create an array of possible question IDs and remove the answered questions
                const allIds = Array.from({ length: maxId }, (_, i) => i + 1);

                const unansweredIds = allIds.filter(id => !answeredQuestions.includes(id));

                if (unansweredIds.length === 0) {
                    handleResponse(res, 404, { error: "No unanswered questions available" });
                    return;
                }

                // select a random ID from the unanswered IDs
                const randomIndex = Math.floor(Math.random() * unansweredIds.length);
                const randomId = unansweredIds[randomIndex];

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
        } catch (error) {
            console.error('Invalid input:', error);
            handleResponse(res, 400, { error: 'Invalid input: answeredQuestions must be an array of integers' });
        }
    });
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