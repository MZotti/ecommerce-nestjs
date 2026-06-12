import * as yup from "yup";

const schema = yup.object({
    name: yup.string().required("Name is required"),
    categoryId: yup.number().required("Category is required").min(1, "Category is required"),
    description: yup.string().required("Description is required"),
    price: yup.number().required("Price is required").min(1, "Price must me grater than 0"),
    stock: yup.number().required("Stock is required").min(1, "Stock must me grater than 0"),
});

export {
    schema
}