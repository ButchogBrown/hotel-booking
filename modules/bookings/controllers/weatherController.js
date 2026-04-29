const { weatherService } = require('../../../services/weatherService')

exports.getWeather = async (req, res, next) => {
    try {
        const today = new Date().toISOString().split('T')[0]
        const result = await weatherService(today)
        res.status(200).json({
            success: true,
            data: result
        })
    }catch(err) {
        next(err)
    }
}