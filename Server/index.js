//Libraries
const express = require('express');
const multer = require('multer');
const mysql = require('mysql2');
const { check, validationResult } = require('express-validator');
const url = require('url');
const halo = require('./Model/map');

//Setup defaults for script
const app = express();
const upload = multer();
const port = 80 //Default port to http server
const connection = mysql.createConnection({
    host: "student-databases.cvode4s4cwrc.us-west-2.rds.amazonaws.com",
    user: "JAMESRUSSO",
    password: "mcCsqeKtaRdE3Kv56oKSrquOVRtvVWiMaDk",
    database: 'JAMESRUSSO'

});

//The * in app.* needs to match the method type of the request
app.get(
    '/map/',
    upload.none(),
    async (request, response) => {
        let result = {};
        try {
            result = await halo.getAllMaps(request.params);
        }
        catch (error) {
            console.log(error);
            return response
                .status(500) //Error code when something goes wrong with the server
                .setHeader('Access-Control-Allow-Origin', '*') //Prevent CORS error
                .json({ message: 'Something went wrong with the server.' });

        }
        //Default response object
        response
            .setHeader('Access-Control-Allow-Origin', '*') //Prevent CORS error
            .json({ 'data': result });

    });

app.post(
    '/map/',
    upload.none(),
    check('map_name', 'please enter name').isLength({ min: 1 }),
    check('game_id', 'please enter game').isLength({ min: 1 }),
    check('map_description', 'please enter description').isLength({ min: 1 }),
    check('civilization_id', 'please enter civilization number 1-3').isLength({ min: 1 }),
    async (request, response) => {
        const errors = validationResult(request);
        /*if (!errors.isEmpty()) {
            return response
                .status(400)
                .setHeader('Access-Control-Allow-Origin', '*') //Prevent CORS error
                .json({
                    message: 'Request fields or files are invalid.',
                    errors: errors.array(),
                });
        }*/
        try {
            await halo.insert(request.body);
            return response
                .setHeader('Access-Control-Allow-Origin', '*') //Prevent CORS error
                .json({ message: 'OK' });
        }
        catch (error) {
            console.log(error);
            return response
                .status(500) //Error code when something goes wrong with the server
                .setHeader('Access-Control-Allow-Origin', '*') //Prevent CORS error
                .json({ message: 'Something went wrong with the server.' });
        }
    }
);

app.listen(port, () => {
    console.log(`Application listening at http://localhost:${port}`);
})


