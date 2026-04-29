

const modal = document.getElementById('roomModal')
const openBtn = document.getElementById('openModal')
const closeBtn = document.getElementById('closeModal')
const roomForm = document.getElementById('roomForm')
const bookingForm = document.getElementById('bookingForm')
const errorContainer = document.getElementById('errorContainer')
const bookingErrorContainer = document.getElementById('bookingErrorContainer')
const minTemp = document.getElementById('minTemp')
const maxTemp = document.getElementById('maxTemp')
const weatherDescription = document.getElementById('weatherDescription')
const humidity = document.getElementById('humidity')
const container = document.getElementById('roomsList')
const roomSelect = document.getElementById('roomSelect')
const guestSelect = document.getElementById('guestSelect')
const table = document.getElementById("bookingsTable")



openBtn.addEventListener('click', () => {
  	modal.classList.remove('hidden')
  	modal.classList.add('flex')
})

closeBtn.addEventListener('click', () => {
	errorContainer.innerHTML = ""

  	modal.classList.add('hidden')
  	modal.classList.remove('flex')
})
const fetchRooms = async () => {
    try {
        const res = await axios.get('http://localhost:3000/api/rooms')
        return res.data.data

    } catch (error) {
        console.log(error)
    }
}

const fetchGuests = async () => {
	try {
		const res = await axios.get('http://localhost:3000/api/guests')
		return res.data.data
	}catch(err) {
		console.log(err)
	}
}

const fetchBookings = async () => {
	try {
		const res = await axios.get('http://localhost:3000/api/bookings')
		return res.data.data
	}catch(err) {
		console.log(err)
	}
}
const displayRooms = async () => {
	const rooms = await fetchRooms()

	 container.innerHTML = rooms.map(room => `
        <li class="flex justify-between border p-4 rounded shadow">
            <div>
                <h3 class="text-xl font-semibold">${room.room_name}</h3>
                <small class="block pb-2">Room ${room.room_number}</small>

                <p>Type: ${room.room_type}</p>
                <p>Capacity: ${room.capacity} guests</p>
            </div>

            <p class="text-xl font-semibold text-blue-500">
                $${room.price}/night
            </p>
        </li>
    `).join('')
}

const updateStatus = async (booking_id, status) => {
	try {
		const res = await axios.patch(`http://localhost:3000/api/bookings/${booking_id}`, {"status": status})
		displayBookings()
	} catch (err) {
		console.log(err)
	}
}
const displayBookings = async () => {
	const bookings = await fetchBookings()
	console.log(bookings)
	table.innerHTML = ""


	bookings.forEach((b) => {
	const row = `
		<tr class="border-t">
			<td class="p-3">${b.id}</td>

			<td class="p-3 font-semibold text-gray-900">
				${b.first_name} ${b.last_name}
			</td>

			<td class="p-3">${b.phone_number} - ${b.email}</td>

			<td class="p-3">
				${b.room_type} - ${b.room_number}
			</td>

			<td class="p-3">
				${new Date(b.check_in).toLocaleDateString()}
			</td>

			<td class="p-3">
				${new Date(b.check_out).toLocaleDateString()}
			</td>

			<td class="p-3 font-semibold text-gray-900">
				$${b.price}
			</td>

			<td class="p-3">
				
				<select class="px-4 py-2 border rounded-md bg-white text-gray-700" 
				${b.status === "canceled" ? "disabled" : ""}
				onchange="updateStatus(${b.id}, this.value)">
					<option value="pending" ${b.status === "pending" ? "selected" : ""}>Pending</option>
					<option value="confirmed" ${b.status === "confirmed" ? "selected" : ""}>Confirmed</option>
					<option value="canceled" ${b.status === "canceled" ? "selected" : ""}>Canceled</option>
				</select>
			</td>
		</tr>
	`

		table.innerHTML += row
	})

}

const getWeather = async () => {
	try {
		const res = await axios.get('http://localhost:3000/api/weathers')
		const data = res.data.data
		console.log(data)

		minTemp.textContent = `Min: ${data.min_temp}°C`
		maxTemp.textContent = `Max: ${data.max_temp}°C`
		humidity.textContent = `${data.humidity}`
		weatherDescription.textContent = `${data.weatherDescription}`
	}catch (err) {
		console.log(err)
	}
}

const openModal = () => {
    document.getElementById('modal').style.display = 'block'
}

const closeModal = () => {
    document.getElementById('modal').style.display = 'none'
}

roomForm.addEventListener('submit', async (e) =>{
	e.preventDefault()
	
	errorContainer.innerHTML = ""
	const data = Object.fromEntries(new FormData(roomForm).entries())

	try{
		const res = await axios.post('http://localhost:3000/api/rooms', data)
		if(res.data.success) {
			roomForm.reset()
      		modal.classList.add('hidden')
			fetchRooms()
		}
	}catch(err) {
		const messages = err.response.data.message
		if (Array.isArray(messages)) {
			errorContainer.innerHTML = messages
				.map(msg => `<p>• ${msg}</p>`)
				.join('')
		} else {
			errorContainer.innerHTML = `<p>• ${messages}</p>`
		}
	}
})

const populateSelectOptions = async () => {
	const rooms = await fetchRooms()
	const guests = await fetchGuests()

	let roomOption = `<option value="">Select Room</option>`
	let guestOptions = `<option value="">Select Guest</option>`

	rooms.forEach(room => {
		roomOption += `
		<option value="${room.id}">
			${room.room_name} - $${room.price}/night
		</option>
		`
	})

	guests.forEach(guest => {
		guestOptions += `
		<option value="${guest.id}">
			${guest.first_name} ${guest.last_name} (${guest.email})
		</option>
		`
	})

	roomSelect.innerHTML = roomOption
	guestSelect.innerHTML = guestOptions
}

bookingForm.addEventListener('submit', async (e) =>{
	e.preventDefault()
	
	bookingErrorContainer.innerHTML = ""
	const data = Object.fromEntries(new FormData(bookingForm).entries())
	console.log(data)
	try{
		const res = await axios.post('http://localhost:3000/api/bookings', data)
		console.log(res)
		if(res.data.success) {
			roomForm.reset()
      		modal.classList.add('hidden')
			displayBookings()
		}
	}catch(err) {
		const messages = err.response.data.message
		if (Array.isArray(messages)) {
			bookingErrorContainer.innerHTML = messages
				.map(msg => `<p>• ${msg}</p>`)
				.join('')
		} else {
			bookingErrorContainer.innerHTML = `<p>• ${messages}</p>`
		}
	}
})

document.addEventListener('DOMContentLoaded', () => {
	displayRooms()
	displayBookings()
	getWeather()
	populateSelectOptions()
	fetchBookings()
})