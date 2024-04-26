var buttons = document.querySelectorAll('.answer-button');

buttons.forEach( button => {
    button.addEventListener('click', event => {
        var parent = event.target.parentElement;
        parent.classList.toggle('main-container__answer--selected');
    });
});