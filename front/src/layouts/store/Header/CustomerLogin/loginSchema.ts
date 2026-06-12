import * as yup from "yup";

const schema = yup.object({
    email: yup.string().required("E-mail is required").email("E-mail is invalid"),
    password: yup.string().required("Password is required"),
});

export {
    schema
}