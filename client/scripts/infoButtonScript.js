document.getElementById('info-button').addEventListener('click', function() {
    var tooltip = document.getElementById('tooltip');
    tooltip.style.display = tooltip.style.display === 'block' ? 'none' : 'block';
    tooltip.querySelector('.tooltip-text').style.fontSize = '14px';

    var scoreText = 'score = averageOfTheAnsweredQuestions * 99 + questionsAnswered/totalQuestions';
    tooltip.querySelector('.tooltip-text').innerText = scoreText;
});