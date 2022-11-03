const apiWeatherKey = "804510e0033e4d65eefbf1ff697d676c";
const apiCountryURL = "https://countryflagsapi.com/png/";
const apiImageKey = "30854610-0a230a3f670569a8f29cc4441";

let cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector("#search");
const weatherData = document.querySelector("#weather-data");

const showImage =  async (data) => {
  const imageData = data.hits;
  
  if (imageData.length == 0) {
    document.querySelector(
      ".background-image"
    ).style.background = `url(/assets/notFound.jpg)`;
    return;
  }

  document.querySelector(
    ".background-image"
  ).style.background = `url(${data.hits[0].largeImageURL})no-repeat`;
};

const getImageCity = async (text) => {
  const apiImageUrl = `https://pixabay.com/api/?key=${apiImageKey}&q=${text}&image_type=photo`;

  const response = await fetch(apiImageUrl);
  const data = await response.json();
  return data;
};

const getWeatherByEvent = async event =>{
  event.preventDefault()
  let city;

  if(event.type === 'keyup'){

    if(event.code === "Enter" || event.code === 'NumpadEnter'){
      city = event.target.value

    }else{
      return
    }
  }
  if(event.type === 'click'){
    city = cityInput.value
  }

  const data = await getWeatherData(city)
  const imageData = await getImageCity(city)
  showImage(imageData)
  showWeatherData(data)

}

const getWeatherData = async (city) => {
  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiWeatherKey}`;

  const response = await fetch(apiWeatherURL);
  const data = await response.json();
  return data;
};

const showWeatherData = (data) => {

  if (data.cod == "404") {
    alert("cidade não encontrada");
    cityInput.value = "";
    return 
  }
  if (data.cod == "400") {
    alert("campo vazio, digite o nome de alguma cidade por favor!");
    return 
  }

  document.querySelector("#city").innerText = data.name;

  document.querySelector("#temperature span").innerText = parseInt(
    data.main.temp
  );

  document.querySelector("#description").innerText =
    data.weather[0].description;

  document
    .querySelector("#weather-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    );

  document
    .querySelector("#country")
    .setAttribute("src", `${apiCountryURL}${data.sys.country}`);

  document.querySelector("#humidity span").innerText = `${data.main.humidity}%`;

  document.querySelector("#wind span").innerText = `${data.wind.speed}km/h`;

  weatherData.classList.remove("hide");
};

searchBtn.addEventListener("click", getWeatherByEvent);
cityInput.addEventListener("keyup", getWeatherByEvent);

