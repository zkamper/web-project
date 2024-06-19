const parseCookie = (cookie) => {
    let cookies = cookie.split('; ');
    let parsedCookies = {
        quizToken: undefined
    };
    for (const cookie of cookies) {
        let [key, value] = cookie.split('=');
        parsedCookies[key] = value;
    }
    return parsedCookies;
}

module.exports = {parseCookie};