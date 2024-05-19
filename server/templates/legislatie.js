// Import the function for fetching data
/*const { getSpecificArticleLineFromSection } = require('../controller/collectLegislatie.js');

// Define the section name and line number
const sectionName = "capitolul_1";
const lineNumber = 2; // Selecting the third line (index 2)

// Function to render the page with fetched data
async function renderPage() {
    try {
        // Fetch the specific article line from the section
        const paragraph = await getSpecificArticleLineFromSection(sectionName, lineNumber);
        console.log(paragraph);
        // Create a div element
        let div = document.createElement("div");
        div.classList.add("right-container");

        // Create and append span element for article number
        let span = document.createElement("span");
        span.classList.add("article-number");
        span.textContent = "Art. 1";
        div.appendChild(span);

        // Create p element for the specific paragraph only
        let paragraphElement = document.createElement("p");
        paragraphElement.classList.add("larger-text");
        paragraphElement.textContent = paragraph;
        div.appendChild(paragraphElement);

        // Append the created content to the web page
        let containerDiv = document.querySelector(".main-content");
        containerDiv.appendChild(div);
    } catch (error) {
        console.error("Error:", error);
    }
}

// Call the renderPage function to start rendering
renderPage(); */



function renderArticle(paragraphsContent, articleTitle) {
    // Create a div element
    let div = document.createElement("div");
    div.classList.add("right-container");

    // Create and append span element for article number
    let span = document.createElement("span");
    span.classList.add("article-number");
    span.textContent = articleTitle;
    div.appendChild(span);

    // Loop through paragraphs content and create p elements
    paragraphsContent.forEach(text => {
        let paragraph = document.createElement("p");
        paragraph.classList.add("larger-text");
        paragraph.textContent = text;
        div.appendChild(paragraph);
    });

    // Append the created content to the web page
    let containerDiv = document.querySelector(".main-content");
    containerDiv.appendChild(div);
}


let paragraphsContent = [
    "(1) Circulația pe drumurile publice a vehiculelor, pietonilor și a celorlalte categorii de participanți la trafic, drepturile, obligațiile și răspunderile care revin persoanelor fizice și juridice, precum și atribuțiile unor autorități ale administrației publice, instituții și organizații sunt supuse dispozițiilor prevăzute în prezenta ordonanță de urgență.",
    "(2) Dispozițiile prevăzute în prezenta ordonanță de urgență au ca scop asigurarea desfășurării fluente și în siguranță a circulației pe drumurile publice, precum și ocrotirea vieții, integrității corporale și a sănătății persoanelor participante la trafic sau aflate în zona drumului public, protecția drepturilor și intereselor legitime ale persoanelor respective,a proprietății publice și private, cât și a mediului.",
    "(3) Autoritatea competentă în domeniul circulației pe drumurile publice privind inițierea și avizarea unor reglementari, precum și aplicarea și exercitarea controlului privind respectarea normelor din acest domeniu este Ministerul Afacerilor Interne, prin Inspectoratul General al Poliției Române.",
    "(4) Reglementările privind circulația pe drumurile publice se emit, după caz, de către autoritățile publice centrale sau locale cu atribuții în acest domeniu, numai cu avizul Inspectoratului General al Poliției Române și cu respectarea acordurilor și convențiilor internaționale la care România este parte.",
    "(5) Prevederile prezentei ordonanțe de urgență se aplică tuturor participanților la trafic, precum și autorităților care au atribuții în domeniul circulației și siguranței pe drumurile publice și în domeniul protecției mediului."
];

// Call the renderArticle function with the paragraphs content
renderArticle(paragraphsContent, "Art. 1");


/*const mongoose = require('mongoose');
const Law = require('../models/law_model');

//mutat in .env
// Define the MongoDB URI
const uri = "mongodb+srv://gabrieljiglau:Ghetzuthau1@codrutier.vl1csrt.mongodb.net";

// Define the section name
const sectionName = "capitolul_1";
const articleName = "Art. 1";

async function getArticlesBySection(articleName, sectionName) {
    try {
        await mongoose.connect(uri);

        const result = await Law.findOne({ section: sectionName, articles: articleName });
        
        // Disconnect from MongoDB
        await mongoose.disconnect();

        // Check if result is null
        if (!result) {
            console.error("No article found for the specified section and article name.");
            return []; // Return an empty array
        }

        // Return the paragraphs content
        return result.articles.filter(article => article === articleName);
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}
// Function to render the article
function renderArticle( paragraphsContent) {
    // Create a div element
    let div = document.createElement("div");
    div.classList.add("right-container");

    // firstly if the array matches with articles, add it to the span
    let span = document.createElement("span");
    span.classList.add("article-number");
    span.textContent = articleName;
    div.appendChild(span);

    // otherwise , Loop through paragraphs content and create p elements
    paragraphsContent.forEach(text => {
        let paragraph = document.createElement("p");
        paragraph.classList.add("larger-text");
        paragraph.textContent = text;
        div.appendChild(paragraph);
    });

    // Append the created content to the web page
    let containerDiv = document.querySelector(".main-content");
    containerDiv.appendChild(div);
}

// Call the function to get articles by section
getArticlesBySection(articleName, sectionName)
    .then(paragraphsContent => {
        // Call the renderArticle function with the article name and paragraphs content
        renderArticle(articleName, paragraphsContent);
    })
    .catch(error => {
        console.error("Error:", error);
    });

    */
