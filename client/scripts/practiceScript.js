const fetchQuestion = async () => {
    try {
        const answeredQuestions = localStorage.getItem('answeredQuestions');
        let parsedAnsweredQuestions = [];
        if (answeredQuestions) {
            parsedAnsweredQuestions = JSON.parse(answeredQuestions);
        }
        const headers = {
            'Content-Type': 'application/json'
        }
        if (localStorage.getItem('token')) {
            headers['Authorization'] = 'Bearer ' + localStorage.getItem('token');
        }
        const lastQuestion = localStorage.getItem('lastQuestion');
        let response;
        if (lastQuestion) {
            response = await fetch(`/api/questions/${lastQuestion}`);
        } else {
            response = await fetch('/api/questions/random', {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({answeredQuestions: parsedAnsweredQuestions}),
                credentials: "omit"
            });
        }
        const question = await response.json();
        if (!response.ok) {
            // TODO: actualizeaza DOM sa reflecte eroarea
            return;
        }
        localStorage.setItem('lastQuestion', question.id);
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
        localStorage.setItem('maxProgress', question.count);
        document.querySelector('.main-content').appendChild(clone);

        let buttons = document.querySelectorAll('.answer-button');

        buttons.forEach(button => {
            button.addEventListener('click', event => {
                let parent = event.target.parentElement;
                parent.classList.toggle('main-container__answer--selected');
            });
        });

        let submitButton = document.getElementById('verify');
        let nextButton = document.getElementById('next');

        submitButton.addEventListener('click', async () => {
            try {
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
                const response = await fetch(`/api/questions/${question.id}`, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({answers: myAnswers})
                });
                const result = await response.json();
                if (!response.ok) {
                    console.log('Error submitting answer: ' + result.error);
                    return;
                }
                console.log(result)
                if (result.isCorrect) {
                    let progress = parseInt(localStorage.getItem('progress'));
                    if (isNaN(progress)) {
                        progress = 0;
                    }
                    progress++;
                    localStorage.setItem('progress', progress.toString());
                    if (!localStorage.getItem('token')) {
                        let answered = JSON.parse(localStorage.getItem('answeredQuestions'))
                        if (answered === null) {
                            answered = [];
                        }
                        answered.push(question.id);
                        localStorage.setItem('answeredQuestions', JSON.stringify(answered));
                    }
                    localStorage.removeItem('lastQuestion');
                }
                submitButton.style.display = 'none';
                let className = result.isCorrect ? 'correct-answer' : 'wrong-answer';
                for (const button of buttons) {
                    if(result.answers.includes(parseInt(button.id))) {
                        button.classList.toggle(className);
                    }
                }
            } catch (err) {
                console.log('Error submitting answer: ' + err);
            }
        });

        nextButton.addEventListener('click', async () => {
            localStorage.removeItem('lastQuestion');
            window.location.reload();
        });
    } catch (error) {
        console.log('Error fetching question: ' + error);
    }
}

const updateProgressBar = () => {
    let progress = localStorage.getItem('progress');
    if (!progress) {
        progress = 0;
    }
    let maxProgress = localStorage.getItem('maxProgress');
    progress = parseInt(progress) / parseInt(maxProgress) * 100;
    document.getElementById('progress-bar').style.width = progress + '%';
}

fetchQuestion().then(async () => {
    console.log('Question fetched');
    updateProgressBar();
    document.querySelector('.main-content').style.display = 'block';
});