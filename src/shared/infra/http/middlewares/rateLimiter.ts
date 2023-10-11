import { NextFunction, Request, Response } from 'express';
import { createClient } from 'redis';
import { RateLimiterRedis } from 'rate-limiter-flexible';

import { AppError } from '../../../errors/AppError';

export default async function rateLimiter(
    request: Request,
    response: Response,
    next: NextFunction,
): Promise<void> {
    const redisClient = createClient();

    // It is recommended to process Redis errors and setup some reconnection strategy
    redisClient.on('error', (err) => console.log('Redis Client Error', err));

    await redisClient.connect();

    const opts = {
        storeClient: redisClient,
        useRedisPackage: true, // use this flag for the latest redis package
        keyPrefix: 'rateLimiter',
        points: 5, // Number of requests
        duration: 5, // Per second(s)
        //blockDuration: 0, // Do not block if consumed more than points
    };

    const rateLimiterRedis = new RateLimiterRedis(opts);

    try {
        await rateLimiterRedis.consume(request.ip);

        return next();
    } catch (err) {
        throw new AppError('Too many requests', 429);
    } finally {
        await redisClient.disconnect();
    }
}
