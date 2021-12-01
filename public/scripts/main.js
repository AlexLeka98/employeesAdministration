const drivers = [
    { name: 'Alex', surname: 'Leka', age: '23', nationality: 'Albanian', euro: '15', receive: '17' },
    { name: 'Mario', surname: 'Leka', age: '24', nationality: 'Albanian', euro: '13', receive: '15' },
    { name: 'Alex', surname: 'Tsara', age: '24', nationality: 'Albanian', euro: '16', receive: '18' },
    { name: 'Usni', surname: 'Nojokepls', age: '38', nationality: 'Morocco', euro: '17', receive: '19' },
    { name: 'Mark', surname: 'Jokes', age: '38', nationality: 'Morocco', euro: '17', receive: '19' },
]


const driversSelector = document.querySelectorAll('.driver');
const listSelector = document.querySelectorAll('li');
// console.log(listSelector[1].innerText);

for (var i = 0; i < driversSelector.length; i++) {
    driversSelector[i].innerText = `${drivers[i].name} ${drivers[i].surname}`;
}

for (let driver of driversSelector) {
    driver.addEventListener('click', () => {

        driver.parentElement.classList.toggle('listToggleColor');
        driver.nextElementSibling.classList.toggle('showForm');
    })
}

const payments = document.querySelectorAll(".payment");

for (var i = 0; i < payments.length; i++) {
    payments[i].innerText = `${drivers[i].euro} €/h`;
}






let ALL_PAYMENTS = [];
let ALL_RECIEVES = [];
let TOTAL_INCOME = [];
const getData = () => {
    const startTime = document.querySelectorAll('#startingTime');
    const finishTime = document.querySelectorAll('#finishTime');
    const total_money = document.querySelectorAll(".total__money");
    const btw = document.querySelectorAll(".btw");
    const bruto = document.querySelectorAll(".bruto");
    for (let i = 0; i < startTime.length; i++) {
        let start = [parseInt(startTime[i].value.slice(0, 2)), parseInt(startTime[i].value.slice(3, 5))];
        let finish = [parseInt(finishTime[i].value.slice(0, 2)), parseInt(finishTime[i].value.slice(3, 5))];
        let time = 0;
        let timeFun = () => {
            if (start[1] > finish[1]) {
                minutes = 60 - (start[1] - finish[1]);
                minutes = minutes + (finish[0] - start[0] - 1) * 60
            }
            else {
                minutes = finish[1] - start[1]
                minutes = minutes + (finish[0] - start[0]) * 60;
            }
            minutes = minutes / 60;
            return minutes;
        }
        time = timeFun();
        const totalMoney1 = time * parseInt(drivers[i].euro);
        const totalMoney2 = time * parseInt(drivers[i].receive);
        const payment1 = [(totalMoney1).toFixed(2), (totalMoney1 * 0.21).toFixed(2), (totalMoney1 * 0.21 + totalMoney1).toFixed(2)]
        const payment2 = [(totalMoney2).toFixed(2), (totalMoney2 * 0.21).toFixed(2), (totalMoney2 * 0.21 + totalMoney2).toFixed(2)]
        total_money[i].innerText = `Total Money: ${payment1[0]} €`;
        btw[i].innerText = `BTW: ${payment1[1]} €`;
        bruto[i].innerText = `Bruto: ${payment1[2]} €`;

        ALL_PAYMENTS.push({
            'clean': payment1[0],
            'btw': payment1[1],
            'bruto': payment1[2]
        });
        ALL_RECIEVES.push({
            'clean': payment2[0],
            'btw': payment2[1],
            'bruto': payment2[2]
        });
        TOTAL_INCOME.push({
            'clean': payment2[0] - payment1[0],
            'btw': payment2[1] - payment1[1],
            'bruto': payment2[2] - payment1[2]
        })
    }
    

    let total_daily_income = {
        'clean': 0,
        'btw': 0,
        'bruto': 0
    };
    for (let i = 0; i < TOTAL_INCOME.length; i++) {
        if (!Number.isNaN(TOTAL_INCOME[i].clean)) {
            total_daily_income.clean += TOTAL_INCOME[i].clean;
            total_daily_income.btw += TOTAL_INCOME[i].btw;
            total_daily_income.bruto += TOTAL_INCOME[i].bruto;
        }
    }
    total_daily_income.clean = total_daily_income.clean.toFixed(2);
    total_daily_income.btw = total_daily_income.btw.toFixed(2);
    total_daily_income.bruto = total_daily_income.bruto.toFixed(2);
    
    console.log("All Payments: ",ALL_PAYMENTS);
    console.log("All Recievers ",ALL_RECIEVES);
    console.log("All Income ",TOTAL_INCOME);
    console.log("Total daily income: ",total_daily_income);
}


