async function Weather() {
  const appKey = 'ddbaf08feecb56297fd2f5b525d4ac47';
  const area = {
    tokyo: {
      id: 1850147,
      name: '東京都',
      q: 'Tokyo',
    },
    osaka: {
      id: 1853909,
      name: '大阪府',
      q: 'Osaka',
    }
  }

  const promises = Object.values(area).map(areaData => {
    const cityName = areaData.name;
    const cityQuery = areaData.q;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityQuery}&appid=${appKey}`;

    return fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const weatherArr = data.weather;
        const weather = weatherArr[0]['main'];
        const icon = `<img src="https://openweathermap.org/img/wn/${weatherArr[0]['icon']}@2x.png">`;
        const temp = `${Math.round(data.main.temp - 273.16)} ℃`;
        const wind =`${data.wind.speed} (m/s)` ;
      
        return { cityName, weather, icon, temp, wind };
      });
  });
  
  const results = await Promise.all(promises);
  const weatherData = {};
  results.forEach(result => {
    const { cityName, weather, icon, temp, wind } = result;
    weatherData[cityName] = { weather, icon, temp, wind };
  });

  return weatherData;
}

export async function fetchWeatherData() {
  let html = '';
  const weatherHTML = document.getElementById('weather-html');
  const weatherData = await Weather();
  for( const [cityName, weatherDataItem] of Object.entries(weatherData) ) {
    html += `
      <div class="p-2 w-50 border border-info">
      <h5>${cityName}の天気</h5>
      `;
    for( const [key, value] of Object.entries(weatherDataItem) ) {
      html += `
        <dl class="row">
          <dt class="col">${key}</dt><dd class="col">${value}</dd>
        </dl>`;
    }
    html += `</div>`;
  }
  weatherHTML.innerHTML = html;
}