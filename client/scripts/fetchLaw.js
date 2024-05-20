/*
* Functie care creeaza span pentru numarul de articol
* @param {string} articleNumber - numarul articolului
* @returns {HTMLSpanElement} - spanul creat
 */
const createArticle = (articleNumber) => {
    let span = document.createElement("span");
    span.classList.add("article-number");
    span.textContent = articleNumber;
    return span;
}

/*
* Functie care creeaza paragraf de lege
* @param {string} text - textul paragrafului
* @returns {HTMLParagraphElement} - paragraful creat
 */
const createParagraph = (text) => {
    let paragraph = document.createElement("p");
    paragraph.classList.add("larger-text");
    paragraph.textContent = text;
    return paragraph;
}

async function renderArticle() {
    try {
        let containerDiv = document.querySelector(".right-container");

        let path = window.location.pathname;
        let host = window.location.host;

        // path is like /indicator/sectiune
        let section = path.split("/")[2];
        let apiPath = 'http://' + host + '/api/laws/' + section;
        let response = await fetch(apiPath);
        let data = await response.json();
        console.log(data);
        let articles = data[0].articles;

        // Iteram articolele si cream elementele HTML corespunzatoare
        for(const article of articles) {
            if(article.startsWith("Art.")) {
                /*
                * datorita modului cum sunt scrise articolele, uneori sunt scrie imediat dupa Art. <n>,
                * fie cu ., fie cu \n, de aceea folosesc acest regex
                 */
                const regex = article.includes("\n") ? /\n/ : /(?<=\d). /;
                let splitArticle = article.split(regex);
                console.log(splitArticle);
                let span = createArticle(splitArticle[0]);
                containerDiv.appendChild(span);
                let paragraph = createParagraph(splitArticle[1]);
                containerDiv.appendChild(paragraph);
            } else {
                let paragraph = createParagraph(article);
                containerDiv.appendChild(paragraph);
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
renderArticle().then(() => {
    console.log("Article rendered");
});