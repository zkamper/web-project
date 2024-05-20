const registerLink = document.getElementById('register-link');
const loginLink = document.getElementById('login-link');

const registerForm = document.getElementById('register-form');
const loginForm = document.getElementById('login-form');

console.log(registerForm)
console.log(loginForm)

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
