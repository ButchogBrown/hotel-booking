const db = require('../../../includes/db/db')

exports.processCreateRoom = async ({room_number, room_type, price, room_name, capacity}) => {
  const result = await db.query(
    	`INSERT INTO rooms (room_number, room_type, price, room_name, capacity)
      	VALUES($1, $2, $3, $4, $5)
				RETURNING *`,
			[room_number, room_type, price, room_name, capacity]
  )
	if(result.rowCount === 0) {
		const error = new Error("Room Creation Failed!")
		error.status = 500
		throw error
	}
	
	return {
		success: true,
		data: result.rows[0]
	}
}

exports.processGetAllRooms = async () => {
	const result = await db.query(
		`SELECT * FROM rooms ORDER BY id DESC`
	)
	return {
		success: true,
		data: result.rows
	}
}

exports.processGetRoomById = async (id) => {
	const result = await db.query(
		`SELECT * FROM rooms WHERE id = $1`, [id]
	)
	if(result.rowCount === 0) {
		const error = new Error('Room not Found')
		error.status = 404
		throw error
	}
	return {
		success: true,
		data: result.rows[0]
	}
}

exports.processDeleteRoom = async (id) => {
	const result = await db.query(
		`DELETE FROM  rooms WHERE id = $1 RETURNING *`, [id]
	)
	if(result.rowCount === 0) {
		const error = new Error("Room not Found")
		error.status = 404
		throw 404
	}
	return {
		success: true,
		data: result.rows[0]
	}
}

exports.processUpdateRoom = async (id, {room_number, room_type, price}) => {
	const result = await db.query(
		`UPDATE rooms
			SET room_number = $1,
				room_type = $2,
				price = $3,
				updated_at = NOW()
			WHERE id = $4 
			RETURNING *`, 
			[room_number, room_type, price, id]
	)

	if(result.rowCount  === 0) {
		const error = new Error("Room not Found!")
		error.status = 404
		throw error
	}
	return {
		success: true,
		data: result.rows[0]
	}
}