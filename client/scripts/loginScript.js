const registerLink = document.getElementById('register-link');
const loginLink = document.getElementById('login-link');

const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');

if(localStorage.getItem('token')) {
    window.location.href = '/profil'
}

registerLink.addEventListener('click', event => {
    console.log('register link clicked');
    loginForm.classList.toggle('form-hidden');
    registerForm.classList.toggle('form-hidden');
});

loginLink.addEventListener('click', event => {
    console.log('login link clicked');
    loginForm.classList.toggle('form-hidden');
    registerForm.classList.toggle('form-hidden');
});

loginForm.addEventListener('submit', async event => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const hashedPwd = CryptoJS.SHA256(password).toString();
    try {
        const response = await fetch('/api/login',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password:hashedPwd})
        });
        const data = await response.json();
        if(!response.ok) {
            alert(data.error);
            return;
        }
        localStorage.clear();
        localStorage.setItem('token', data.token);
        localStorage.removeItem('progress');
        window.location.reload();
    } catch (error) {
        console.error('Error:', error);
    }
})

const validateUsername = (username) => {
    const regex = /^[a-zA-Z0-9_.]{3,}$/;
    return regex.test(username);
}

registerForm.addEventListener('submit', async event => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    console.log(validateUsername(username));
    if(!validateUsername(username)) {
        document.getElementById("invalid").textContent = "Username invalid. Trebuie să aiba minim 3 caractere și să conțină doar caractere alfanumerice, . sau _";
        return;
    } else {
        document.getElementById("invalid").textContent = "";
    }
    if(password.length < 8) {
        document.getElementById("invalid-2").textContent = "Parola trebuie să aibă minim 8 caractere";
        return;
    } else {
        document.getElementById("invalid-2").textContent = "";
    }
    const hashedPwd = CryptoJS.SHA256(password).toString();
    try {
        const response = await fetch('/api/register',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, email, password:hashedPwd})
        });
        const data = await response.json();
        if(!response.ok) {
            alert(data.error);
            return;
        }
        window.location.reload();
    } catch (error) {
        console.error('Error:', error);
    }
})