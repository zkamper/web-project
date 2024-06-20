const loadDashboard = async () => {
    const response = await fetch('/api/admin', {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    });
    if (!response.ok) {
        const data = await response.json();
        alert(data.error);
        window.location = '/';
    } else {
        const mainElement = document.querySelector('main');
        mainElement.innerHTML = await response.text();

        const oldScripts = mainElement.getElementsByTagName('script');
        for (let oldScript of oldScripts) {
            let newScript = document.createElement('script');
            newScript.innerHTML = oldScript.innerHTML;
            for (let i = 0; i < oldScript.attributes.length; i++) {
                let attr = oldScript.attributes[i];
                newScript.setAttribute(attr.name, attr.value);
            }

            oldScript.parentNode.replaceChild(newScript, oldScript);
        }
    }
}

loadDashboard().then(() => {
    document.querySelector('.main-content').style.display = 'block';
    console.log('Dashboard loaded');
});