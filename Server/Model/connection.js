//Library
//npm install mysql2
const mysql = require('mysql2/promise');

let connection = null;

async function query(sql, params) {
    if (null === connection) {
        console.log('Here');

        connection = await mysql.createConnection({
            host: "student-databases.cvode4s4cwrc.us-west-2.rds.amazonaws.com",
            user: "JAMESRUSSO",
            password: "mcCsqeKtaRdE3Kv56oKSrquOVRtvVWiMaDk",
            database: 'JAMESRUSSO'
        });
    }
    console.log(sql);
    const [results,] = await connection.execute(sql, params);

    return results;

}
module.exports = {
    query
}