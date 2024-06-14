const Question = require('../models/question_model');
const User = require('../models/user_model');
const handleResponse = require("../utils/handleResponse");
const {handleToken} = require("../utils/tokenUtils");

const getRandomQuestion = async (res, req) => {
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        try {
            const authorization = req.headers.authorization;
            let payload;
            if(authorization) {
                payload = await handleToken(res, req);
            }
            if(authorization && !payload) {
                return;
            }
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

                let unansweredIds;
                if(authorization) {
                    const user = await User.findOne({username: payload.username});
                    unansweredIds = allIds.filter(id => !user.questionsAnswered.includes(id));
                } else {
                    unansweredIds = allIds.filter(id => !answeredQuestions.includes(id));
                }

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

const checkQuestionAnswers = async (res, req, id) => {
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        //try-catch since the body might now be always a valid int
        try {
            let authorization = req.headers.authorization;
            let payload;
            if(authorization) {
                payload = await handleToken(res, req);
            }
            if(authorization && !payload) {
                return;
            }
            const parsedBody = JSON.parse(body);
            if (!Array.isArray(parsedBody.answers) || !parsedBody.answers.every(Number.isInteger)) {
                throw new Error('Invalid input');
            }
            const { answers } = parsedBody;
            try {
                const question = await Question.findOne({ id: parseInt(id) });
                if (!question) {
                    handleResponse(res, 404, { error: "Question not found" });
                    return;
                }
                const correctAnswers = question.answers.filter(a => a.correct).map(a => a.key);
                let isCorrect = answers.length === correctAnswers.length && answers.every(a => correctAnswers.includes(a));
                if(isCorrect && authorization) {
                    await User.updateOne({username: payload.username},{ $push: {questionsAnswered: question.id} })
                }
                handleResponse(res, 200, { isCorrect, answers: question.answers.filter(a => a.correct).map(a => a.key) });
            } catch (error) {
                console.error(error);
                handleResponse(res, 500, { error: "Error checking answers" });
            }
        } catch (error) {
            console.error('Invalid input:', error);
            handleResponse(res, 400, { error: 'Invalid input: answers must be an array of integers' });
        }
    });
};

module.exports = {
    getRandomQuestion,
    getQuestionById,
    checkQuestionAnswers
};