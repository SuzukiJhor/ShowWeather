const apiKey = "804510e0033e4d65eefbf1ff697d676c"
const apiCountryURL = "https://countryflagsapi.com/png/"

const cityInput = document.querySelector('#city-input')
const searchBtn = document.querySelector('#search')
const humidityElement = document.querySelector('#humidity span')
const windElement = document.querySelector('#wind span')

const getWeatherData = async city => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    
    try{
        const response = await fetch(apiWeatherURL)
        const data = await response.json()
        return data

    }catch(err){
        console.log(`erro:${err}`)
    }

}

const getWeatherCity =   async event =>{
    event.preventDefault()
    const city = cityInput.value
    const data = await getWeatherData(city) 
    showWeatherData(data)
}

const showWeatherData =  data => {
    document.querySelector('#city')
    .innerText =  data.name

    document.querySelector('#temperature span')
    .innerText = parseInt(data.main.temp)

    document.querySelector('#description')
    .innerText = data.weather[0].description

    document.querySelector('#weather-icon')
    .setAttribute(
        'src', 
        `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
        )

    document.querySelector('#country')
    .setAttribute(
        'src', `${apiCountryURL}${data.sys.country}`)
    
    document.querySelector('#humidity span')
    .innerText = `${data.main.humidity}%`

    document.querySelector('#wind span')
    .innerText = `${data.wind.speed}km/h`
}

searchBtn.addEventListener('click', getWeatherCity)