Date.prototype.addDays = function(days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

let date = new Date();
let days = [];
for (let i = 0; i < 7; i++) {
    let day = String(date.addDays(i).getDate()).padStart(2, "0");
    let mm = String(date.addDays(i).getMonth()+1).padStart(2, "0");
    let yyyy = String(date.addDays(i).getFullYear())
    days.push(yyyy + '-' + mm + '-' + day);
}
console.log(days);
