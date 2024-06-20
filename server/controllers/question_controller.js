const mongoose = require('mongoose');
const Question = require('../models/question_model');
const User = require('../models/user_model');
const QuizToken = require('../models/quiz_model');
const handleResponse = require("../utils/handleResponse");
const {handleToken, generateQuizToken} = require("../utils/tokenUtils");
const handleResponseWithCookie = require("../utils/handleResponseWithCookie");
const {parseCookie} = require("../utils/parseCookie");

const questionCount = async () => {
    return Question.countDocuments();
}

const deleteQuestionById = async (res, req, id) => {
    const payload = await handleToken(res, req);

    if (!payload || !payload.isAdmin) {
        handleResponse(res, 401, { error: 'Unauthorized' });
        return;
    }

    try {
        // check question existance
        const question = await Question.findOne({ id: id });
        if (!question) {
            handleResponse(res, 404, { error: 'Question not found' });
            return;
        }

        // delete the question by 'id'
        await Question.findOneAndDelete({ id: id });

        handleResponse(res, 200, { success: 'Question deleted successfully' });
    } catch (error) {
        console.error('Error deleting question:', error);
        handleResponse(res, 500, { error: 'Failed to delete question' });
    }
};

const addNewQuestion = async (res, req) => {
    const payload = await handleToken(res, req);

    if (!payload || !payload.isAdmin) {
        handleResponse(res, 401, { error: 'Unauthorized' });
        return;
    }

    let body = '';

    req.on('data', chunk => {
        body += chunk.toString(); // buffer to string
    });

    req.on('end', async () => {
        try {
            const { title, image, answers } = JSON.parse(body);

            // request body validation
            if (!title || !Array.isArray(answers) || answers.length !== 3) {
                handleResponse(res, 400, { error: 'Invalid request body format' });
                return;
            }

            for (const answer of answers) {
                if (typeof answer.key !== 'number' || typeof answer.value !== 'string' || !Number.isInteger(answer.correct) || !(answer.correct === 0 || answer.correct === 1)) {
                    handleResponse(res, 400, { error: 'Invalid answer object format' });
                    return;
                }
            }

            // get the maximum id in existing questions and increment it by 1
            const maxIdQuestion = await Question.findOne().sort({ id: -1 }).limit(1);
            let nextId = 1;

            if (maxIdQuestion) {
                nextId = maxIdQuestion.id + 1;
            }

            const newQuestion = new Question({
                id: nextId,
                title,
                image,
                answers
            });

            // attempt to save the question
            const savedQuestion = await newQuestion.save();
            if (!savedQuestion){
                console.error('Error saving question:', error);
                handleResponse(res, 500, { error: 'Failed to save question' });
            } else {
                handleResponse(res, 201, { success: 'Question saved successfully', id: nextId });
            }

        } catch (error) {
            console.error('Error saving question:', error);
            handleResponse(res, 500, { error: 'Failed to save question' });
        }
    });
};

const getRandomQuestion = async (res, req) => {
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        try {
            const authorization = req.headers.authorization;
            let payload;
            if (authorization) {
                payload = await handleToken(res, req);
            }
            if (authorization && !payload) {
                return;
            }
            const parsedBody = JSON.parse(body);
            const {answeredQuestions} = parsedBody;

            // validate the input
            if (!Array.isArray(answeredQuestions) || !answeredQuestions.every(Number.isInteger)) {
                throw new Error('Invalid input: answeredQuestions must be an array of integers');
            }
            try {

                // get the maximum id value
                const maxIdDoc = await Question.findOne().sort({id: -1}).limit(1);
                if (!maxIdDoc) {
                    handleResponse(res, 404, {error: "No questions found"});
                    return;
                }
                const maxId = maxIdDoc.id;

                // create an array of possible question IDs and remove the answered questions
                const allIds = Array.from({length: maxId}, (_, i) => i + 1);

                let unansweredIds;
                if (authorization) {
                    const user = await User.findOne({username: payload.username});
                    unansweredIds = allIds.filter(id => !user.questionsAnswered.includes(id));
                } else {
                    unansweredIds = allIds.filter(id => !answeredQuestions.includes(id));
                }

                if (unansweredIds.length === 0) {
                    handleResponse(res, 404, {error: "No unanswered questions available"});
                    return;
                }

                // select a random ID from the unanswered IDs
                const randomIndex = Math.floor(Math.random() * unansweredIds.length);
                const randomId = unansweredIds[randomIndex];

                const question = await Question.findOne({id: randomId});
                if (!question) {
                    handleResponse(res, 404, {error: "Question not found"});
                    return;
                }
                let count = await questionCount();
                // remove the 'correct' field from the answers
                const response = {
                    count,
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
                handleResponse(res, 500, {error: "Error fetching random question"});
            }
        } catch (error) {
            console.error('Invalid input:', error);
            handleResponse(res, 400, {error: 'Invalid input: answeredQuestions must be an array of integers'});
        }
    });
};

const getQuestionById = async (res, request, id) => {
    try {
        const question = await Question.findOne({id: parseInt(id)});
        if (!question) {
            handleResponse(res, 404, {error: "Question not found"});
            return;
        }

        let count = await questionCount();
        // remove the 'correct' field from the answers
        const response = {
            count,
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
        handleResponse(res, 500, {error: "Error fetching question by ID"});
    }
};

const checkQuizQuestionAnswers = async (res, req, id) => {
    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', async () => {
        try {
            let cookie = req.headers.cookie
            let authorization = req.headers.authorization;
            let payload;
            if (authorization) {
                payload = await handleToken(res, req);
            }
            if (authorization && !payload) {
                return;
            }
            const parsedBody = JSON.parse(body);
            if (!Array.isArray(parsedBody.answers) || !parsedBody.answers.every(Number.isInteger)) {
                throw new Error('Invalid input');
            }
            const {answers} = parsedBody;
            try {
                const question = await Question.findOne({id: parseInt(id)});
                if (!question) {
                    handleResponse(res, 404, {error: "Question not found"});
                    return;
                }
                const correctAnswers = question.answers.filter(a => a.correct).map(a => a.key);
                let isCorrect = answers.length === correctAnswers.length && answers.every(a => correctAnswers.includes(a));

                let parsedCookie = parseCookie(cookie);
                let token = parsedCookie.quizToken;
                let quizToken = await QuizToken.findOne({token: token});
                if(!quizToken) {
                    handleResponse(res, 403, {error: "Quiz expired"});
                    return;
                }
                if (isCorrect) {
                    quizToken.correctAnswers++;
                }
                else {
                    quizToken.incorrectAnswers++;
                }
                quizToken.questions = quizToken.questions.filter(q => q !== parseInt(id));
                await quizToken.save();
                let finished = false;
                if (quizToken.questions.length === 0) {
                    finished = true;
                    if(quizToken.username) {
                        await User.findOneAndUpdate({
                            username: quizToken.username
                        },{
                            $inc: {
                                quizScoreCount: 1,
                                quizScoreTotal: quizToken.correctAnswers
                            },
                            $push: {
                                quizScores: quizToken.correctAnswers
                            }
                        });
                    }
                    await QuizToken.deleteOne({token: token});
                }
                handleResponse(res, 200, {
                    isCorrect,
                    answers: question.answers.filter(a => a.correct).map(a => a.key),
                    correct: quizToken.correctAnswers,
                    incorrect: quizToken.incorrectAnswers,
                    finished
                });
            } catch (error) {
                console.error(error);
                handleResponse(res, 500, {error: "Error checking answers"});
            }
        } catch (error) {
            console.error('Invalid input:', error);
            handleResponse(res, 400, {error: 'Invalid input: answers must be an array of integers'});
        }
    });
}

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
            if (authorization) {
                payload = await handleToken(res, req);
            }
            if (authorization && !payload) {
                return;
            }
            const parsedBody = JSON.parse(body);
            if (!Array.isArray(parsedBody.answers) || !parsedBody.answers.every(Number.isInteger)) {
                throw new Error('Invalid input');
            }
            const {answers} = parsedBody;
            try {
                const question = await Question.findOne({id: parseInt(id)});
                if (!question) {
                    handleResponse(res, 404, {error: "Question not found"});
                    return;
                }
                const correctAnswers = question.answers.filter(a => a.correct).map(a => a.key);
                let isCorrect = answers.length === correctAnswers.length && answers.every(a => correctAnswers.includes(a));
                if (isCorrect && authorization) {
                    await User.updateOne({username: payload.username}, {$push: {questionsAnswered: question.id}})
                }
                handleResponse(res, 200, {isCorrect, answers: question.answers.filter(a => a.correct).map(a => a.key)});
            } catch (error) {
                console.error(error);
                handleResponse(res, 500, {error: "Error checking answers"});
            }
        } catch (error) {
            console.error('Invalid input:', error);
            handleResponse(res, 400, {error: 'Invalid input: answers must be an array of integers'});
        }
    });
};

const handleQuiz = async (res, req) => {
    let token = generateQuizToken();
    let exists = await QuizToken.findOne({token: token});
    while (exists) {
        token = generateQuizToken();
        exists = await QuizToken.findOne({token: token});
    }
    const authorization = req.headers.authorization;
    let username;
    if (authorization) {
        const payload = await handleToken(res, req);
        if (!payload) {
            return;
        }
        username = payload.username;
    }
    const randomQuestions = await Question.aggregate([{$sample: {size: 26}}]);
    const questionIDs = randomQuestions.map(q => q.id);
    const quizToken = new QuizToken({
        token: token,
        username: username,
        createdAt: new Date(),
        questions: questionIDs,
        correctAnswers: 0,
        incorrectAnswers: 0
    });
    await quizToken.save();
    setTimeout(async () => {
        await QuizToken.deleteOne({token: token});
    }, 1800000); // 30 minute cat dureaza examenul
    let cookie = [`quizToken=${token}; Max-Age=1800; SameSite=Strict;`] // 30 minute cat dureaza examenul
    await handleResponseWithCookie(res, 200, {questions: questionIDs}, cookie);
}

module.exports = {
    addNewQuestion,
    deleteQuestionById,
    getRandomQuestion,
    getQuestionById,
    checkQuestionAnswers,
    handleQuiz,
    checkQuizQuestionAnswers
};