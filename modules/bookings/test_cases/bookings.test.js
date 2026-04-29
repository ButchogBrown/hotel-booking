jest.mock('../../../includes/db/db', () => ({
    query: jest.fn()
}))

const db = require('../../../includes/db/db')
const { processCreateBooking, processGetBookingGuestById } = require('../functions/bookings')

describe('Booking Management', () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })

    it('shoule create a booking successfully', async () => {
        db.query.mockResolvedValueOnce({rows: [{ id: 1 }]})

        const result = await processCreateBooking({
            guest_id: '1',
            room_id: '2',
            check_in: '2026-04-01',
            check_out: '2026-04-05',
        }, {
            weather_code: null,
            min_temp: null,
            max_temp: null
        }
    )

        expect(result.success).toBe(true)
    })

    it('should fetch bookings for a specific guest', async () => {
        db.query.mockResolvedValueOnce({
            rows: [
                {guest_id: 1}, 
                {guest_id: 1}
            ]
        })

        const result = await processGetBookingGuestById(1) 

        expect(result.success).toBe(true)
        expect(result.data.length).toBe(2)
    })
})
