// create grid items dynamically

async function renderPastScores() {
    const apiPath = '/api/users/profile';
    const gridContainer = document.getElementById("results-grid");
        
    try {
        let response = await fetch(apiPath);
        let data = await response.json();
        
        // check quizScores existance
        if (data.quizScores && data.quizScores.length > 0) {
            // traverse the quizScores array
            data.quizScores.forEach(item => {
                const gridItem = document.createElement("div");
                gridItem.classList.add("grid-item");
            
                // score category
                if (item.score < 22) {
                    gridItem.classList.add("low-score");
                } else if (item.score >= 22 && item.score <= 24) {
                    gridItem.classList.add("medium-score");
                } else if (item.score > 24 && item.score <= 26) {
                    gridItem.classList.add("high-score");
                }
            
                // trim the date to a more readable format
                const date = new Date(item.date).toLocaleDateString('en-GB');
            
                gridItem.innerHTML = `
                    <p>${item.score} RON</p>
                    <p>${date}</p>
                `;
            
                gridContainer.appendChild(gridItem);
            });
        } else {
            console.log("No quiz scores available.");
        }
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
}
        
renderPastScores().then(() => {
    console.log("Past scores rendered");
});
