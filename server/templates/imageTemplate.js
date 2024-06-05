//exemplu de construire dinamica a HTML-ului pentru imagini

//TO-DO : move it inside client/scripts/fetchImage.js

function renderArticle(imageSources, imageTitles, imageDescriptions, pageTitle) {
    // Get the container element where the images will be appended
    let containerDiv = document.querySelector(".main-content");
    let imageContainerDiv = document.createElement("div");
    imageContainerDiv.classList.add("image-container");

    let mainTitleDiv = document.querySelector(".main-title");
    mainTitleDiv.textContent = pageTitle;

    for (let i = 0; i < imageSources.length; i++) {

        let imageWrapperDiv = document.createElement("div");
        imageWrapperDiv.classList.add("image-wrapper");

        let img = document.createElement("img");
        img.src = imageSources[i];
        img.alt = imageTitles[i]; // Set alt attribute to image title
        imageWrapperDiv.appendChild(img);

        let titleDiv = document.createElement("div");
        titleDiv.classList.add("image-title");
        titleDiv.textContent = imageTitles[i];
        imageWrapperDiv.appendChild(titleDiv);

        let descriptionDiv = document.createElement("div");
        descriptionDiv.classList.add("image-description");
        descriptionDiv.textContent = imageDescriptions[i];
        imageWrapperDiv.appendChild(descriptionDiv);

        imageContainerDiv.appendChild(imageWrapperDiv);
        containerDiv.appendChild(imageContainerDiv);
    }
}

let pageTitle = "Indicatoare rutiere de avertizare";
renderArticle(imageURLS, titles, subtitles, pageTitle);