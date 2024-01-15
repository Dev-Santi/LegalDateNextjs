'use client';

import { type day } from '@/calendar/functions';
import calendar from '@/calendar/calendar';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Swal from 'sweetalert2';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { parse } from 'path';

export default function page() {
    const { data: session }: any = useSession();
    const [currentMonth, setCurrentMonth] = useState(calendar.years[1].months[0]);
    const currentYear = currentMonth.days[0].date.split('-')[0];

    let savedDates: Array<string>;
    try {
        if (session) {
            savedDates = session.user.savedDates;
        }
    } catch (e) {
        console.log(e);
    }

    //Funcion para agregar una fecha al calendario del usuario
    async function addDate(date: string) {
        try {
            const addDateResponse = await axios.put('/api/saveDate', {
                user: session?.user,
                date: date,
            });
        } catch (e) {
            console.log(e);
        }
    }

    //Obtener el último mes visto anteriormente, guardado en Local storage.
    useEffect(() => {
        try {
            const localStorageCurrentMonth = localStorage.getItem('currentMonth');

            if (localStorageCurrentMonth) {
                setCurrentMonth(JSON.parse(localStorageCurrentMonth));
            }
        } catch (e) {
            console.log('Error obteniendo último mes visualizado en el local storage');
        }
    }, []);

    function handleChangeYear(nextOrPrevious: 1 | -1) {
        const nextYearNumber = (
            parseInt(currentMonth.days[0].date.split('-')[0]) + nextOrPrevious
        ).toString();

        const newYear = calendar.years.find((year) => {
            return year.yearNumber == nextYearNumber;
        });

        let newCurrentMonth;
        if (newYear) {
            if (nextOrPrevious == 1) {
                newCurrentMonth = newYear.months[0];
            } else if (nextOrPrevious == -1) {
                newCurrentMonth = newYear.months[11];
            }
        }

        if (newCurrentMonth) {
            try {
                localStorage.setItem('currentMonth', JSON.stringify(newCurrentMonth));
            } catch (e) {
                console.log(
                    'Error al intentar guardar último mes visualizado en el local storage'
                );
            }
            setCurrentMonth(newCurrentMonth);
        }
    }

    function handleChangeMonth(nextOrPrevious: 1 | -1) {
        let year = calendar.years.find((year) => {
            return year.yearNumber == currentYear;
        });

        let currentMonthIndex;
        if (year) {
            currentMonthIndex = year.months.findIndex((month) => {
                return currentMonth.monthName == month.monthName;
            });
        }

        if (
            nextOrPrevious == 1 &&
            year &&
            currentMonthIndex != undefined &&
            currentMonthIndex < 11
        ) {
            try {
                localStorage.setItem(
                    'currentMonth',
                    JSON.stringify(year.months[currentMonthIndex + nextOrPrevious])
                );
            } catch (e) {
                console.log(
                    'Error al intentar guardar último mes visualizado en el local storage'
                );
            }
            setCurrentMonth(year.months[currentMonthIndex + nextOrPrevious]);
        } else if (
            nextOrPrevious == -1 &&
            year &&
            currentMonthIndex != undefined &&
            currentMonthIndex > 0
        ) {
            try {
                localStorage.setItem(
                    'currentMonth',
                    JSON.stringify(year.months[currentMonthIndex + nextOrPrevious])
                );
            } catch (e) {
                console.log(
                    'Error al intentar guardar último mes visualizado en el local storage'
                );
            }
            setCurrentMonth(year.months[currentMonthIndex + nextOrPrevious]);
        }
    }

    return (
        <main className='flex mt-12 md:mt-24 justify-center items-center flex-col text-white'>
            <div className='min-w-[21rem] w-full scale-90 md:scale-100 md:w-[45rem] h-fit bg-gray-900 shadow-xl rounded-xl overflow-hidden pb-2'>
                {/* Año */}
                <div className='flex'>
                    <button
                        onClick={() => {
                            handleChangeYear(-1);
                        }}
                        className='px-5 hover:text-orange'
                    >
                        <FaArrowLeft />
                    </button>
                    <h2 className='bg-gray-700 w-full py-2 text-center text-3xl border-b-2 border-gray-500'>
                        {currentYear}
                    </h2>
                    <button
                        onClick={() => {
                            handleChangeYear(1);
                        }}
                        className='px-5 hover:text-orange'
                    >
                        <FaArrowRight />
                    </button>
                </div>

                {/* Mes */}
                <div className='flex'>
                    <button
                        onClick={() => {
                            handleChangeMonth(-1);
                        }}
                        className='px-5 hover:text-orange'
                    >
                        <FaArrowLeft />
                    </button>
                    <h2 className='bg-gray-700 w-full py-2 text-center text-3xl border-b-2 border-gray-500'>
                        {currentMonth.monthName}
                    </h2>
                    <button
                        onClick={() => {
                            handleChangeMonth(1);
                        }}
                        className='px-5 hover:text-orange'
                    >
                        <FaArrowRight />
                    </button>
                </div>

                {/* Casillas */}
                <div className='grid text-center grid-cols-7'>
                    <CellHeaders />
                    {alocateEmptyDivsUntilFirstDay(currentMonth.days[0])}
                    {currentMonth.days.map((day) => {
                        //Por cada dia retorna la celda correspondiente
                        return <Cell key={day.date} day={day} savedDates={savedDates} />;
                    })}
                </div>
            </div>
            <Legend />
        </main>
    );
}

function CellHeaders() {
    return (
        <>
            {/* Desktop */}
            <span className='hidden md:block text-sm md:text-base py-3'>Lunes</span>
            <span className='hidden md:block text-sm md:text-base py-3'>Martes</span>
            <span className='hidden md:block text-sm md:text-base py-3'>Miércoles</span>
            <span className='hidden md:block text-sm md:text-base py-3'>Jueves</span>
            <span className='hidden md:block text-sm md:text-base py-3'>Viernes</span>
            <span className='hidden md:block text-sm md:text-base py-3'>Sábado</span>
            <span className='hidden md:block text-sm md:text-base py-3'>Domingo</span>
            {/* Mobile */}
            <span className='md:hidden text-sm md:text-base py-2'>Lun</span>
            <span className='md:hidden text-sm md:text-base py-2'>Mar</span>
            <span className='md:hidden text-sm md:text-base py-2'>Mie</span>
            <span className='md:hidden text-sm md:text-base py-2'>Jue</span>
            <span className='md:hidden text-sm md:text-base py-2'>Vie</span>
            <span className='md:hidden text-sm md:text-base py-2'>Sáb</span>
            <span className='md:hidden text-sm md:text-base py-2'>Dom</span>
        </>
    );
}

function Cell({ day, savedDates }: { day: day; savedDates: any }) {
    let parseSavedDates = [...savedDates];

    function Prueba() {
        if (parseSavedDates) {
            console.log(parseSavedDates.includes(day.date));
            return (
                <span className='w-6 h-6 block text-white'>
                    {parseSavedDates.includes(day.date) ? 'A' : ''}
                </span>
            );
        } else {
            return null;
        }
    }

    return (
        <div
            key={day.date}
            className='bg-gray-900 relative text-xl flex flex-col items-center justify-center h-[3.2rem] md:h-[5rem]'
        >
            {/* Numero del día y color especial si es feria judicial */}
            <span
                className={
                    day.isJudicialVacation
                        ? 'text-orange'
                        : ['Sabado', 'Domingo'].includes(day.name)
                        ? 'text-gray-400'
                        : ''
                }
            >
                {day.date.split('-')[2]}
                <Prueba />
            </span>

            {/* Si es feriado: */}
            {day.holiday && (
                <span
                    onClick={() =>
                        typeof day.holiday == 'object' &&
                        Swal.fire({
                            title: day.holiday.description,
                            confirmButtonColor: '#f87171',
                        })
                    }
                    className='hover:text-red-200 cursor-pointer absolute mt-10 text-red-400 text-[0.75rem]'
                >
                    Feriado
                </span>
            )}
        </div>
    );
}

function Legend() {
    return (
        <div className='bg-gray-900 hidden md:flex relative text-base md:text-xl flex-col rounded-xl rounded-t-none'>
            <h2 className='text-center mt-2'>Referencias</h2>
            <div className='flex items-center gap-5 px-6 py-3'>
                <h2 className='flex justify-center w-16'>
                    <div className='bg-orange p-2 w-fit rounded-full'></div>
                </h2>
                <FaArrowRight className='text-sm' />
                <h2>Feria Judicial</h2>
            </div>
            <div className='flex items-center gap-5 px-6 py-3'>
                <h2
                    onClick={() =>
                        Swal.fire({
                            title: 'Descripción del feriado',
                            confirmButtonColor: '#f87171',
                        })
                    }
                    className='text-red-400 w-16 cursor-pointer hover:text-red-200'
                >
                    Feriado
                </h2>
                <FaArrowRight className='text-sm' />
                <h2>Click para ver</h2>
            </div>
        </div>
    );
}

//Funcion para renderizar espacios en blanco antes del primer día del mes
function alocateEmptyDivsUntilFirstDay(day: day) {
    const emptyDays: any = [];
    const names = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];

    for (let i = 0; i < 7; i++) {
        if (day.name == names[i]) {
            return emptyDays;
        } else {
            emptyDays.push(
                <div
                    key={i}
                    className='bg-gray-900 relative text-xl flex flex-col items-center justify-center h-[3.2rem] md:h-[5rem]'
                ></div>
            );
        }
    }
}
