import dotenv from 'dotenv';

import express from 'express';

import cors from 'cors';

import HttpException from './helpers/HttpException.helper.js';
import exception_formatter from './middlewares/exception_formatter.middleware.js';

dotenv.config(); // If you exclude this line, the use of an environment variable in this file is impossible.

const application = express();

const cors_configuration = {
    optionsSuccessStatus: 200,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'PUT', 'POST'],
    origin: ['http://localhost:3000'],
};
application.use(cors(cors_configuration)); // It's a configuration applicable to any endpoint existing.

application.use(express.json()); // It expects an 'application/json' in the 'Content-Type' header, and parses the JSON payload to an JavaScript object.

// If the request doesn't match any route, this middleware function takes control.
application.all('*', (request, response, next_middleware) => {
    const http_exception = new HttpException(404, `Has occurred an '404' exception. The endpoint was not found.`);

    next_middleware(http_exception); // Make the middleware 'exception_formatter' function invocation.
});
application.use(exception_formatter); // 'Captures' any HTTP exception, and give it a standar format.

const PORT = process.env.PORT || 3000;
application.listen(PORT, () => {
    console.log(`Listen in the ${PORT} port... \nServer is running normally.`);
});