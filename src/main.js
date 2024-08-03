import dotenv from 'dotenv';

import express from 'express';

import cors from 'cors';

import HttpException from './helpers/HttpException.helper.js';
import exception_formatter from './middlewares/exception_formatter.middleware.js';

import sequelize from './config/database.config.js';

dotenv.config(); // If you exclude this line, using an environment variable in the file is impossible.

const application = express();

const configuration_$cors = {
    optionsSuccessStatus: 200,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'PUT', 'POST'],
    origin: ['http://localhost:3000'],
};
application.use(cors(configuration_$cors)); // It's a configuration applicable to any endpoint existing.

application.use(express.json()); // It expects an 'application/json' in the 'Content-Type' header, and parses the JSON payload to an JavaScript object.

// If the request doesn't match any route, this middleware function takes control.
application.all('*', (request, response, next_middleware) => {
    const http_exception = new HttpException(404, `Has occurred an '404' exception. The endpoint was not found.`);

    next_middleware(http_exception); // Make the middleware 'exception_formatter' function invocation.
});
application.use(exception_formatter); // 'Captures' any HTTP exception, and give it a standar format.

// Synchronizing all the current, and future, entities with a database server (the '127.0.0.1' host).
(async ({ force = false } = {}) => {
    await sequelize.sync({ force })
        .then(() => {
            const PORT = process.env.PORT || 3000;
            application.listen(PORT, () => console.log({ message: `Listen in the ${PORT} port... Server is running normally.` }));
        })
        .catch((exception) => {
            const { original } = exception; // The 'exception' variable has this interanl structure 👉 {name: '', parent: { code: '', errno: '', sqlState: '', sqlMessage: '', sql: '' }, original: { code: '', errno: '', sqlState: '', sqlMessage: '', sql: '' } }.
            console.log({ code: original.code, message: original.sqlMessage });
        });
})();