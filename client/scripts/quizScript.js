const unload = async (e) => {
    e.preventDefault();
    e.returnValue = '';
}

window.addEventListener('beforeunload', unload);

const fetchQuestion = async (id, questions, offset) => {
    try {
        const headers = {
            'Content-Type': 'application/json'
        }
        if (localStorage.getItem('token')) {
            headers['Authorization'] = 'Bearer ' + localStorage.getItem('token');
        }
        let response = await fetch(`/api/questions/${questions[id]}`);
        const question = await response.json();
        if (!response.ok) {
            // TODO: actualizeaza DOM sa reflecte eroarea
            return;
        }

        const templ = document.querySelector("#question-template");
        let buttonText = ['A', 'B', 'C'];
        const clone = templ.content.cloneNode(true);
        const answers = clone.querySelector('.main-container__answers');
        for (const answer of question.answers) {
            const variant = answer.value.split(' ').slice(1).join(' ');
            answers.innerHTML += `<div class="main-container__answer">
                <button class="answer-button" id="${answer.key}">${buttonText[parseInt(answer.key)]}</button>
                <p>${variant}</p>
            </div>`;
        }
        clone.querySelector('.main-container__question').innerHTML = `<p>${question.title}</p>`
        const imageDiv = clone.querySelector('.main-container__image');
        if (question.image) {
            const image = document.createElement('img');
            image.src = question.image;
            image.alt = question.title;
            imageDiv.appendChild(image);
        }
        // eliminam intrebarea anterioara inainte de a insera una noua
        const prevQuestion = document.querySelector('.main-container')
        if (prevQuestion) {
            prevQuestion.remove();
        }
        document.querySelector('.main-content').appendChild(clone);

        let buttons = document.querySelectorAll('.answer-button');

        buttons.forEach(button => {
            button.addEventListener('click', event => {
                let parent = event.target.parentElement;
                parent.classList.toggle('main-container__answer--selected');
            });
        });

        let prevButton = document.getElementById('prev');
        let submitButton = document.getElementById('verify');
        let nextButton = document.getElementById('next');

        submitButton.addEventListener('click', async () => {
            try {
                questions = questions.filter(q => q !== question.id);
                const myAnswers = [];
                buttons.forEach(button => {
                    if (button.parentElement.classList.contains('main-container__answer--selected')) {
                        myAnswers.push(parseInt(button.id));
                    }
                });
                if(myAnswers.length === 0) {
                    alert('Selecteaza cel putin un raspuns!');
                    return;
                }
                const response = await fetch(`/api/quiz/questions/${question.id}`, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({answers: myAnswers}),
                    credentials: "include"
                });
                const result = await response.json();
                if(response.status === 403) {
                    // TODO: ceva cu cookie-uri
                }
                else if (!response.ok) {
                    console.log('Error submitting answer: ' + result.error);
                    return;
                }
                console.log(result);
                if(result.finished) {
                    document.querySelector('.main-content').remove();
                    const finishedTemplate = document.querySelector("#finished-page");
                    const clone = finishedTemplate.content.cloneNode(true);
                    document.querySelector('main').appendChild(clone);
                    const score = document.querySelector("#score");
                    const admis = document.querySelector("#passed");
                    if(result.correct >= 22) {
                        admis.textContent = "ADMIS!";
                    } else {
                        admis.textContent = "PICAT!";
                    }
                    score.textContent = result.correct;
                    document.querySelector('.main-content').style.display = 'block';
                    window.removeEventListener('beforeunload',unload);
                    return;
                }

                submitButton.style.display = 'none';
                let className = result.isCorrect ? 'correct-answer' : 'wrong-answer';
                for (const button of buttons) {
                    if (result.answers.includes(parseInt(button.id))) {
                        button.classList.toggle(className);
                    }
                }

                const correctQuestions = document.querySelector("#progress-correct");
                const wrongQuestions = document.querySelector("#progress-wrong");
                const progress = document.querySelector("#progress");

                progress.textContent = result.correct + result.incorrect;
                correctQuestions.textContent = result.correct;
                wrongQuestions.textContent = result.incorrect;

            } catch (err) {
                console.log('Error submitting answer: ' + err);
            }
        });

        prevButton.addEventListener('click', async () => {
            offset = offset - 1;
            if (offset < 0) {
                offset = questions.length - 1;
            }
            await fetchQuestion(offset, questions, offset);
        });
        nextButton.addEventListener('click', async () => {
            offset = offset + 1;
            if (offset >= questions.length) {
                offset = 0;
            }
            await fetchQuestion(offset, questions, offset);
        });
    } catch (error) {
        console.log('Error fetching question: ' + error);
    }
}
const loadQuiz = async () => {
    try {
        const headers = {
            'Content-Type': 'application/json'
        }
        if (localStorage.getItem('token')) {
            headers['Authorization'] = 'Bearer ' + localStorage.getItem('token');
        }
        const response = await fetch('/api/quiz', {
            headers: headers
        });
        const quiz = await response.json();
        if (!response.ok) {
            return;
        }
        const questions = quiz.questions;
        await fetchQuestion(0, questions, 0);
    } catch (error) {
        // TODO: insert error in DOM
        console.log('Error loading quiz: ' + error);
    }
}

loadQuiz().then(() => {
    console.log('Quiz loaded');
    let time = 1800; // 30 minute
    const timer = document.getElementById('remaining-time')
    let intervalId = setInterval(() => {
        time -= 1;
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        console.log(timer)
        timer.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        if(time === 0) {
            clearInterval(intervalId)
            document.querySelector('.main-content').remove();
            const finishedTemplate = document.querySelector("#finished-page");
            const clone = finishedTemplate.content.cloneNode(true);
            document.querySelector('main').appendChild(clone);
            const admis = document.querySelector("#passed");
            admis.textContent = 'Timpul a expirat!'
            document.querySelector('.main-content').style.display = 'block';
            window.removeEventListener('beforeunload',unload);
        }
    }, 1000);
    document.querySelector('.main-content').style.display = 'block';
});