const fetchQuestion = async (id) => {
    try {
        document.querySelector('.main-title').textContent = 'Întrebarea Nr. ' + id;
        const response = await fetch(`/api/questions/${id}?full=true`);
        const question = await response.json();
        if (!response.ok) {
            return;
        }
        const templateQuestion = document.querySelector("#question-template");
        const questionElement = templateQuestion.content.cloneNode(true);
        const answers = questionElement.querySelector(".main-container__answers");
        let buttonText = ['A', 'B', 'C'];
        for (const answer of question.answers) {
            const variant = answer.value.split(' ').slice(1).join(' ');
            let className = 'answer-button-preview';
            if(answer.correct) {
                className = 'answer-button-preview answer-button-preview__correct'
            }
            answers.innerHTML += `<div class="main-container__answer">
                <button class="${className}" id="${answer.key}">${buttonText[parseInt(answer.key)]}</button>
                <p>${variant}</p>
            </div>`;
        }
        questionElement.querySelector('.main-container__question').innerHTML = `<p>${question.title}</p>`
        const imageDiv = questionElement.querySelector('.main-container__image');
        if (question.image) {
            const image = document.createElement('img');
            image.src = question.image;
            image.alt = question.title;
            imageDiv.appendChild(image);
        }
        document.querySelector('.main-content').appendChild(questionElement);
    } catch(err) {
        console.log('Error fetching question: ' + err);
    }
}

const parsedUrl = new URL(window.location.href);
const path = parsedUrl.pathname;
const id = path.split('/')[2];

fetchQuestion(id).then(() => {
    document.querySelector(".main-content").style.display = 'block';
    console.log('Question fetched');
})