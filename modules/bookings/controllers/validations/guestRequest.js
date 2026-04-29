const yup = require('yup')

const guestSchema = yup.object({
    first_name: yup.string().required(),
    last_name: yup.string().required(),
    email: yup.string().email().required(),
    phone_number: yup.string()
    .matches(/^09\d{9}$/, "Invalid phone format")
    .required()
})

module.exports = guestSchema