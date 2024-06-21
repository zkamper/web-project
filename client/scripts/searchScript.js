const searchQuestions = async () => {
    try {
        let parsedUrl = new URL(window.location.href);
        let searchParams = parsedUrl.searchParams.get("search")
        let response = await fetch(`/api/search?search=${searchParams}`)
        let data = await response.json();
        if(!response.ok) {
            const templateError = document.querySelector("#error");
            const clone = templateError.content.cloneNode(true);
            console.log(templateError)
            clone.querySelector("#error-message").textContent = data.error;
            document.querySelector(".container__error").appendChild(clone);
            return;
        }
        const templateQuestion = document.querySelector("#question");

        data.map( (element,index) => {
            const clone = templateQuestion.content.cloneNode(true);
            clone.querySelector("#question-text").textContent = element.title;
            clone.querySelector("#question-index").textContent = index + 1;
            clone.querySelector("#question-path").href = `/intrebari/${element.id}`;
            document.querySelector(".container__result").appendChild(clone);

        })
    } catch (err) {
        const templateError = document.querySelector("#error");
        const clone = templateError.content.cloneNode(true);
        console.log(templateError)
        clone.querySelector("#error-message").textContent = "Eroare la încărcarea întrebărilor"
        document.querySelector(".container__error").appendChild(clone);
        console.log(err)
    }
}

searchQuestions().then( () => {
    console.log("Questions loaded")
})