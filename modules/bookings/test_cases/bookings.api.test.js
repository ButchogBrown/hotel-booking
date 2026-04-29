const request = require('supertest')
const app = require('../../../appSetup')

describe('Booking API', () => {
    it('should reject invalid dates', async() => {
        const res = await request(app)
        .post('/api/bookings')
        .send({
            guest_id: 1,
            room_id: 21,
            check_in: '2026-05-10',
            check_out: '2026-05-10'
        })

        expect(res.statusCode).toBe(400)
    })
})