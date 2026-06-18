import * as yup from "yup";
import valid from 'card-validator';

const schema = yup.object({
    cardNumber: yup.string().required("Card Number is required").test(
        'card-number',
        'Invalid Card Number',
        value => {
            if (!value) return false;
            const result = valid.number(value);
            return result.isValid;
        }
    ),
    holderName: yup.string().required("Holder Name is required"),
    cvv: yup.string().required("CVV is required").test(
        'cvv',
        'Invalid CVV',
        value => {
            if (!value) return false;
            const result = valid.cvv(value);
            return result.isValid;
        },
    ),
    expiresMonth: yup.string().required("CVV is required"),
    expiresYear: yup.string().required("CVV is required"),
});

export {
    schema
}