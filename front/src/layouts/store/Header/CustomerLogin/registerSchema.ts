import * as yup from "yup";

const schema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().required("Email is required"),
    document: yup.string().required("Document is required"),
    password: yup.string().required("Password is required"),
});

export {
    schema
}