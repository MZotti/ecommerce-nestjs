import * as yup from "yup";

const schema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().required("E-mail is required").email("E-mail is invalid"),
    roleId: yup.number().required("Role is required").min(1, "Role is required"),
});

export {
    schema
}