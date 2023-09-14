import getData from "./dataFns.js"
import { getIcon } from "./utils.js"


const locationCurrentTemp = document.querySelector(".location-weather .temp")
const locationCurrentWeatherIcon = document.querySelector(".location-weather .temp-icon")
const locationName = document.querySelector(".location-name")
const locationTime = document.querySelector(".location-time")

const feelsLikeValue = document.querySelector(".feels_like-temp span")
const HumidityValue = document.querySelector(".humidity span")
const WindDirectionValue = document.querySelector(".wind_dir span")
const WindSpeedValue = document.querySelector(".wind_speed span")


const hourlyContainers = document.querySelectorAll(".hourly-container")
const dailyContainers = document.querySelectorAll(".daily-container")

const searchLocationBar = document.querySelector(".search-location input")

let prevLocation = 'Mumbai'

function updateCurrentWeather(name, country, values) {
    locationCurrentTemp.textContent = parseFloat(values.temp).toPrecision(3)
    locationCurrentWeatherIcon.innerHTML = getIcon(values.weather[0].icon)
    locationCurrentWeatherIcon.setAttribute("title", `${values.weather[0].main} | ${values.weather[0].description}`)
    locationName.textContent = `${name}, ${country}`
    locationTime.textContent = `${values.date.date + '/' + values.date.month} | ${values.date.time}`

    feelsLikeValue.textContent = parseFloat(values.feels_like).toPrecision(3)
    HumidityValue.textContent = values.humidity
    WindDirectionValue.textContent = values.wind_deg
    WindSpeedValue.textContent = values.windspeed
}


function updateHourlyContainers(values = []) {
    for (let container of hourlyContainers) {
        let index = parseInt(container.dataset.index)
        let icon = container.querySelector(".hourly-icon")
        let time = container.querySelector(".hourly-time")
        let temp = container.querySelector(".hourly-temp span")

        time.textContent = values[index].date.time
        temp.textContent = parseFloat(values[index].temp).toPrecision(3)
        icon.innerHTML = getIcon(values[index].weather[0].icon)
        icon.setAttribute("title", `${values[index].weather[0].main} | ${values[index].weather[0].description}`)
    }
}

function updatedailyContainers(values = []) {
    for (let container of dailyContainers) {
        let index = parseInt(container.dataset.index)
        let icon = container.querySelector(".daily-icon-container")
        let date = container.querySelector(".daily-date")
        let day = container.querySelector(".daily-day")
        let maxTemp = container.querySelector(".daily-max-temp")
        let minTemp = container.querySelector(".daily-min-temp")

        date.textContent = values[index].date.date + "/" + values[index].date.month
        day.textContent = values[index].date.day
        minTemp.textContent = parseFloat(values[index].temp.min).toPrecision(3)
        maxTemp.textContent = parseFloat(values[index].temp.max).toPrecision(3)
        icon.innerHTML = getIcon(values[index].weather[0].icon)
        icon.setAttribute("title", `${values[index].weather[0].main} | ${values[index].weather[0].description}`)

    }
}


async function updateUI(parsedData) {
    updateCurrentWeather(parsedData.location, parsedData.country, parsedData.current)
    updateHourlyContainers(parsedData.hourly)
    updatedailyContainers(parsedData.daily)
    console.log("UI updated")
}



searchLocationBar.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        if (searchLocationBar.validity.valid && searchLocationBar.value.length >= 3) {
            const location = searchLocationBar.value
            getData(location).then(data => {
                if (data.error) {
                    getData(prevLocation).then(data => {
                        updateUI(data)
                    })
                    alert("Check the location name again!")

                    return
                }

                updateUI(data).then(_ => prevLocation = location)
            })
        }
    }
})

document.addEventListener("DOMContentLoaded", () => {
    getData(prevLocation).then(data => {
        updateUI(data).then(() => {
            document.querySelector(".loading").classList.add("complete")
        })
    })
})


export { updateHourlyContainers, updatedailyContainers, updateCurrentWeather }