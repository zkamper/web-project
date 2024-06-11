const toggleButton = document.getElementsByClassName('toggle-button')[0];
const navbarLinks = document.getElementsByClassName('navbar-links')[0];

const navbarUl = document.querySelector('.navbar-links ul');
console.log(navbarUl.children);
if(localStorage.getItem('token')){
    navbarUl.removeChild(navbarUl.children[3]);
    const profileLi = document.createElement('li');
    profileLi.innerHTML = `<a href="/profil">Profil</a>`;
    navbarUl.append(profileLi);
}

toggleButton.addEventListener('click', () => {
    navbarLinks.classList.toggle('active');
});