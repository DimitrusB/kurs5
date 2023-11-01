const fs = require('fs');
const path = require('path');

const getBooks = () => {
    try {
        const data = fs.readFileSync(path.join(__dirname, '../../data/books.json'));
        return data;
    } catch (err) {
        console.error(err);
    }
};

module.exports = getBooks;