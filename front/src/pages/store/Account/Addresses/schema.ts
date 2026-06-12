import * as yup from "yup";

const schema = yup.object({
    name: yup.string().required("Name is required"),
    zipCode: yup.string().required("Zip Code is required"),
    street: yup.string().required("Street is required"),
    number: yup.string().required("Number is required"),
    neighborhood: yup.string().required("Neighborhood is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    country: yup.string().required("Country is required"),
});

export {
    schema
}