exports.errorHandler = (err, req, res, next) => {
  	if(err.name === 'ValidationError'){
		return res.status(400).json({
			success: false,
			message: err.errors
		})
  	}

  	if (err.code === '23505') {
		return res.status(409).json({
			success: false,
			message: 'Email already exists'
		});
  	}
	
	if (err.code === '23001') {
		return res.status(409).json({
			success: false,
			message: 'Cannot delete room because it has existing bookings'
		});
	}
	if (err.code === '22007') {
		return res.status(409).json({
			success: false,
			message: 'Invalid input syntax for type date'
		});
	}

  	if(err.status){
		return res.status(err.status).json({
			success: false,
			message: err.message
		})
  	}

	return res.status(500).json({
		success: false,
		message: "Internal Server Error"
	})

}