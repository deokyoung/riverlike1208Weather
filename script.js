const apiKey = '576a63ff0ce5460bab350212241410';
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const cityName = document.getElementById('city-name');
const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temperature');
const weatherDesc = document.getElementById('weather-desc');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');

// 도시 이름 매핑 객체 추가
const cityMapping = {
    '서울': 'Seoul',
    '부산': 'Busan',
    '인천': 'Incheon',
    '대구': 'Daegu',
    '대전': 'Daejeon',
    '광주': 'Gwangju',
    '울산': 'Ulsan',
    '세종': 'Sejong',
    '제주': 'Jeju',
    '수원': 'Suwon',
    '창원': 'Changwon',
    '고양': 'Goyang',
    '용인': 'Yongin',
    '성남': 'Seongnam',
    '청주': 'Cheongju'
};

async function getWeatherData(city) {
    try {
        // 한국어 도시명을 영어로 변환
        const englishCity = cityMapping[city] || city;
        
        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${englishCity}&aqi=no`
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
