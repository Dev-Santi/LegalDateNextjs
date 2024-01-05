"use client";

import calendar from "@/calendar/calendar";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function page() {
    const { data: session, status } = useSession();
    console.log(session);

    const [currentMonth, setCurrentMonth] = useState(calendar.years[1].months[0]);

    useEffect(() => {
        try {
            const localStorageCurrentMonth = localStorage.getItem("currentMonth");

            if (localStorageCurrentMonth) {
                setCurrentMonth(JSON.parse(localStorageCurrentMonth));
            }
        } catch (e) {
            console.log("Error obteniendo último mes visualizado en el local storage");
        }
    }, []);

    const currentYear = currentMonth.days[0].date.split("-")[0];
    const firstDayOfCurrentMonth = currentMonth.days[0];

    function alocateEmptyDivsUntilFirstDay(day: any) {
        const emptyDays: any = [];
        const names = [
            "Lunes",
            "Martes",
            "Miercoles",
            "Jueves",
            "Viernes",
            "Sabado",
            "Domingo",
        ];

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

    function changeYear(nextOrPrevious: 1 | -1) {
        const nextYearNumber = (
            parseInt(currentMonth.days[0].date.split("-")[0]) + nextOrPrevious
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
                localStorage.setItem("currentMonth", JSON.stringify(newCurrentMonth));
            } catch (e) {
                console.log(
                    "Error al intentar guardar último mes visualizado en el local storage"
                );
            }
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
            try {
                localStorage.setItem(
                    "currentMonth",
                    JSON.stringify(year.months[currentMonthIndex + nextOrPrevious])
                );
            } catch (e) {
                console.log(
                    "Error al intentar guardar último mes visualizado en el local storage"
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
                    "currentMonth",
                    JSON.stringify(year.months[currentMonthIndex + nextOrPrevious])
                );
            } catch (e) {
                console.log(
                    "Error al intentar guardar último mes visualizado en el local storage"
                );
            }
            setCurrentMonth(year.months[currentMonthIndex + nextOrPrevious]);
        }
    }

    function Referencias() {
        return (
            <div className='bg-gray-900 hidden md:flex relative text-base md:text-xl flex-col rounded-xl rounded-t-none'>
                {currentMonth.days.find((day) => {
                    return day.isJudicialVacation || day.holiday;
                }) && <h2 className='text-center mt-2'>Referencias</h2>}

                {currentMonth.days.find((day) => {
                    return day.isJudicialVacation;
                }) && (
                    <div className='flex items-center gap-5 px-6 py-3'>
                        <h2 className='flex justify-center w-16'>
                            <div className='bg-orange p-2 w-fit rounded-full'></div>
                        </h2>
                        <FaArrowRight className='text-sm' />
                        <h2>Feria Judicial</h2>
                    </div>
                )}

                {currentMonth.days.find((day) => {
                    return day.holiday;
                }) && (
                    <div className='flex items-center gap-5 px-6 py-3'>
                        <h2
                            onClick={() =>
                                Swal.fire({
                                    title: "Descripción del feriado",
                                    confirmButtonColor: "#f87171",
                                })
                            }
                            className='text-red-400 w-16 cursor-pointer hover:text-red-200'
                        >
                            Feriado
                        </h2>
                        <FaArrowRight className='text-sm' />
                        <h2>Click para ver</h2>
                    </div>
                )}
            </div>
        );
    }

    return (
        <main className='flex mt-12 md:mt-24 justify-center items-center flex-col text-white'>
            <div className='min-w-[21rem] w-full scale-90 md:scale-100 md:w-[45rem] h-fit bg-gray-900 shadow-xl rounded-xl overflow-hidden pb-2'>
                {/* Año */}
                <div className='flex'>
                    <button
                        onClick={() => {
                            changeYear(-1);
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
                            changeYear(1);
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
                            changeMonth(-1);
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
                            changeMonth(1);
                        }}
                        className='px-5 hover:text-orange'
                    >
                        <FaArrowRight />
                    </button>
                </div>

                {/* Casillas */}
                <div className='grid text-center grid-cols-7'>
                    {/* Desktop */}
                    <span className='hidden md:block text-sm md:text-base py-3'>Lunes</span>
                    <span className='hidden md:block text-sm md:text-base py-3'>Martes</span>
                    <span className='hidden md:block text-sm md:text-base py-3'>
                        Miércoles
                    </span>
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

                    {alocateEmptyDivsUntilFirstDay(firstDayOfCurrentMonth)}
                    {currentMonth.days.map((day) => {
                        return (
                            <div
                                key={day.date}
                                className='bg-gray-900 relative text-xl flex flex-col items-center justify-center h-[3.2rem] md:h-[5rem]'
                            >
                                {/* Numero del dia */}
                                <span
                                    className={
                                        day.isJudicialVacation
                                            ? "text-orange"
                                            : ["Sabado", "Domingo"].includes(day.name)
                                            ? "text-gray-400"
                                            : ""
                                    }
                                >
                                    {day.date.split("-")[2]}
                                </span>

                                {/* Feriados */}
                                {day.holiday && (
                                    <span
                                        onClick={() =>
                                            typeof day.holiday == "object" &&
                                            Swal.fire({
                                                title: day.holiday.description,
                                                confirmButtonColor: "#f87171",
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
            <Referencias />
        </main>
    );
}
