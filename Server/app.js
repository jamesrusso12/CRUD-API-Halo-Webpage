const express = require('express');
const cors = require('cors');
const { body, check, validationResult } = require('express-validator');
const map = require('./Model/map');
const game = require('./Model/game');
const studio = require('./Model/studio');
const multer = require('multer');

const app = express();
app.use(cors());
const port = process.env.port || 80;
app.use(express.static('View'));
const upload = multer();

app.get(
    '/game/',
    upload.none(),
    async (request, response) => {

        let result = {};
        try {
            result = await game.readAllRows(request.query);

            return response

                .json({ 'data': result });
        }
        catch (error) {
            console.log(error);
            return response
                .status(500) //Error code when something goes wrong with the server

                .json({ message: 'Something went wrong with the server.' });



        }
        //Default response object

    });

app.get(
    '/studio/',
    upload.none(),
    async (request, response) => {
        let result = {};
        try {
            result = await studio.readAllRows(request.query);

            return response

                .json({ 'data': result });
        }
        catch (error) {
            console.log(error);
            return response
                .status(500) //Error code when something goes wrong with the server

                .json({ message: 'Something went wrong with the server.' });

        }
        //Default response object

    });

app.get(
    '/map/',
    upload.none(),
    async (request, response) => {
        let result = {};
        try {
            result = await map.getAllMaps(request.query);

            return response

                .json({ 'data': result });
        }
        catch (error) {
            console.log(error);
            return response
                .status(500) //Error code when something goes wrong with the server

                .json({ message: 'Something went wrong with the server.' });

        }
        //Default response object

    });

app.get(
    '/map/:id/',
    upload.none(),
    async (request, response) => {
        let result = {};
        try {
            result = await map.getById(request.params.id);

            return response

                .json({ 'data': result });
        }
        catch (error) {
            console.log(error);
            return response
                .status(500) //Error code when something goes wrong with the server

                .json({ message: 'Something went wrong with the server.' });

        }
        //Default response object

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
        if (!errors.isEmpty()) {
            return response
                .status(400)
                .json({
                    message: 'Request fields or files are invalid.',
                    errors: errors.array(),
                });
        }
        let result = {};
        try {
            console.log(request.body);
            result = await map.insertRow(request.body);

            return response
                .json({ 'data': result });
        }
        catch (error) {
            console.log(error);
            return response
                .status(500) //Error code when something goes wrong with the server

                .json({ message: 'Something went wrong with the server.' });

        }
        //Default response object

    });

app.put(
    '/map/:id/',
    upload.none(),
    check('map_name', 'please enter name').isLength({ min: 1 }),
    check('game_id', 'please enter game').isLength({ min: 1 }),
    check('map_description', 'please enter description').isLength({ min: 1 }),
    check('civilization_id', 'please enter civilization number 1-3').isLength({ min: 1 }),
    async (request, response) => {

        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response
                .status(400)
                .json({
                    message: 'Request fields or files are invalid.',
                    errors: errors.array(),
                });
        }
        let result = {};
        try {
            result = await map.updateRow(request);

            return response

                .json({ 'data': result });
        }
        catch (error) {
            console.log(error);
            return response
                .status(500) //Error code when something goes wrong with the server

                .json({ message: 'Something went wrong with the server.' });

        }
        //Default response object

    });

app.delete(
    '/map/:id/',
    upload.none(),
    async (request, response) => {
        let result = {};
        try {
            result = await map.deleteRow(request.params.id);

            return response

                .json({ message: 'Something went wrong with the server.' });
        }
        catch (error) {
            console.log(error);
            return response
                .status(500) //Error code when something goes wrong with the server

                .json({ message: 'Something went wrong with the server.' });

        }
        //Default response object

    });

app.listen(port, () => {
    console.log(`CRUD Application listening at http://localhost/:${port}`);
})
