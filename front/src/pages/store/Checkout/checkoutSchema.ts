import * as yup from "yup";

const schema = yup.object({
    paymentMethod: yup.string().required("Select the payment method"),
    shippingZipCode: yup.string().required("Address is invalid"),
    shippingStreet: yup.string().required("Address is invalid"),
    shippingNumber: yup.string().required("Address is invalid"),
    shippingComplement: yup.string().required("Address is invalid"),
    shippingCity: yup.string().required("Address is invalid"),
    shippingState: yup.string().required("Address is invalid"),
    shippingCountry: yup.string().required("Address is invalid"),
    cardNumber: yup.string().when('paymentMethod', {
        is: (val: string) => val === 'CREDIT' || val === 'DEBIT',
        then: (schema) => schema.required("Select you card"),
        otherwise: (schema) => schema.optional(),
    }),
});

export {
    schema
}