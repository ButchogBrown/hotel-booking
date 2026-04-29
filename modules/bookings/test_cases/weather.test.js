jest.mock('axios')
jest.mock('../../../includes/db/db', () => ({
    query: jest.fn()
}))

const axios = require('axios')
const db = require('../../../includes/db/db')
const { weatherService } = require('../../../services/weatherService')

describe('Weather Management', () => {
    beforeEach(() => {
        jest.resetAllMocks()
    })

    it('should return correct weather data for check-in date', async () => {
        axios.get.mockResolvedValue({
            data: {
                daily: {
                    time: ['2026-04-28'],
                    weathercode: [2],
                    temperature_2m_min: [24],
                    temperature_2m_max: [31],
                    relative_humidity_2m_mean: [59],
                }
            }
        })

        const result = await weatherService('2026-04-28')

        expect(result.weather_code).toBe(2)
        expect(result.min_temp).toBe(24)
        expect(result.max_temp).toBe(31)
        expect(axios.get).toHaveBeenCalled();
    })
})