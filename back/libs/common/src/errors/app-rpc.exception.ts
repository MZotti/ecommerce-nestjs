import { RpcException } from '@nestjs/microservices';

export class AppRpcException extends RpcException {
    constructor(statusCode: number, message: string) {
        super({ statusCode, message });
    }
}
