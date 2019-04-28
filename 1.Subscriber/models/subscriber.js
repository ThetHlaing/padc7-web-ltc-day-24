const fs = require('fs');
const path = require('path');


const filePath = path.join(__dirname, '/../data', 'emails.json');

const readEmails = () => {
    
    const jsonString = fs.readFileSync(
        filePath
        , 'utf8'
    );
    const jsonData = JSON.parse(jsonString);

    return jsonData;

}

const addNewEmail = (email) => {
    const jsonData = readEmails();

    jsonData.emails.push(email);

    fs.writeFileSync(filePath, JSON.stringify(jsonData));

}

module.exports = { readEmails, addNewEmail }