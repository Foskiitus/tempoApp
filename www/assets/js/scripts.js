// 7a2be0d69c2a36ca11b9c1e0b03da7a1
const apikey = "7a2be0d69c2a36ca11b9c1e0b03da7a1";

const mainTemp = document.querySelector(".text .temp");
const form = document.getElementById("form");
const search = document.getElementById("search");

const urlNow = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;

const urlHours = (city) =>
  `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apikey}`;

async function getWeatherByLocation(city) {
  const resp = await fetch(urlNow(city), {
    origin: "cors",
  });
  const respDays = await fetch(urlHours(city), {
    origin: "cors",
  });

  const respData = await resp.json();
  const daysWeather = await respDays.json();
  //console log
  // console.log(respData);
  // console.log(daysWeather);
  // Fim console log
  addWeatherToPage(respData);
  populateCityName(respData.name);
  populateEstado(respData.weather[0].icon);
  hoursWeather(daysWeather);
  tempoNextDays(daysWeather);
  salvarCidade(city);
}
//caputura nome ciade
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const city = search.value;

  if (city) {
    getWeatherByLocation(city);
  }
});
// Icon grande topo + Descrição
function populateEstado(icon) {
  // console.log(icon);
  const estado = document.querySelector(".text .estado");
  const mainImg = document.querySelector(".top > .info");
  let desc = getWeatherDesc(icon);
  let getIcon = getWeatherIcon(icon);

  mainImg.innerHTML = "";

  estado.innerText = "";

  if (icon === "01n") {
    estado.innerText = desc;
    mainImg.innerHTML = `<img src="${getIcon}" alt="${desc}" class="img-tempo sun"/>`;
  } else if (icon === "01d") {
    estado.innerText = desc;
    mainImg.innerHTML = `<img src="${getIcon}" alt="${desc}" class="img-tempo sun"/>`;
  } else if (icon === "02n" || icon === "02d") {
    estado.innerText = desc;
    mainImg.innerHTML = `<img src="${getIcon}" alt="${desc}" class="img-tempo" />`;
  } else if (icon === "03n" || icon === "03d") {
    estado.innerText = desc;
    mainImg.innerHTML = `<img src="${getIcon}" alt="${desc}" class="img-tempo" />`;
  } else if (icon === "04n" || icon === "04d") {
    estado.innerText = desc;
    mainImg.innerHTML = `<img src="${getIcon}" alt="${desc}" class="img-tempo" />`;
  } else if (icon === "09n" || icon === "09d") {
    estado.innerText = desc;
    mainImg.innerHTML = `<img src="${getIcon}" alt="${desc}" class="img-tempo" />`;
  } else if (icon === "10n" || icon === "10d") {
    estado.innerText = desc;
    mainImg.innerHTML = `<img src="${getIcon}" alt="${desc}" class="img-tempo" />`;
  } else if (icon === "11n" || icon === "11d") {
    estado.innerText = desc;
    mainImg.innerHTML = `<img src="${getIcon}" alt="${desc}" class="img-tempo" />`;
  } else if (icon === "13n" || icon === "13d") {
    estado.innerText = desc;
    mainImg.innerHTML = `<img src="${getIcon}" alt="${desc}" class="img-tempo" />`;
  } else if (icon === "50n" || icon === "50d") {
    estado.innerText = desc;
    mainImg.innerHTML = `<imgsrc="${getIcon}" alt="${desc}" class="img-tempo" />`;
  }
}
//Nome Grande cidade
function populateCityName(city) {
  if (city.includes("Municipality")) {
    const cityName = document.querySelector(".city-name");
    cityName.innerText = "";
    cityName.innerText = city.replace("Municipality", "");
  } else {
    const cityName = document.querySelector(".city-name");
    cityName.innerText = "";
    cityName.innerText = city;
  }
}
// Temperatura atual
function addWeatherToPage(data) {
  const temp = data.main.temp.toFixed(0);

  //cleanup
  mainTemp.innerHTML = "";

  mainTemp.innerText = temp + " ºC";

  //   mainTemp.appendChild(weather);
}

function hoursWeather(list) {
  const estadoCard = document.querySelector(".estadohoras");
  estadoCard.innerHTML = "";
  const valueList = list.list;

  for (const key in valueList) {
    const dataHora = valueList[key].dt_txt.split(" ");
    const horaCompleta = dataHora[1].split(":");
    const hora = horaCompleta[0];
    const temp = valueList[key].main.temp.toFixed(0);
    const weatherIcon = valueList[key].weather[0].icon;
    // console.log(valueList[key].weather);
    let icon = getWeatherIcon(weatherIcon);
    estadoCard.innerHTML += `
    <div class="mini-cards">
            <img src="${icon}" alt="" />
            <p class="temp">${temp}ºC</p>
            <p class="hora">${hora}H</p>
          </div>
    `;
  }
}

function getWeatherIcon(icon) {
  if (icon === "01n") {
    tempo = `./assets/img/icons/night.svg`;
  } else if (icon === "01d") {
    tempo = `./assets/img/icons/day.svg`;
  } else if (icon === "02n" || icon === "02d") {
    tempo = `./assets/img/icons/cloudy-day-1.svg`;
  } else if (icon === "03n" || icon === "03d") {
    tempo = `./assets/img/icons/cloudy-day-3.svg`;
  } else if (icon === "04n" || icon === "04d") {
    tempo = `./assets/img/icons/cloudy.svg`;
  } else if (icon === "09n" || icon === "09d") {
    tempo = `./assets/img/icons/rainy-1.svg`;
  } else if (icon === "10n" || icon === "10d") {
    tempo = `./assets/img/icons/rainy-2.svg`;
  } else if (icon === "11n" || icon === "11d") {
    tempo = `./assets/img/icons/thunder.svg`;
  } else if (icon === "13n" || icon === "13d") {
    tempo = `./assets/img/icons/snowy-6.svg`;
  } else if (icon === "50n" || icon === "50d") {
    tempo = `./assets/img/icons/cloudy-day-1.svg`;
  }
  return tempo;
}
function getWeatherDesc(icon) {
  if (icon === "01n") {
    tempo = `Céu Limpo`;
  } else if (icon === "01d") {
    tempo = `Céu Limpo`;
  } else if (icon === "02n" || icon === "02d") {
    tempo = `Céu Pouco Nublado`;
  } else if (icon === "03n" || icon === "03d") {
    tempo = `Céu Parcialmente Nublado`;
  } else if (icon === "04n" || icon === "04d") {
    tempo = `Céu Muito Nublado`;
  } else if (icon === "09n" || icon === "09d") {
    tempo = `Aguaceiros`;
  } else if (icon === "10n" || icon === "10d") {
    tempo = `Chuva`;
  } else if (icon === "11n" || icon === "11d") {
    tempo = `Trovoada`;
  } else if (icon === "13n" || icon === "13d") {
    tempo = `Neve`;
  } else if (icon === "50n" || icon === "50d") {
    tempo = `Nevoeiro ou nuvens baixas`;
  }
  return tempo;
}

function getWeekDay(day) {
  let weekDay;
  if (day === 0) weekDay = "Domingo";
  if (day === 1) weekDay = "Segunda";
  if (day === 2) weekDay = "Terça";
  if (day === 3) weekDay = "Quarta";
  if (day === 4) weekDay = "Quinta";
  if (day === 5) weekDay = "Sexta";
  if (day === 6) weekDay = "Sabado";
  return weekDay;
}

function getWeatherIconForList(icon) {
  if (icon === "01n") {
    tempo = `moon`;
  } else if (icon === "01d") {
    tempo = `sun`;
  } else if (icon === "02n" || icon === "02d") {
    tempo = `pouconublado`;
  } else if (icon === "03n" || icon === "03d") {
    tempo = `parcialnublado`;
  } else if (icon === "04n" || icon === "04d") {
    tempo = `muitonublado`;
  } else if (icon === "09n" || icon === "09d") {
    tempo = `chuviscos`;
  } else if (icon === "10n" || icon === "10d") {
    tempo = `chuva`;
  } else if (icon === "11n" || icon === "11d") {
    tempo = `trevoada`;
  } else if (icon === "13n" || icon === "13d") {
    tempo = `neve`;
  } else if (icon === "50n" || icon === "50d") {
    tempo = `muitonublado`;
  }
  return tempo;
}
/************      TESTES        *******************/
/* Lista estado-dias*/
function tempoNextDays(list) {
  const lines = document.getElementById("lines");
  lines.innerHTML = "";
  const valueList = list.list;

  Date.prototype.addDays = function (days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  let date = new Date();
  let days = [];
  let weekDays = [];
  for (let i = 0; i <= 5; i++) {
    let dd = String(date.addDays(i).getDate()).padStart(2, "0");
    let mm = String(date.addDays(i).getMonth() + 1).padStart(2, "0");
    let yyyy = String(date.addDays(i).getFullYear());
    let day = Number(date.addDays(i).getDay());
    days.push(yyyy + "-" + mm + "-" + dd);
    let diaSemana = getWeekDay(day);
    weekDays.push(diaSemana);
  }
  console.log(weekDays);

  let diasSemana;
  for (const key in days) {
    let minTemp = [];
    let maxTemp = [];
    let icons = [];
    let dia = days[key];
    for (const i in valueList) {
      const dataHora = valueList[i].dt_txt.split(" ");
      const data = dataHora[0];
      diasSemana = weekDays[key];
      if (dia === data) {
        let iconFreq = valueList[i].weather[0].icon;
        let min = valueList[i].main.temp_min.toFixed(0);
        let max = valueList[i].main.temp_max.toFixed(0);
        minTemp.push(min);
        maxTemp.push(max);
        icons.push(iconFreq);
      }
    }
    console.log(diasSemana);
    console.log(icons);
    /* GET THE MOST FREQUENT ICON OF DAY */
    if (icons.length === 1) {
      item = icons[0];
    } else {
      var mf = 1;
      var m = 0;
      var item;
      for (var i = 0; i < icons.length; i++) {
        for (var j = i; j < icons.length; j++) {
          if (icons[i] == icons[j]) m++;
          if (mf < m) {
            mf = m;
            item = icons[i];
          }
        }
        m = 0;
      }
    }
    console.log(item);
    descTempo = getWeatherDesc(item);
    icon = getWeatherIconForList(item);

    //     let icon = getWeatherIcon(weatherIcon);
    /* GET THE MOST FREQUENT ICON OF DAY */
    let minimo = Math.min(...minTemp);
    console.log();
    let maximo = Math.max(...maxTemp);
    lines.innerHTML += `
      <div class="estado-dias hoverable">
        <div class="img-background">
          <i class="imgtempo ${icon}"> </i> 
        </div>
        <p class="dia-tempo">
          <span class="titulo-dia">${diasSemana}</span>
          <span class="estadotempo">${descTempo}</span>
        </p>
        <p class="maxmin">
          <span class="max">Max. ${maximo}ºC</span><br /><span class="min"
            >Min. ${minimo}ºC</span
          >
        </p>

        <img src="./assets/img/arrow_right.svg" alt="" class="imgright" />
      </div>
    `;
  }
}

// function tempoNextDays(list) {
//   console.log(days);
//   console.log(weekDays);

//   for (const key in valueList) {
//     const dataHora = valueList[key].dt_txt.split(" ");
//     const horaCompleta = dataHora[1].split(":");
//     const data = dataHora[0];
//     let minTemp = [];
//     let maxTemp = [];
//     if (data === days[0]) {
//       let min = valueList[key].main.temp_min.toFixed(0);
//       let max = valueList[key].main.temp_max.toFixed(0);
//       minTemp.push(min);
//       maxTemp.push(max);
//       console.log(minTemp);
//     }
//     const weatherIcon = valueList[key].weather[0].icon;
//     let icon = getWeatherIcon(weatherIcon);
//     // console.log(valueList[key].weather);
//     let diaSemana;
//     lines.innerHTML += `
//     <div class="estado-dias hoverable">
//       <div class="img-background">
//         <i class="imgtempo sun"> </i>
//       </div>
//       <p class="dia-tempo">
//         <span class="titulo-dia">${diaSemana}</span>
//         <span class="estadotempo">Sol</span>
//       </p>
//       <p class="maxmin">
//         <span class="max">Max. 24ºC</span><br /><span class="min"
//           >Min. 15ºC</span
//         >
//       </p>

//       <img src="./assets/img/arrow_right.svg" alt="" class="imgright" />
//     </div>
//   `;
//   }

/************      FIM TESTES        *******************/

/* Armazenar ultima cidade pesquisada */
function salvarCidade(city) {
  const cidadeJSON = JSON.stringify(city);
  localStorage.setItem("cidade", cidadeJSON);
}
/* Ler ultima cidade pesquisada */
function adicionaCidadeSalva() {
  const cidadeList = localStorage.getItem("cidade");
  const cidade = JSON.parse(cidadeList);
  if (cidade) {
    getWeatherByLocation(cidade);
  } else {
    getWeatherByLocation("Lisbon");
  }
}
adicionaCidadeSalva();

function dailyWeather() {}
