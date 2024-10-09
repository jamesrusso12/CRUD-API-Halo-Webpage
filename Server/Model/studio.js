const connection = require("./connection");


async function readAllRows(parameters = {}) {
    const selectSql = 'SELECT * FROM studios';
    return await connection.query(selectSql);
};

module.exports = {
    readAllRows
};