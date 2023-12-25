import calendar from './calendar';

type filters = {
    holidays: boolean;
    turismo: boolean;
    weekend: boolean;
    judicialVacation: boolean;
};

type day = {
    date: string;
    name: string;
    holiday: any;
    isJudicialVacation: boolean;
};

export function calculateDate(dateSelected: string, countString: string, filters: filters) {
    let count = parseInt(countString);

    const validInputs = CheckValidity(dateSelected, count);

    if (!validInputs.isValid) {
        return validInputs.response;
    }

    let found = false;
    for (let k = 0; k < calendar.years.length; k++) {
        const currentYear = calendar.years[k];

        for (let i = 0; i < 12; i++) {
            const currentMonth = currentYear.months[i];

            for (let j = 0; j < currentMonth.days.length; j++) {
                const currentDay = currentMonth.days[j];

                //Filters that omits days
                if (found && applyFilters(currentDay, filters)) {
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

    //Si no se ha encontrado una fecha, es porque son valores que exceden los calendarios
    return 'La fecha se excede de los calendarios disponibles';
}

function CheckValidity(dateSelected: string, count: number) {
    let isValid = true;
    let response = '';

    if (dateSelected == '') {
        isValid = false;
        response = 'Error, ingrese fecha de notificacion de la demanda.';
    } else if (count <= 0) {
        isValid = false;
        response = 'Error, el plazo debe ser igual o mayor a 1 dia.';
    } else if (Number.isNaN(count)) {
        isValid = false;
        response = 'Error, el plazo ingresado no es valido.';
    }

    return { isValid: isValid, response: response };
}

function applyFilters(currentDay: day, filters: filters) {
    let response = true;

    //Holidays
    if (filters.holidays && currentDay.holiday) {
        response = false;
    }

    //Turismo
    if (filters.turismo && currentDay.holiday.description == 'Turismo') {
        response = false;
    }

    //Weekends
    if (filters.weekend && ['Sabado', 'Domingo'].includes(currentDay.name)) {
        response = false;
    }

    //Judicial vacations
    if (filters.judicialVacation && currentDay.isJudicialVacation) {
        response = false;
    }

    return response;
}
