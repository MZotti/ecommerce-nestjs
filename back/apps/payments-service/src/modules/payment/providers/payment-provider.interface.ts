import { OrderCreatedDto } from "@app/common/dto/orders/order-created.dto"

export interface PaymentProvider {
    createPayment(args1: OrderCreatedDto)

    getPayment(args1: string)

    confirmPayment(args1: string)

    cancelPayment()

    refundPayment()
}