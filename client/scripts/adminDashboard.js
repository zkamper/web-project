const loadAdminDashboard = async () => {
    document.querySelector('.main-content').style.display = 'block';
}

const postForm = document.getElementById("add-question");
const deleteForm = document.getElementById("delete-question");

deleteForm.addEventListener('submit', async event => {
    event.preventDefault();
    const questionId = document.getElementById('question-id').value;
    try {
        const response = await fetch('/api/questions/' + questionId, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
        const data = await response.json();
        const statusNode = document.getElementById('response-status-delete');
        if(!response.ok) {
            statusNode.style.color = 'red';
            statusNode.innerText = data.error;
        } else {
            statusNode.style.color = 'green';
            statusNode.innerText = 'Question deleted successfully.';
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

postForm.addEventListener('submit', async event => {
    event.preventDefault();
    const question = event.target.question.value;
    const image = document.getElementById('question-image').value;
    const answer1 = document.getElementById('answer-1').value;
    const correct1 = document.getElementById('correct-1').checked;
    const answer2 = document.getElementById('answer-2').value;
    const correct2 = document.getElementById('correct-2').checked;
    const answer3 = document.getElementById('answer-3').value;
    const correct3 = document.getElementById('correct-3').checked;
    console.log(question, image, answer1, correct1, answer2, correct2, answer3, correct3);
    const body = {
        title: question,
        answers: [
            {
                key: 0,
                value: answer1,
                correct: correct1 ? 1 : 0
            },
            {
                key: 1,
                value: answer2,
                correct: correct2 ? 1 : 0
            },
            {
                key: 2,
                value: answer3,
                correct: correct3 ? 1 : 0
            }
        ]
    }
    if(image) {
        body.image = image;
    }
    console.log(body)
    try {
        const response = await fetch('/api/questions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify(body)
        });
        const data = await response.json();
        const statusNode = document.getElementById('response-status-post');
        if(!response.ok) {
            statusNode.style.color = 'red';
            statusNode.innerText = data.error;
        } else {
            statusNode.style.color = 'green';
            statusNode.innerText = 'Question added successfully. ID: ' + data.id;
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

loadAdminDashboard().then(() => {
    console.log('Admin Dashboard loaded');
});