let buttons = document.querySelectorAll('.answer-button');

buttons.forEach( button => {
    button.addEventListener('click', event => {
        let parent = event.target.parentElement;
        parent.classList.toggle('main-container__answer--selected');
    });
});

const fetchQuestion = async () => {
    try {
        const answeredQuestions = localStorage.getItem('answeredQuestions');
        let parsedAnsweredQuestions = [];
        if(answeredQuestions) {
            parsedAnsweredQuestions = JSON.parse(answeredQuestions);
        }
        const headers = {
            'Content-Type': 'application/json'
        }
        if(localStorage.getItem('token')) {
            headers['Authorization'] = 'Bearer ' + localStorage.getItem('token');
        }
        const response = await fetch('/api/question/random',{
            method: 'POST',
            headers: headers,
            body: JSON.stringify({answeredQuestions: parsedAnsweredQuestions})
        });

        const question = await response.json();
        if(!response.ok) {
            // actualizeaza DOM sa reflecte eroarea
            return;
        }
        const templ = document.querySelector("#question-template");

        const clone = templ.content.cloneNode(true);
        const answers = clone.querySelector('.main-container__answers');
        console.log(answers)
        for(const answer of question.answers) {
            const variant = answer.value.split(' ').slice(1).join(' ');
            answers.innerHTML += `<div class="main-container__answer">
                <button class="answer-button" id="${answer.key}">A</button>
                <p>${variant}</p>
            </div>`;
        }
        clone.querySelector('.main-container__question').innerHTML = `<p>${question.title}</p>`
        const imageDiv = clone.querySelector('.main-container__image');
        if(question.image) {
            const image = document.createElement('img');
            image.src = question.image;
            image.alt = question.title;
            imageDiv.appendChild(image);
        }
        document.querySelector('.main-content').appendChild(clone);
    } catch (error) {
        console.log('Error fetching question: ' + error);
    }
}

fetchQuestion().then(async () => {
    console.log('Question fetched');
    document.querySelector('.main-content').style.display = 'block';
});