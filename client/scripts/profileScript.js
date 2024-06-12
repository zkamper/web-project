const loginForm = document.getElementById("reset-pass-form");
const status = document.getElementById('response-status');

const handleLogout = async () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
}

loginForm.addEventListener('submit', async event => {
    event.preventDefault();

    const oldPasswordNode = document.getElementById('password-old');
    const newPasswordNode = document.getElementById('password-new');

    const oldPassword = oldPasswordNode.value;
    const newPassword = newPasswordNode.value;

    const oldPasswordHashed = CryptoJS.SHA256(oldPassword).toString();
    const newPasswordHashed = CryptoJS.SHA256(newPassword).toString();

    try {
        const response = await fetch('/api/user', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                oldPassword: oldPasswordHashed,
                newPassword: newPasswordHashed
            })
        })
        const data = await response.json();
        if (response.status === 401) {
            alert(data.error);
            localStorage.removeItem('token');
            window.location.href = '/login';
            return;
        }
        if (!response.ok) {
            status.textContent = data.error;
            status.style.color = 'red';
            return;
        }
        oldPasswordNode.value = '';
        newPasswordNode.value = '';
        status.textContent = data.message;
        status.style.color = 'green';


    } catch (error) {
        console.error('Error:', error);
    }
});

async function getUserData() {
    const response = await fetch('/api/user/profile', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
    const data = await response.json();
    if (!response.ok) {
        alert(data.error);
        localStorage.removeItem('token');
        window.location.href = '/login';
        throw new Error(data.error);
    }
    return data;
}

getUserData().then((data) => {
    let progress = data.questionsAnswered.length / 1000 * 100;
    document.getElementById('user-name').textContent = data.username;
    document.getElementById('progress-bar').style.width = progress + '%';
    document.getElementsByClassName("main-content")[0].style.display = "block";
})