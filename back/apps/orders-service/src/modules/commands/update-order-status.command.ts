// import { Command, Command, Option } from 'nest-commander';
// import { OrdersService } from '../orders/orders.service';

// interface UpdateOrderStatusOptions {
//     orderId: number;
//     status: string;
// }

// @Command({
//     name: 'update-order-status',
//     description: 'Update order status',
// })
// export class UpdateOrderStatusCommand extends CommandRunner {
//     constructor(
//         private readonly ordersService: OrdersService,
//     ) {
//         super();
//     }

//     async run(
//         _: string[],
//         options: UpdateOrderStatusOptions,
//     ): Promise<void> {
//         await this.ordersService.updateStatus(options.orderId, options.status);

//         console.log('Order status updated successfully');
//     }

//     @Option({
//         flags: '-i, --orderId <orderId>',
//     })
//     parseOrderId(value: number): number {
//         return value;
//     }

//     @Option({
//         flags: '-s, --status <status>',
//     })
//     parseStatus(value: string): string {
//         return value;
//     }
// }