import { OrderAnalyticsDto } from '@app/common/dto/analytics/order-analytics.dto';
import { ProductAnalyticsDto } from '@app/common/dto/analytics/product-analytics.dto';
import { Controller, Get, Inject, Query, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Roles } from 'apps/api-gateway/src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'apps/api-gateway/src/common/jwt/jwt-auth.guard';
import { RolesGuard } from 'apps/api-gateway/src/common/jwt/roles.guard';
import { handleRpcError } from 'apps/api-gateway/src/common/utils/handle-rpc-error.util';
import { lastValueFrom } from 'rxjs';

@Controller('backoffice/analytics')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'MANAGER', 'ANALYST')
export class AnalyticsController {
    constructor(
        @Inject('ANALYTICS_SERVICE') private client: ClientProxy,
    ) { }

    @Get('products')
    async getProductsAnalytics(
        @Query() query: ProductAnalyticsDto
    ) {
        return lastValueFrom(
            this.client.send('getProductsAnalytics', { query })
        ).catch(handleRpcError);
    }

    @Get('orders')
    async getOrdersAnalytics(
        @Query() query: OrderAnalyticsDto
    ) {
        return lastValueFrom(
            this.client.send('getOrdersAnalytics', { query })
        ).catch(handleRpcError);
    }
}
