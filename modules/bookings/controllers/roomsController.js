const validateRoom = require('./validations/roomsRequest')
const { processCreateRoom, processGetAllRooms, processGetRoomById, processDeleteRoom, processUpdateRoom } = require('../functions/rooms')

exports.getAllRooms =async (req, res, next) => {
    try {
		const result = await processGetAllRooms()
		return res.status(200).json(result)
	}catch(err) {
		next(err)
	}
}

exports.getRoomById = async (req, res, next) => {
    try{
		const id = req.params.id
		const result = await processGetRoomById(id)
		return res.status(200).json(result)

	}catch(err) {
		next(err)
	}
}

exports.createRoom = async (req, res, next) => {
  	try {
    	await validateRoom.validate(req.body, {abortEarly: false})
		const result = await processCreateRoom(req.body)
		return res.status(200).json(result)

 	}catch(err) {
		next(err)
  	}
}

exports.updateRoom = async (req, res, next) => {
  try {
		const id = req.params.id
		await validateRoom.validate(req.body)
		const result = await processUpdateRoom(id, req.body)
		
		if(!result.success) return res.status(404).json(result)
		return res.status(200).json(result)

	}catch(err) {
		next(err)
	}
}

exports.deleteRoom = async (req, res, next) => {
  try {
		const id = req.params.id
		const result = await processDeleteRoom(id)

		if(!result.success) return res.status(404).json(result)
		return res.status(200).json(result)

	}catch(err) {
		console.log(err)
		next(err)
	}
}
