async function renderImages() {
    try {
        // Get the container element where the images will be appended
        let containerDiv = document.querySelector(".main-content");

        let path = window.location.pathname;
        let host = window.location.host;
        
        // path is /indicatoare/section
        let section = path.split("/")[2];
        let apiPath = 'http://' + host + '/api/indicatoare/' + section;
        console.log(`Requesting images from: ${apiPath}`); // Debugging log
        let response = await fetch(apiPath);
        let data = await response.json();

        console.log('API Response:', data); // Debugging log

        let images = data.images;
        let title = data.title;

        // Display the title
        let mainTitleDiv = document.querySelector(".main-title");
        mainTitleDiv.textContent = title;

        let imageContainerDiv = document.createElement("div");
        imageContainerDiv.classList.add("image-container");

        images.forEach(imageData => {
            let imageWrapperDiv = document.createElement("div");
            imageWrapperDiv.classList.add("image-wrapper");

            let img = document.createElement("img");
            img.src = imageData.src; //the exported image has the attribute called src
            img.alt = imageData.title;
            imageWrapperDiv.appendChild(img);

            let titleDiv = document.createElement("div");
            titleDiv.classList.add("image-title");
            titleDiv.textContent = imageData.title;
            imageWrapperDiv.appendChild(titleDiv);

            let descriptionDiv = document.createElement("div");
            descriptionDiv.classList.add("image-description");
            descriptionDiv.textContent = imageData.subtitle;
            
            imageWrapperDiv.appendChild(descriptionDiv);
            imageContainerDiv.appendChild(imageWrapperDiv);
        });

        containerDiv.appendChild(imageContainerDiv);

    } catch (error) {
        console.error("Error occurred in fetchImage.js: " + error);
    }
}

renderImages().then(() => {
    console.log("Images rendered!");
});