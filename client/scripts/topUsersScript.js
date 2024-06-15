async function renderTopUsers() {
    try {
        let host = window.location.host;
        let apiPath = 'http://' + host + '/api/users/top';
        console.log(`Requesting top users from: ${apiPath}`);
        
        let response = await fetch(apiPath);
        let usersAndScores = await response.json();

        console.log('API Response:', usersAndScores);

        const topUsersList = document.getElementById('top-users-list');
        topUsersList.innerHTML = ''; // Clear previous content

        usersAndScores.forEach((user, index) => {
            const li = document.createElement('li');
            li.textContent = `${user.username}: ${user.score.toFixed(2)} POINTS`; // Format score to 2 decimal places
            topUsersList.appendChild(li);
        });
    } catch (error) {
        console.error("Error rendering users:", error);
    }
}

renderTopUsers().then(() => {
    console.log("Users rendered!");
});