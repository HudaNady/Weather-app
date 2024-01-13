const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let dayName
let monthName
let day
let submit=document.getElementById('submit')
let searchInput=document.getElementById('search')
submit.addEventListener('click',()=>{
    getWeather(searchInput.value)
    clear()
})
function clear(){
    searchInput.value=''
}
async function getWeather(city='cairo'){
    let req = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=1174e61c7c4c4c8ab0f234505240801&q=${city}&days=3`)
    let data= await req.json()
    showWeatherToday(data)
    showWeatherNextDays(data)
}
getWeather()
function showWeatherToday(data){
    let date= new Date(data.current.last_updated)
    day=date.getDate()
    dayName= dayNames[date.getDay()]
    monthName=monthNames[date.getMonth()]
    document.getElementById('today').innerHTML=`<div class="header d-flex justify-content-between align-items-center  p-2 ">
    <p class="m-0">${dayName}</p>
    <p class="m-0">${day} ${monthName}</p>
</div>
<div class="forcast-content h-100 p-4">
    <h2 class="location text-start">${data.location.name}</h2>
    <div class="degree d-flex justify-content-around align-items-center text-light">
        <p class="fw-bolder  degreeToday">${data.current.temp_c}<span class="position-relative">o</span>C</p>
        <img src="http:${data.current.condition.icon}"  alt="">
    </div>
    <p class="text-primary">${data.current.condition.text}</p>
    <div class="d-flex mt-4 text-light-emphasis gap-2">
        <p><img src="images/icon-umberella.png" alt=""> ${data.current.precip_in}%</p>
        <p><img src="images/icon-wind.png" alt=""> ${data.current.wind_mph}km/h </p>
        <p><img src="images/icon-compass.png" alt=""> ${data.current.wind_dir}</p>
    </div>
</div>`
}
function showWeatherNextDays(data){
    let forcastdays=data.forecast.forecastday
    document.getElementById('tomorrow').innerHTML=`<div class="header2 p-2 ">
    <p class="m-0">${dayNames[new Date(forcastdays[1].date).getDay()]}</p>
</div>
<div class="forcast-content2 h-100 p-4 ">
    <div class="degrees p-3  text-light mt-4">
        <img src="http:${forcastdays[1].day.condition.icon}" class="mb-3" alt="">
        <p class="fw-bolder fs-5 m-0">${forcastdays[1].day.maxtemp_c}/${forcastdays[1].day.mintemp_c}<span class="position-relative">o</span>C</p>
        <p class="text-light-emphasis m-0">${forcastdays[1].day.maxtemp_f}<span class="position-relative">o</span></p>
        <p class="text-primary">${forcastdays[1].day.condition.text}</p>
    </div>
</div>`
document.getElementById('afterTomorrow').innerHTML=`<div class="header p-2 ">
<p class="m-0">${dayNames[new Date(forcastdays[2].date).getDay()]}</p>
</div>
<div class="forcast-content h-100 p-4 ">
<div class="degrees p-3  text-light mt-4">
    <img src="http:${forcastdays[2].day.condition.icon}"  class="mb-3" alt="">
    <p class="fw-bolder fs-5 m-0"> ${forcastdays[2].day.maxtemp_c}/${forcastdays[2].day.mintemp_c}<span class="position-relative">o</span>C</p>
    <p class="text-light-emphasis m-0">${forcastdays[2].day.maxtemp_f}<span class="position-relative">o</span></p>
    <p class="text-primary">${forcastdays[2].day.condition.text}</p>
</div>
</div>`
}


