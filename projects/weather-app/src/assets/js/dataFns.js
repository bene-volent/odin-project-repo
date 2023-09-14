import { formatDate } from "./utils.js"
import getWeatherData from "./weather.js"

function parseCurrentDayData(data,timezone_offset){
    return {
        date:formatDate(data.dt,timezone_offset),
        temp:data.temp,
        feels_like:data.feels_like,
        humidity:data.humidity,
        weather:data.weather,
        windspeed:data.wind_speed,
        wind_deg:data.wind_deg,
    }
}
function parseHourlyData(data,timezone_offset){
    let payload = []
    for (let i = 0 ;i < 24;i++){
        payload.push({
            date:formatDate(data[i].dt,timezone_offset),
            temp:data[i].temp,
            weather:data[i].weather,
        })
    }
    return payload
}

function parseDailyData(data,timezone_offset){
    let payload = []
    for (let i = 0;i < 7 ; i++){
        payload.push({
            date:formatDate(data[i].dt,timezone_offset),
            temp:{max:data[i].temp.max,min:data[i].temp.min},
            weather:data[i].weather
        })
    }
    return payload
}

async function getData(location){
    const data = await getWeatherData(location)

    if (data.error){
        return data
    }
    let parseData = {
      location:data.name,
      country:data.country,
      current:parseCurrentDayData(data.current,data.timezone_offset),
      daily:parseDailyData(data.daily,data.timezone_offset),
      hourly:parseHourlyData(data.hourly,data.timezone_offset)
    }
    
    return parseData
  }

export {parseCurrentDayData,parseDailyData,parseHourlyData};
export default getData