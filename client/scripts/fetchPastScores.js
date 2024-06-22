// create grid items dynamically
async function renderPastScores() {
    const apiPath = '/api/users/profile';
    const gridContainer = document.getElementById("results-grid");
    const containerGrid = document.getElementById("container__grid");
    const resultsContainer = document.getElementById("results-container");

    try {
        let response = await fetch(apiPath, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        let data = await response.json();

        // Check for empty quizScores
        if (!data.quizScores || data.quizScores.length === 0) {
            // hide the container if there are no quiz scores
            containerGrid.style.display = "none";
            resultsContainer.style.display = "none";
            console.log("No quiz scores available.");
        } else {
            // the containers must have the appropriate CSS classes
            containerGrid.style.display = "block";
            resultsContainer.style.display = "block";

            // traverse the quizScores
            data.quizScores.forEach(item => {
                const gridItem = document.createElement("div");
                gridItem.classList.add("grid-item");

                // score category and assign CSS styling
                if (item.score < 22) {
                    gridItem.classList.add("low-score");
                } else if (item.score >= 22 && item.score <= 24) {
                    gridItem.classList.add("medium-score");
                } else if (item.score > 24 && item.score <= 26) {
                    gridItem.classList.add("high-score");
                }

                // trim the date to a readable format
                const date = new Date(item.date).toLocaleDateString('en-GB');

                gridItem.innerHTML = `
                    <p>${item.score} Puncte</p>
                    <p>${date}</p>
                `;

                gridContainer.appendChild(gridItem);
            });
        }
    } catch (error) {
        console.error("Error fetching data: ", error);
    }
}

renderPastScores().then(() => {
    console.log("Past scores rendered");
});