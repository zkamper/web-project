const infoButton = document.getElementById('info-button');
const infoTooltip = document.getElementById('info-tooltip');
infoButton.addEventListener('mouseover', () => {
    infoTooltip.style.display = 'block';
})

infoButton.addEventListener('mouseout', () => {
    infoTooltip.style.display = 'none';
})