import 'reflect-metadata';
import 'dotenv/config';
import cors from 'cors';
import express, { NextFunction, Response, Request } from 'express';
import 'express-async-errors';
import swaggerUI from 'swagger-ui-express';
import * as Sentry from '@sentry/node';
import { ProfilingIntegration } from '@sentry/profiling-node';

import '../../container';
import upload from '../../../config/upload';
import { AppError } from '../../errors/AppError';
import rateLimiter from './middlewares/rateLimiter';
import createConnection from '../typeorm';

import swaggerFile from '../../../swagger.json';
import { router } from './routes';

createConnection();
const app = express();
try {
    app.use(rateLimiter);

    Sentry.init({
        dsn: process.env.SENTRY_DSN,
        includeLocalVariables: true,
        integrations: [
            new Sentry.Integrations.LocalVariables({
                captureAllExceptions: true,
            }),
            new Sentry.Integrations.Http({ tracing: true }),
            new Sentry.Integrations.Express({ app }),
            new ProfilingIntegration(),
        ],
        // Performance Monitoring
        tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
        // Set sampling rate for profiling - this is relative to tracesSampleRate
        profilesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
    });

    app.use(Sentry.Handlers.requestHandler());
    app.use(Sentry.Handlers.tracingHandler());

    app.use(express.json());

    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));

    app.use('/avatar', express.static(`${upload.tmpFolder}/avatar`));
    app.use('/cars', express.static(`${upload.tmpFolder}/cars`));

    app.use(
        cors({
            origin: '*',
        }),
    );
    app.use(router);

    app.use(Sentry.Handlers.errorHandler());

    app.use(
        (
            err: Error,
            request: Request,
            response: Response,
            next: NextFunction,
        ) => {
            if (err instanceof AppError) {
                return response.status(err.statusCode).json({
                    message: err.message,
                });
            }

            return response.status(500).json({
                status: 'error',
                message: `Internal server error - ${err.message}`,
            });
        },
    );
} catch (e) {
    Sentry.captureException(e);
}

export { app };
