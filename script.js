const apiKey = '576a63ff0ce5460bab350212241410';
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const cityName = document.getElementById('city-name');
const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temperature');
const weatherDesc = document.getElementById('weather-desc');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');

async function getWeatherData(city) {
    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
        );
        const data = await response.json();
        
        if (response.ok) {
            updateWeatherInfo(data);
        } else {
            alert('도시를 찾을 수 없습니다. 다시 시도해주세요.');
        }
    } catch (error) {
        console.error('에러 발생:', error);
        alert('날씨 정보를 가져오는데 실패했습니다.');
    }
}

function updateWeatherInfo(data) {
    cityName.textContent = `${data.location.name}, ${data.location.country}`;
    weatherIcon.src = `https:${data.current.condition.icon}`;
    temperature.textContent = `${data.current.temp_c}°C`;
    weatherDesc.textContent = data.current.condition.text;
    humidity.textContent = `${data.current.humidity}%`;
    windSpeed.textContent = `${data.current.wind_kph} km/h`;
}

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeatherData(city);
    } else {
        alert('도시 이름을 입력해주세요.');
    }
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            getWeatherData(city);
        } else {
            alert('도시 이름을 입력해주세요.');
        }
    }
});

// 기본적으로 서울의 날씨 표시
window.addEventListener('load', () => {
    getWeatherData('Seoul');
});
