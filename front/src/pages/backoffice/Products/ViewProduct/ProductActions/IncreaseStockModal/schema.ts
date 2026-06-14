import * as yup from "yup";

const schema = yup.object({
    quantity: yup.number().required("Quantity is required").min(1, "Quantity must me grater than 0"),
});

export {
    schema
}