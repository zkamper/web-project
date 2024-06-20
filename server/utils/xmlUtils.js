const removeNewlines = (str) => {
    return str.replace(/[\r\n]+/g, '');
};

const cleanXmlString = (xmlString) => {
    let cleanedString = xmlString.replace(/\\"/g, '"').replace(/\\'/g, "'").replace(/\\n/g, '').replace(/\\t/g, '');
    cleanedString = cleanedString.replace(/\\/g, '');
    cleanedString = cleanedString.split('\n').map(line => line.trim()).join('\n');
    return cleanedString;
};

module.exports = { removeNewlines, cleanXmlString };