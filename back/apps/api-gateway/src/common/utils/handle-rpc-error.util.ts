import { HttpException } from '@nestjs/common';

export const handleRpcError = (error: any): never => {
    const payload = typeof error?.getError === 'function' ? error.getError() : error;
    const statusCode = typeof payload?.statusCode === 'number' ? payload.statusCode : 500;
    const message = typeof payload?.message === 'string' ? payload.message : 'Internal server error';
    throw new HttpException(message, statusCode);
};
