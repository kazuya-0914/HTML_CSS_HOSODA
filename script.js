import { fetchWeatherData } from "./app.js"; 
let html = '';
const domCode = document.getElementById('dom-code');

// ----- 教材コード



// -----

domCode.innerHTML = html;
fetchWeatherData();

const resetBtn = document.getElementById('reset-btn');
resetBtn.addEventListener('click', () => {
  location.reload();
});