const fs = require('fs');
const path = require('path');

const getUsers = () => {
    try {
        const data = fs.readFileSync(path.join(__dirname, '../../data/users.json'), 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error(err);
    }
};

module.exports = getUsers;