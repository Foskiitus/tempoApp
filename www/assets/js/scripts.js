// 7a2be0d69c2a36ca11b9c1e0b03da7a1
const apikey = "7a2be0d69c2a36ca11b9c1e0b03da7a1";
const title = document.title;
const mainTemp = document.querySelector(".text .temp");
const form = document.getElementById("form");
const search = document.getElementById("search");
var respData;
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

  respData = await resp.json();
  const daysWeather = await respDays.json();
  addWeatherToPage(respData);
  populateCityName(respData.name);
  populateEstado(respData.weather[0].icon);
  hoursWeather(daysWeather);
  tempoNextDays(daysWeather);
  salvarCidade(city);
  getProbabilidadeChuva(daysWeather.list[0].pop);
}
// Convert Timestamp to Date
function timestampToDate(t) {
  var sec = t;
  var date = new Date(sec * 1000);
  var timestr = date.toLocaleTimeString();
  return timestr;
}

// get probabilidade de chuva

function getProbabilidadeChuva(proba) {
  proba = proba * 100;
  const prob = document.querySelector(".text > .prob");
  prob.innerHTML = '<i class="fas fa-umbrella"></i>';
  prob.innerHTML += " " + proba + "%";
}
if (form === null) {
} else {
  //caputura nome ciade
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const city = search.value;

    if (city) {
      hideKeyboard();
      getWeatherByLocation(city);
    }
  });
}
// Icon grande topo + Descrição
function populateEstado(icon) {
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
    const data = dataHora[0];
    const dia = data.split("-");
    const hora = horaCompleta[0];
    const temp = valueList[key].main.temp.toFixed(0);
    const weatherIcon = valueList[key].weather[0].icon;
    const icon = getWeatherIcon(weatherIcon);
    estadoCard.innerHTML += `
    <div class="mini-cards">
      <p class="dia"><i class="far fa-calendar-alt"></i>${dia[2]}/${dia[1]}</p>
      <img src="${icon}" alt="" />
      <p class="temp">${temp}ºC</p>
      <p class="hora">${hora}H</p>
    </div>
    `;
  }
}

/*    Get Estado do tempo por dia      */
// function hoursWeatherByDay(list, dia) {
//   const Card = document.querySelector(".content .cards");
//   Card.innerHTML = "";
//   const valueList = list.list;

//   for (const key in valueList) {
//     const dataHora = valueList[key].dt_txt.split(" ");
//     const horaCompleta = dataHora[1].split(":");
//     const data = dataHora[0];
//     const dia = data.split("-");
//     const hora = horaCompleta[0];
//     const temp = valueList[key].main.temp.toFixed(0);
//     const weatherIcon = valueList[key].weather[0].icon;
//     const icon = getWeatherIcon(weatherIcon);
//     Card.innerHTML += `
//     <div class="mini-cards">
//       <p class="dia"><i class="far fa-calendar-alt"></i>${dia[2]}/${dia[1]}</p>
//       <img src="${icon}" alt="" />
//       <p class="temp">${temp}ºC</p>
//       <p class="hora">${hora}H</p>
//     </div>
//     `;
//   }
// }

function getWeatherIcon(icon) {
  let tempo;
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
  let tempo;
  if (icon === "01n") {
    tempo = `Céu Limpo`;
  } else if (icon === "01d") {
    tempo = `Céu Limpo`;
  } else if (icon === "02n" || icon === "02d") {
    tempo = `Céu Pouco Nublado`;
  } else if (icon === "03n" || icon === "03d") {
    tempo = `Parcialmente Nublado`;
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
  let tempo;
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
function getEstadoDoVento(velocidade) {
  let vento;
  if (velocidade <= 6) {
    vento = "Calmo";
  } else if (velocidade <= 15) {
    vento = "Vento Fraco";
  } else if (velocidade <= 35) {
    vento = "Vento Moderado";
  } else if (velocidade <= 55) {
    vento = "Vento Forte";
  } else if (velocidade <= 75) {
    vento = "Vento Muito Forte";
  } else if (velocidade > 75) {
    vento = "Vento Excep. Forte";
  }
  return vento;
}

function converterDegrausEmDirecoes(d) {
  // Insert the amount of degrees here
  degrees = d;

  // Define array of directions
  directions = ["N", "NE", "E", "SE", "S", "SO", "O", "NO"];

  // Split into the 8 directions
  degrees = (degrees * 8) / 360;

  // round to nearest integer.
  degrees = Math.round(degrees, 0);

  // Ensure it's within 0-7
  degrees = (degrees + 8) % 8;

  return directions[degrees];
}

/************      TESTES        *******************/

/* GET THE MOST FREQUENT ICON OF DAY */
function getMoreFrequent(arr) {
  return arr
    .sort(
      (a, b) =>
        arr.filter((v) => v === a).length - arr.filter((v) => v === b).length
    )
    .pop();
}

/* Lista estado-dias*/
function tempoNextDays(list) {
  const line = document.getElementById("accordion");
  line.innerHTML = "";
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

  let diasSemana;
  for (const key in days) {
    let minTemp = [];
    let maxTemp = [];
    let icons = [];
    let dia = days[key];
    let dadosParaCartoes = [];
    let vento;
    let velocidadeDoVento;
    let temperatura;
    let dirVento;
    let humidade;
    let possibilidadeChuva;
    for (const i in valueList) {
      const dataHora = valueList[i].dt_txt.split(" ");
      const data = dataHora[0];
      const hora = dataHora[1].split(":");
      let horas = hora[0];
      diasSemana = weekDays[key];
      if (dia === data) {
        let iconFreq = valueList[i].weather[0].icon;
        let min = valueList[i].main.temp_min.toFixed(0);
        let max = valueList[i].main.temp_max.toFixed(0);
        temperatura = valueList[i].main.temp;
        humidade = valueList[i].main.humidity;
        let getVento = valueList[i].wind.speed;
        velocidadeDoVento = Math.ceil(getVento * 3.6);
        let direcaoDoVento = valueList[i].wind.deg;
        dirVento = converterDegrausEmDirecoes(direcaoDoVento);
        vento = getEstadoDoVento(velocidadeDoVento);
        possibilidadeChuva = valueList[i].pop * 100;
        minTemp.push(min);
        maxTemp.push(max);
        icons.push(iconFreq);
        // hoursWeatherByDay(dia);
        let icon = getWeatherIcon(iconFreq);
        dadosParaCartoes.push([temperatura, icon, horas]);
      }
    }
    if (icons.length === 0) icons.push(respData.weather[0].icon);
    if (minTemp.length === 0) minTemp.push(respData.main.temp_min.toFixed(0));
    if (maxTemp.length === 0) maxTemp.push(respData.main.temp_max.toFixed(0));
    if (humidade === undefined) humidade = respData.main.humidity;
    if (velocidadeDoVento === undefined) {
      velocidadeDoVento = Math.ceil(respData.wind.speed) * 3.6;
      vento = getEstadoDoVento(velocidadeDoVento);
    }
    if (dirVento === undefined) {
      let direcaoDoVento = respData.wind.deg;
      dirVento = converterDegrausEmDirecoes(direcaoDoVento);
    }
    if (possibilidadeChuva === undefined) {
      possibilidadeChuva = 100;
      if (respData.rain === undefined) {
        possibilidadeChuva = 0;
      }
    }
    let item = getMoreFrequent(icons);
    let descTempo = getWeatherDesc(item);
    const icon = getWeatherIconForList(item);

    /* GET THE MOST FREQUENT ICON OF DAY */
    let minimo = Math.min(...minTemp);
    let maximo = Math.max(...maxTemp);

    line.innerHTML += `
      <div class="container">
        <div class="estado-dias hoverable label">
          <div class="img-background">
            <i class="imgtempo ${icon}"></i>
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

          <img src="./assets/img/arrow_right.svg" alt="" class="rotate imgright" />
        </div>
        <div class="content">
          <div class="left">
            <p>Vento</p>
            <p>Humidade</p>
            <p>Possibilidade de Chuva</p>
          </div>
          <div class="right">
            <p>${vento}, ${velocidadeDoVento}Km/h ${dirVento}</p>
            <p>${humidade}%</p>
            <p>${possibilidadeChuva}%</p>
          </div>
          <div class="cards" id="cards${[key]}">
            
          </div>
        </div>
      </div>
    `;

    for (const i in dadosParaCartoes) {
      const id = "cards" + [key];
      const cardsToPost = document.getElementById(id);
      cardsToPost.innerHTML += `
      <div class="micro-cards">
        <p class="temp">${dadosParaCartoes[i][0].toFixed(0)}ºC</p>
        <img src="${dadosParaCartoes[i][1]}" alt="" />
        <p class="hora">${dadosParaCartoes[i][2]}H</p>
      </div>
      `;
    }
  }
  accordion();
}
function hideKeyboard() {
  //this set timeout needed for case when hideKeyborad
  //is called inside of 'onfocus' event handler
  setTimeout(function () {
    //creating temp field
    var field = document.createElement("input");
    field.setAttribute("type", "text");
    //hiding temp field from peoples eyes
    //-webkit-user-modify is nessesary for Android 4.x
    field.setAttribute(
      "style",
      "position:absolute; top: 0px; opacity: 0; -webkit-user-modify: read-write-plaintext-only; left:0px;"
    );
    document.body.appendChild(field);

    //adding onfocus event handler for out temp field
    field.onfocus = function () {
      //this timeout of 200ms is nessasary for Android 2.3.x
      setTimeout(function () {
        field.setAttribute("style", "display:none;");
        setTimeout(function () {
          document.body.removeChild(field);
          document.body.focus();
        }, 14);
      }, 200);
    };
    //focusing it
    field.focus();
  }, 50);
}
/************      FIM TESTES        *******************/

/*  Load Accordion  */

function accordion() {
  const accordion = document.getElementsByClassName("container");

  for (i = 0; i < accordion.length; i++) {
    accordion[i].addEventListener("click", function () {
      this.classList.toggle("active");
    });
  }
}

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

function weatherForTheDay(day) {
  const btnBack = document.getElementById("back");
  btnBack.addEventListener("click", (e) => {
    history.back();
  });
}
