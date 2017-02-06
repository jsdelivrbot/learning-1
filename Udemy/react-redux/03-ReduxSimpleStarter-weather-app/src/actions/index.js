import axios from 'axios'

const API_KEY = '3af87d3b4ae9bf957e5ea4a1797b6466'
const ROOT_URL = `http://api.openweathermap.org/data/2.5/forecast?appid=${API_KEY}`

export const FETCH_WEATHER = 'FETCH_WEATHER'

export function fetchWeather(city) {
    const url = `${ROOT_URL}&q=${city},gb`
    const request = axios.get(url)

    return {
        type: FETCH_WEATHER,
        payload: request
    }
}