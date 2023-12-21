import calendar from './calendar';

export function calculateDateWithoutHolidays(dateSelected: string, countString: string) {
    let count = parseInt(countString);
    let found = false;

    for (let k = 0; k < calendar.years.length; k++) {
        const currentYear = calendar.years[k];

        for (let i = 0; i < 12; i++) {
            const currentMonth = currentYear.months[i];

            for (let j = 0; j < currentMonth.days.length; j++) {
                const currentDay = currentMonth.days[j];

                //Filters that omits days
                if (
                    found &&
                    !currentDay.holiday &&
                    !['Sabado', 'Domingo'].includes(currentDay.name) &&
                    !currentDay.isJudicialVacation
                ) {
                    count--;
                }

                //When the term is over, returns the date
                if (count == 0) {
                    return `${currentDay.name} ${currentDay.date.split('-')[2]} de ${
                        currentMonth.monthName
                    } de ${currentYear.yearNumber}`;
                }

                // Search for the date selected at the end to start the countdown in the next legal day
                if (!found && dateSelected == currentDay.date) {
                    found = true;
                }
            }
        }
    }

    //Si no se ha encontrado una fecha, es porque son valores que no deberian utilizarse
    return 'Valores invalidos';
}
