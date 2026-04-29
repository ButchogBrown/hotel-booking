const guestValidate = require('./validations/guestRequest')
const { processCreateGuest, processGetAllGuests, processGetGuestById, processDeleteGuest, processupdateGuest } = require('../functions/guests')
const { processDeleteRoom } = require('../functions/rooms')

exports.getAllGuests = async (req, res) => {
  try {
    const result = await processGetAllGuests()
    return res.status(200).json(result)
  }catch(err) {
    next(err)
  }
}

exports.getGuestById = async (req, res, next) => {
  try {
		const id = req.params.id
		const result = await processGetGuestById(id)

		return res.status(200).json(result)
	}catch(err) {
		console.log(err)
		next(err)
	}
}

exports.createGuest = async (req, res, next) => {
  try {
    await guestValidate.validate(req.body, { abortEarly: false })
    const result = await processCreateGuest(req.body)

    return res.status(200).json(result)
  }catch(err) {
    next(err)
  }
}

exports.updateGuest = async (req, res, next) => {
  try {
		const id = req.params.id
		const body = req.body
			
		const result = await processupdateGuest(body, id) 

		if(!result.success) return res.status(404).json(result)
		return res.status(200).json(result)
		
	}catch(err) { 
		next(err)
	}
}

exports.deleteGuest = async (req, res, next) => {
  try {
    const id = req.params.id
    const result = await processDeleteGuest(id)

    return res.status(200).json(result)
        
  }catch(err) {
    next(err)
  }
}