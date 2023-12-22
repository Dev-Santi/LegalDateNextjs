'use client';

import swal from 'sweetalert2';
import { calculateDate } from '@/calendar/functions';
import { useState } from 'react';

export default function Calculator() {
    const [date, setDate] = useState('');
    const [count, setCount] = useState('15');

    return (
        <>
            <form className='text-center flex flex-col gap-4 items-center'>
                <div className='flex flex-col md:flex-row items-center gap-4 mb-10'>
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
                    onClick={(e) => {
                        e.preventDefault();
                        swal.fire({
                            title: calculateDate(date, count, {
                                holidays: true, // Filtrar dias feriados
                                weekend: true, // Filtrar Sabados y Domingos
                                judicialVacation: true, // Filtrar ferias judiciales
                                allowTurismo: false, // Tomar semana de turismo como semana habil
                            }),
                            confirmButtonColor: '#d4a05b',
                            confirmButtonText: 'Cerrar',
                        });
                    }}
                    className='bg-gray-700 border-2 border-white mt-2 w-fit text-white rounded-xl py-4 px-14'
                    type='submit'
                >
                    CALCULAR
                </button>
            </form>
        </>
    );
}
