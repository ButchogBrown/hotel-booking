const db = require('../../../includes/db/db')

exports.processCreateGuest = async ({first_name, last_name, email, phone_number}) => {
    const result = await db.query(
        `INSERT INTO guests (first_name, last_name, email, phone_number)
        VALUES ($1, $2, $3, $4) RETURNING *`,
				[first_name, last_name, email, phone_number]
    )
		return {
			success: true,
			data: result.rows[0]
		}
}

exports.processGetAllGuests = async () => {
	const result = await db.query(
		`SELECT * FROM guests ORDER BY id DESC`
	)
	return {
		success: true,
		data: result.rows
	}
}

exports.processGetGuestById = async (id) => {
	const result = await db.query(
		`SELECT * FROM guests WHERE id = $1`, [id]
	)
	if(result.rowCount === 0) {
		const error = new Error("Guest not Found")
		error.status = 404
		throw error
	}
	return {
		success: true,
		data: result.rows[0]
	}
}

exports.processDeleteGuest = async (id) => {
	const result = await db.query(
		`DELETE FROM guests WHERE id = $1 RETURNING *`, [id]
	)
	if(result.rowCount === 0) {
		const error = new Error("Guest not Found!")
		error.status = 404
		throw error
	}
	return {
		success: true,
		data: result.rows[0]
	}
}

exports.processupdateGuest = async ({first_name, last_name, email, phone_number}, id) => {
	console.log(first_name, last_name, email, phone_number, id)
	const result = await db.query(
		`UPDATE guests
			SET first_name = $1,
				last_name = $2,
				email = $3,
				phone_number = $4,
				updated_at = NOW()
			WHERE id = $5
				RETURNING *`,
				[first_name, last_name, email, phone_number, id]
	)

	if(result.rowCount === 0) {
		const error = new Error("No Guest Found!")
		error.status = 404
		throw error
	}
	return {
		success: true, 
		data: result.rows[0]
	}
}