'use client';

import calendar from '@/calendar/calendar';
import Swal from 'sweetalert2';
import { useState } from 'react';

import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

export default function page() {
    const [currentMonth, setCurrentMonth] = useState(calendar.years[1].months[0]);

    const currentYear = currentMonth.days[0].date.split('-')[0];
    const firstDayOfCurrentMonth = currentMonth.days[0];

    function alocateEmptyDivsUntilFirstDay(day: any) {
        const emptyDays: any = [];
        const names = [
            'Lunes',
            'Martes',
            'Miercoles',
            'Jueves',
            'Viernes',
            'Sabado',
            'Domingo',
        ];

        for (let i = 0; i < 7; i++) {
            if (day.name == names[i]) {
                return emptyDays;
            } else {
                emptyDays.push(
                    <div
                        key={i}
                        className='text-xl flex items-center justify-center h-[5rem]'
                    ></div>
                );
            }
        }
    }

    function changeYear(nextOrPrevious: 1 | -1) {
        const nextYearNumber = (
            parseInt(currentMonth.days[0].date.split('-')[0]) + nextOrPrevious
        ).toString();

        const newYear = calendar.years.find((year) => {
            return year.yearNumber == nextYearNumber;
        });

        let newCurrentMonth;
        if (newYear) {
            newCurrentMonth = newYear.months.find((month) => {
                return month.monthName == currentMonth.monthName;
            });
        }

        if (newCurrentMonth) {
            setCurrentMonth(newCurrentMonth);
        }
    }

    function changeMonth(nextOrPrevious: 1 | -1) {
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
            setCurrentMonth(year.months[currentMonthIndex + nextOrPrevious]);
        } else if (
            nextOrPrevious == -1 &&
            year &&
            currentMonthIndex != undefined &&
            currentMonthIndex > 0
        ) {
            setCurrentMonth(year.months[currentMonthIndex + nextOrPrevious]);
        }
    }

    return (
        <main className='py-12 gap-5 mt-10 flex justify-center items-center flex-col text-white'>
            <div className='w-[40rem] h-fit bg-gray-900 shadow-xl rounded-xl overflow-hidden'>
                {/* Año */}
                <div className='flex'>
                    <button onClick={() => changeYear(-1)} className='px-5 hover:text-orange'>
                        <FaArrowLeft />
                    </button>
                    <h2 className='bg-gray-700 w-full py-2 text-center text-3xl border-b-2 border-gray-500'>
                        {currentYear}
                    </h2>
                    <button onClick={() => changeYear(1)} className='px-5 hover:text-orange'>
                        <FaArrowRight />
                    </button>
                </div>

                {/* Mes */}
                <div className='flex'>
                    <button onClick={() => changeMonth(-1)} className='px-5 hover:text-orange'>
                        <FaArrowLeft />
                    </button>
                    <h2 className='bg-gray-700 w-full py-2 text-center text-3xl border-b-2 border-gray-500'>
                        {currentMonth.monthName}
                    </h2>
                    <button onClick={() => changeMonth(1)} className='px-5 hover:text-orange'>
                        <FaArrowRight />
                    </button>
                </div>

                {/* Casillas */}
                <div className='grid text-center grid-cols-7'>
                    <span className='py-2'>Lunes</span>
                    <span className='py-2'>Martes</span>
                    <span className='py-2'>Miércoles</span>
                    <span className='py-2'>Jueves</span>
                    <span className='py-2'>Viernes</span>
                    <span className='py-2'>Sábado</span>
                    <span className='py-2'>Domingo</span>
                    {alocateEmptyDivsUntilFirstDay(firstDayOfCurrentMonth)}
                    {currentMonth.days.map((day) => {
                        return (
                            <div
                                key={day.date}
                                className={
                                    'bg-gray-900 relative text-xl flex flex-col items-center justify-center h-[5rem] ' +
                                    (day.isJudicialVacation && 'bg-orange')
                                }
                            >
                                {/* Numero del dia */}
                                <span>{day.date.split('-')[2]}</span>

                                {/* Feriados */}
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
                    })}
                </div>
            </div>
        </main>
    );
}
