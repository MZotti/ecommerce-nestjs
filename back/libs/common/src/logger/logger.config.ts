import * as winston from 'winston';

export const createLogger = (service: string) => {
    return winston.createLogger({
        level: 'info',

        format: winston.format.combine(
            winston.format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss',
            }),
            winston.format.errors({
                stack: true,
            }),
            winston.format.json(),
        ),

        transports: [
            new winston.transports.Console(),

            new winston.transports.File({
                filename: `logs/${service}.log`,
            }),

            new winston.transports.File({
                filename: `logs/error.log`,
                level: 'error',
            }),

        ],
    });

};