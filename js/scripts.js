const apiKey = "804510e0033e4d65eefbf1ff697d676c"
const apiCountryURL = "https://countryflagsapi.com/png/"

const cityInput = document.querySelector('#city-input')
const searchBtn = document.querySelector('#search')

const cityElement = document.querySelector('#city')
const tempElement = document.querySelector('#temperature span')
const descElement = document.querySelector('#description')
const weatherIconElement = document.querySelector('#weather-icon')
const countryElement = document.querySelector('#country')
const humidityElement = document.querySelector('#humidity span')
const windElement = document.querySelector('#wind span')

const getWeatherData = async city => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    const response = await fetch(apiWeatherURL)
    return(response.json())
}

const showWeatherData = event =>{
    event.preventDefault()

    const city = cityInput.value 
    getWeatherData(city)
}

searchBtn.addEventListener('click', showWeatherData)