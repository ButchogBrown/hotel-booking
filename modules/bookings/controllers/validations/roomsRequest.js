const yup = require('yup')

const roomSchema = yup.object({
    room_number: yup.string().required() ,
    room_type: yup.string().oneOf(['standard', 'deluxe', 'suite']).required(),
    price: yup.number().required().positive(),
    room_name: yup.string().required(),
    capacity: yup.number().required()
}) 

module.exports =  roomSchema 