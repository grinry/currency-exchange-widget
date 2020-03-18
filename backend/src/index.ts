import './vars';
import * as express from 'express';
import { router } from './routes';
import { json, urlencoded } from 'body-parser';
import * as filter from 'content-filter';
import * as compress from 'compression';
import * as helmet from 'helmet';
import * as cors from 'cors';
import { notFoundError } from './error-handlers/not-found-error';
import { errorHandler } from './error-handlers/error-handler';

const server = express();

// Express middlewares.
server.use(json());
server.use(urlencoded({extended: true}));
server.use(filter());
server.use(compress());
server.use(helmet());
server.use(cors());

// Adds routes.
server.use(router);

// catch 404 and forward to error handler.
server.use(() => notFoundError());

// handles errors.
server.use(errorHandler);

const port = process.env.PORT || 8081;

server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
});

process.on('uncaughtException', error => {
    console.error(error);
});

process.on('unhandledRejection', error => {
    console.error(error);
});
