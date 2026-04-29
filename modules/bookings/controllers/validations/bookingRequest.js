const yup = require('yup')

const bookingSchema = yup.object({
    guest_id: yup.number().required(),
    room_id: yup.number().required(),
    check_in: yup.date().required(),
    check_out: yup
        .date()
        .required()
        .test(
            'after-checkin',
            'Check-out must be after check-in',
            function (value) {
                const{ check_in } = this.parent

                return value > check_in
            }
        ),
})

module.exports = bookingSchema