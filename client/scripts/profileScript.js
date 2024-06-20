const loginForm = document.getElementById("reset-pass-form");
const status = document.getElementById('response-status');
const resetProgressButton = document.getElementById('reset-button');

document.addEventListener('DOMContentLoaded', function() {
    resetProgressButton.addEventListener('click', async function(event) {
        const userConfirmed = confirm("Esti sigur că vrei să resetezi progresul?");
        if (!userConfirmed) {
            return;
        }

        try {
            const jwtToken = localStorage.getItem('token');
            if (!jwtToken) {
                throw new Error('JWT token is missing');
            }

            const response = await fetch('/api/users/profile', {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + jwtToken
                }
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 401) {
                    // unauthorized (401) response
                    alert(data.error || 'Unauthorized'); // error message from backend
                    localStorage.removeItem('token'); // remove invalid token from localStorage
                    window.location.href = '/login'; // redirect to login page
                    throw new Error('Unauthorized'); // 
                } else {
                    throw new Error(data.error || 'Failed to delete profile');
                }
            }

            alert('Profile reset successfully');
            window.location.reload(); // reload the page

        } catch (error) {
            console.error('Error:', error.message);
            alert('Failed to delete profile: ' + error.message);
        }
    });
});

const handleLogout = async () => {
    localStorage.clear();
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
        const response = await fetch('/api/users', {
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
    const response = await fetch('/api/users/profile', {
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
    let maxProgress = localStorage.getItem('maxProgress');
    if(!maxProgress) {
        maxProgress = 1000;
    } else {
        maxProgress = parseInt(maxProgress);
    }
    let progress = data.questionsAnswered.length / maxProgress * 100;
    localStorage.setItem('progress', JSON.stringify(data.questionsAnswered.length));
    document.getElementById('user-name').textContent = data.username;
    document.getElementById('progress-bar').style.width = progress + '%';
    document.getElementsByClassName("main-content")[0].style.display = "block";
})