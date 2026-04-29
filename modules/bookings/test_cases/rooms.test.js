jest.mock('../../../includes/db/db', () => ({
    query: jest.fn()
}))

const db = require('../../../includes/db/db')
const { processCreateRoom } = require('../functions/rooms')

describe('Room Management', () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })

    it('should create a room successfully', async () => {
        db.query.mockResolvedValue({ rows: [{ id: 1 }] })

        const result = await processCreateRoom({
            room_number: '101',
            room_type: 'double',
            price: 120
        })

        expect(result.success).toBe(true)
    })
})