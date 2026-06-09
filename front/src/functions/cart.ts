import type { OrderItem } from "@/interfaces/order";

const calculateCartTotalPrice = (cart: OrderItem[]): number => {
    let totalPrice = 0;

    if (!cart || cart.length == 0)
        return totalPrice;

    cart.forEach(item => totalPrice += item.price * item.quantity)

    return totalPrice;
}

export {
    calculateCartTotalPrice
}