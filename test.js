// Date.prototype.addDays = function(days) {
//     let date = new Date(this.valueOf());
//     date.setDate(date.getDate() + days);
//     return date;
// }

// let date = new Date();
// let days = [];
// for (let i = 0; i < 7; i++) {
//     let day = String(date.addDays(i).getDate()).padStart(2, "0");
//     let mm = String(date.addDays(i).getMonth()+1).padStart(2, "0");
//     let yyyy = String(date.addDays(i).getFullYear())
//     days.push(yyyy + '-' + mm + '-' + day);
// }
// console.log(days);

const apikey = "7a2be0d69c2a36ca11b9c1e0b03da7a1";

const urlHours = (city) =>
  `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apikey}`;
async function getWeatherByLocation(city) {
  const respDays = await fetch(urlHours(city), {
    origin: "cors",
  });

  let jsonStr = await respDays.json();

  console.log(jsonStr);
  test(jsonStr);
}

function test(jsonStr) {
  let obj = JSON.parse(jsonStr);

  var myDate = "2/16/2017"; // change it in m/d/yyyy format

  let filteredResult = obj.list.filter(
    (item) => new Date(item.dt * 1000).toLocaleDateString() === myDate
  );

  if (filteredResult && filteredResult.length) {
    console.log("Max: " + filteredResult[0].temp.max);
    console.log("Min: " + filteredResult[0].temp.min);

    console.log("Filtered Result: ", filteredResult);
  }
}
let cidade = "Barcelos";
getWeatherByLocation(cidade);
