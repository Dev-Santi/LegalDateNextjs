'use client';

import swal from 'sweetalert2';
import { calculateDate } from '@/calendar/functions';
import { useState } from 'react';

import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

export default function Calculator() {
    const [date, setDate] = useState('');
    const [count, setCount] = useState('15');
    const [filters, setFilters] = useState({
        holidays: true, // Filtrar dias feriados
        weekend: true, // Filtrar Sabados y Domingos
        judicialVacation: true, // Filtrar ferias judiciales
        turismo: false, // Filtrar la semana de turismo incluso cuando se filtren los dias corridos
    });
    const [visibleFilters, setVisibleFilters] = useState(false);

    function handleClick(e: React.MouseEvent) {
        e.preventDefault();
        swal.fire({
            title: calculateDate(date, count, {
                ...filters,
            }),
            confirmButtonColor: '#d4a05b',
            confirmButtonText: 'Cerrar',
        });
    }

    const visibleFiltersClass = visibleFilters ? 'h-72' : 'h-14';

    return (
        <>
            <form className='text-center flex flex-col gap-4 items-center py-6'>
                <div
                    className={
                        'transition-all duration-300 bg-gray-700 text-white w-full p-3 flex flex-col items-center overflow-hidden ' +
                        visibleFiltersClass
                    }
                >
                    <h2
                        onClick={() => setVisibleFilters(!visibleFilters)}
                        className='cursor-pointer uppercase w-full flex flex-col items-center font-semibold '
                    >
                        Filtros
                        <span>{visibleFilters ? <IoIosArrowUp /> : <IoIosArrowDown />}</span>
                    </h2>

                    <h3 className='my-2 text-red-400'>
                        Las opciones marcadas indican los dias <br /> que
                        <span className='font-bold'> NO </span>se deben tomar en cuenta
                    </h3>

                    {/* Filters */}
                    <div className='flex justify-between items-center w-full mt-4'>
                        <label className='' htmlFor='holidayCheck'>
                            Feriados
                        </label>
                        <input
                            type='checkbox'
                            onChange={() => setFilters({ ...filters, holidays: !filters.holidays })}
                            name='feriados'
                            defaultChecked
                            id='holidayCheck'
                        />
                    </div>

                    <div className='flex justify-between items-center w-full mt-4'>
                        <label className={filters.holidays ? 'text-gray-500' : ''} htmlFor='turismoCheck'>
                            Semana de turismo
                        </label>
                        <input
                            disabled={filters.holidays}
                            type='checkbox'
                            onChange={() => setFilters({ ...filters, turismo: !filters.turismo })}
                            name='turismo'
                            id='turismoCheck'
                        />
                    </div>

                    <div className='flex justify-between items-center w-full mt-4'>
                        <label className='' htmlFor='weekendCheck'>
                            Fines de semana
                        </label>
                        <input
                            type='checkbox'
                            onChange={() => setFilters({ ...filters, weekend: !filters.weekend })}
                            name='finDeSemana'
                            defaultChecked
                            id='weekendCheck'
                        />
                    </div>

                    <div className='flex justify-between items-center w-full mt-4'>
                        <label className='' htmlFor='judicialVacationsCheck'>
                            Ferias judiciales
                        </label>
                        <input
                            type='checkbox'
                            onChange={() =>
                                setFilters({ ...filters, judicialVacation: !filters.judicialVacation })
                            }
                            name='judicialVacations'
                            defaultChecked
                            id='judicialVacationsCheck'
                        />
                    </div>
                </div>

                <div className='flex flex-col md:flex-row items-center gap-4'>
                    <label className='bg-orange py-2 md:py-8 w-60' htmlFor='idStartDate'>
                        FECHA NOTIFICACION
                    </label>
                    <input
                        onChange={(e) => setDate(e.target.value)}
                        id='idStartDate'
                        className='py-6 md:py-8 w-60 md:w-40 text-center rounded-2xl flex items-center justify-center'
                        type='date'
                        min='2023-01-01'
                        max='2024-12-31'
                        value={date}
                        required
                    />
                </div>

                <div className='flex flex-col md:flex-row items-center gap-4'>
                    <label className='bg-orange block py-2 md:py-8 w-60' htmlFor='idDeadLine'>
                        PLAZO EN DIAS
                    </label>
                    <input
                        onChange={(e) => setCount(e.target.value)}
                        id='idDeadLine'
                        className='py-6 md:py-8 w-60 md:w-40 rounded-2xl text-center'
                        value={count}
                        type='number'
                        required
                    />
                </div>

                <button
                    onClick={handleClick}
                    className='bg-gray-700 border-2 border-white mt-2 w-fit text-white rounded-xl py-4 px-14'
                    type='submit'
                >
                    CALCULAR
                </button>
            </form>
        </>
    );
}
