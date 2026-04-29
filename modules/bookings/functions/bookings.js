const axios = require('axios')
const db = require('../../../includes/db/db')

exports.processCreateBooking = async ({ guest_id, room_id, check_in, check_out }, { weather_code, min_temp, max_temp }) => {
		const result = await db.query(
			`INSERT INTO bookings (guest_id, room_id, check_in, check_out, weather_code, temp_min, temp_max)
			values ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
			[guest_id, room_id, check_in, check_out, weather_code, min_temp, max_temp]
		)
		if(result.rowCount === 0) {
			const error = new Error("Booking Failed!")
			error = 400
			throw error
		}
		return {
			success: true,
			data: result.rows[0]
		}
}

exports.checkRoomAvailability = async (room_id, check_in, check_out) => {
    const result = await db.query(
        `SELECT * FROM bookings 
        WHERE room_id = $1
        AND status != 'canceled'
        AND (check_in < $3 AND check_out > $2) `,
        [room_id, check_in, check_out]
    );

	console.log(`Found ${result.rows.length} conflicting bookings for room ${room_id}`);
    if (result.rows.length > 0) {
        console.log("Conflict details:", result.rows);
    }

    return result.rows.length === 0;
}

exports.processGetAllBookings = async () => {
	const result = await db.query(
		`SELECT 
			b.id,
			b.check_in,
			b.check_out,
			b.status,

			g.id AS guest_id,
			g.first_name,
			g.last_name,
			g.email,
			g.phone_number,

			r.id AS room_id,
			r.room_number,
			r.room_type,
			r.price,
			r.room_name

		FROM bookings b
		JOIN guests g ON b.guest_id = g.id
		JOIN rooms r ON b.room_id = r.id
		ORDER BY b.id DESC;`
	)
	return {
		success: true,
		data: result.rows
	}
}

exports.processGetBookingById = async (id) => {
	const result = await db.query(
		`SELECT 
			b.id,
			b.check_in,
			b.check_out,
			b.status,

			g.id AS guest_id,
			g.first_name,
			g.last_name,
			g.email,

			r.id AS room_id,
			r.room_number,
			r.room_type,
			r.price

		FROM bookings b
		JOIN guests g ON b.guest_id = g.id
		JOIN rooms r ON b.room_id = r.id
		WHERE b.id = $1
		ORDER BY b.id DESC;`, [id]
	)
	if(result.rowCount === 0) {
		const error = new Error("No Booking Found!")
		error.status = 404
		throw error
	}
	return {
		success: true,
		data: result.rows[0]
	}
}

exports.processDeleteBooking = async (id) => {
	const result = await db.query(
		`DELETE FROM bookings 
		WHERE id = $1 RETURNING *`, [id]
	)
	if(result.rowCount === 0) {
		const error = new Error('No Booking Found!')
		error.status = 404
		throw error
	}
	return {
		success: true,
		data: result.rows[0]
	}
}

exports.processUpdateBooking = async (status, id) => {
	const result = await db.query(
		`UPDATE bookings
		SET status = $1
		WHERE id =$2 RETURNING *`, [status, id]
	)
	if(result.rowCount === 0) {
		const error = new Error('No Booking Found!')
		error.status = 404
		throw error
	}
	return {
		success: true,
		data: result.rows[0]
	}
}

exports.processGetBookingGuestById = async (id) => {
	const result = await db.query(
		`SELECT 
			b.id,
			b.check_in,
			b.check_out,
			b.status,

			g.id AS guest_id,
			g.first_name,
			g.last_name,
			g.email

		FROM bookings b
		JOIN guests g ON b.guest_id = g.id
		WHERE b.guest_id = $1
		ORDER BY b.id DESC;`, [id]
	)
	if(result.rowCount === 0) {
		const error = new Error("No Booking Found!")
		error.status = 404
		throw error
	}
	return {
		success: true,
		data: result.rows
	}
}