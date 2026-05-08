import SelectInput from '@/components/Inputs/SelectInput'
import OrderItems from './OrderItems'

const OrderForm = () => {

    return (
        <>
            <SelectInput id='paymentMethod' label='Payment method' options={[
                { value: 1, label: "PIX" },
                { value: 2, label: "PAYMENT ORDER" },
                { value: 3, label: "CREDIT" },
                { value: 4, label: "DEBIT" }
            ]} />
            <OrderItems />
        </>
    )
}

export default OrderForm