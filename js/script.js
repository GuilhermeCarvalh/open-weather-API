

const apiKey = "668885a24b005bd8269d3c6db2b6f4de";
const apiContryURL = "https://countryflagsapi.com/png/";


const cityinput = document.querySelector('#city-input');
const searchBtn = document.querySelector('#search');


const cityElement = document.querySelector('#city');
const tempElement = document.querySelector('#temperature span');
const descElement = document.querySelector('#description');
const weatherIconElement = document.querySelector('#weather-icon');
const contryElement = document.querySelector('#country');
const humidElement = document.querySelector('#humidade span');
const windElement = document.querySelector('#wind span');


const weatherContainer = document.querySelector("#weather-data");
//Funções 
const getWeatherData = async(city) => {

    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`;
       
    const res = await fetch(apiWeatherURL);
    const data = await res.json();

    return data
}

const shoWeatherData = async (city) => {
    const data = await getWeatherData(city);

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute('src',
    `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`)
   
      contryElement.setAttribute("src", apiContryURL + data.sys.country);
      humidElement.innerText = `${data.main.humidity}%`
      windElement.innerText = `${data.wind.speed}km/h`

      weatherContainer.classList.remove('hide');
};

//Events 
searchBtn.addEventListener('click', (e) =>{
     
    const city = cityinput.value;
     e.preventDefault();
    shoWeatherData(city);
});


cityinput.addEventListener('keyup', (e) => {
    if(e.code == 'Enter'){
        const city = e.target.value;

        shoWeatherData(city);
    }
})

