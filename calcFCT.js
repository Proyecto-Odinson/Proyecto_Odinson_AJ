
<button id="calc" disabled>Calcular</button>

// CALCULAR DIAS FCT

const calcBtn = document.querySelector('#calc');

calcBtn.addEventListener('click', () => {


    const dayList = getDaysArray(startDate, endDate);
    const dayListIso = dayList.map(v => v.toISOString().slice(0,10));


    let number_days = dayList.length;

    for(let date of dayListIso) {
        const dateParts = date.split('-');
        const day = dateParts[2];
        const month = dateParts[1];

        const festivo = festivos.find(f => f.dia == day && f.mes == month);

        if(isWeekend(new Date(date)) || festivo) {
            number_days--;
        }
    }

     console.log(number_days, dayListIso.length);
})