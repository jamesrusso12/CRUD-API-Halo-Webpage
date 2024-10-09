const connection = require('./connection');
const url = require('url');

//async function getAll(parameters = {}) {...}
//async function getById(id) {...}
//async function update(parameters = {}) {
//const updateSql = 'UPDATE maps SET map_name = ('?'), game_id = ('?'), map_description = ('?'), civilization_id = ('?') WHERE id = ('?')'
//}


async function insertRow(parameters = {}) {
    const insertSql = 'INSERT INTO maps (map_name, game_id, map_description, civilization_id) VALUES (?, ?, ?, ?)';
    let queryParameters = [
        parameters.map_name,
        parameters.game_id,
        parameters.map_description,
        parameters.civilization_id
    ];
    return await connection.query(insertSql, queryParameters);
}

async function updateRow(parameters = {}) {
    let updateSql = 'UPDATE maps m SET map_name = ?, game_id = ?, map_description = ?, civilization_id = ? WHERE id = ?';
    let queryParameters = [
        parameters.body.map_name,
        parameters.body.game_id,
        parameters.body.map_description,
        parameters.body.civilization_id,
        parameters.params.id
    ];
    console.log(queryParameters);
    return await connection.query(updateSql, queryParameters);
}

async function deleteRow(id) {
    let updateSql = 'DELETE FROM maps WHERE id = ?';
    let queryParameters = [
        id
    ];
    console.log(queryParameters);
    return await connection.query(updateSql, queryParameters);
}

async function getById(id) {
    let updateSql = 'SELECT * FROM maps m WHERE id = ?';
    let queryParameters = [
        id
    ];
    console.log(queryParameters);
    return await connection.query(updateSql, queryParameters);
}

//async function update(parameters = {}) {...}
//async function delete(id) {...}

async function getAllMaps(parameters = {}) {

    let selectSql = 'SELECT m.id AS id, map_name, game_id, map_description, civilization_id, game_name, game_studio_id, studio_name, studio_location, civilization_name, civilization_home FROM maps m INNER JOIN games g ON m.game_id = g.id INNER JOIN studios s ON g.game_studio_id = s.id INNER JOIN civilizations c ON m.civilization_id = c.id';
    //insertSql = 'INSERT INTO maps (map_name, game_id, map_description, civilization_id) VALUES (?, ?, ?, ?)'
    setSql = "";

    whereStatements = [],
        orderByStatements = [],
        queryParameters = [];

    if (typeof parameters.exclude !== 'undefined' && parseInt(parameters.exclude) === 0) {
        whereStatements.push("s.studio_name != ?");
        queryParameters.push('Bungie');
    }

    if (typeof parameters.gamename !== 'undefined' && parameters.gamename.length > 0) {
        const gamename = parameters.gamename;
        whereStatements.push("g.game_name LIKE ?");
        queryParameters.push('%' + gamename + '%');
    }

    if (typeof parameters.mapNames !== 'undefined') {
        const pie = parameters.mapNames;
        whereStatements.push('g.game_name LIKE ?');
        queryParameters.push('%' + pie + '%');
    }

    if (typeof parameters.sort !== 'undefined') {
        const apple = parameters.sort;
        if (apple === 'ASC') {
            orderByStatements.push('c.civilization_name ASC');
        } else if (apple === 'DESC') {
            orderByStatements.push('c.civilization_name DESC')
        }
    }

    //orderByStatements.push('m.id DESC LIMIT 1');
    //Dynamically add WHERE expressions to SELECT statements if needed
    if (whereStatements.length > 0) {
        selectSql += ' WHERE ' + whereStatements.join(' AND ');
    }

    //Dynamically add ORDER BY expressions to SELECT statements if needed
    if (orderByStatements.length > 0) {
        selectSql += ' ORDER BY ' + orderByStatements.join(', ');
    }

    //Dynamically add ORDER BY expressions to SELECT statements if needed
    if (typeof parameters.limit !== 'undefined' && parameters.limit > 0 && parameters.limit < 6) {
        selectSql += ' LIMIT ' + parameters.limit;
    }
    selectSql += ';';

    return await connection.query(selectSql, queryParameters);
}

module.exports = {
    insertRow,
    updateRow,
    getAllMaps,
    deleteRow,
    getById,
}