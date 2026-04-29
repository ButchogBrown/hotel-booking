const axios = require('axios')

exports.weatherService = async (check_in) => {
    const weatherMap = {
        0: "Clear Sky",

        1: "Mainly Clear",
        2: "Partly Cloudy",
        3: "Overcast",

        45: "Fog",
        48: "Depositing Rime Fog",

        51: "Light Drizzle",
        53: "Moderate Drizzle",
        55: "Dense Drizzle",

        56: "Light Freezing Drizzle",
        57: "Dense Freezing Drizzle",

        61: "Slight Rain",
        63: "Moderate Rain",
        65: "Heavy Rain",

        66: "Light Freezing Rain",
        67: "Heavy Freezing Rain",

        71: "Slight Snow Fall",
        73: "Moderate Snow Fall",
        75: "Heavy Snow Fall",

        77: "Snow Grains",

        80: "Slight Rain Showers",
        81: "Moderate Rain Showers",
        82: "Violent Rain Showers",

        85: "Slight Snow Showers",
        86: "Heavy Snow Showers",

        95: "Thunderstorm",

        96: "Thunderstorm with Slight Hail",
        99: "Thunderstorm with Heavy Hail"
    }
    const weather = await axios.get("https://api.open-meteo.com/v1/forecast", {
        params: {
            latitude: 14.5958,
            longitude: 120.9772,
            daily: "temperature_2m_max,temperature_2m_min,weathercode,relative_humidity_2m_mean"
        }
    })
    const dailyWeather = weather.data.daily
    const index = dailyWeather.time.findIndex((d) => d === check_in)
    console.log(dailyWeather.time)
    return {
        weather_code: dailyWeather.weathercode[index],
        min_temp: dailyWeather.temperature_2m_min[index],
        max_temp: dailyWeather.temperature_2m_max[index],
        humidity: dailyWeather.relative_humidity_2m_mean[index],
        weatherDescription: weatherMap[dailyWeather.weathercode[index]]
    }

}