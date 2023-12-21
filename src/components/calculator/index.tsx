'use client';
import { calculateDateWithoutHolidays } from '@/calendar/functions';
import { useState } from 'react';

export default function Calculator() {
    const [result, setResult] = useState('');
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
                        className='py-8 w-60 md:w-40 rounded-2xl text-center'
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
                        className='py-8 w-60 md:w-40 rounded-2xl text-center'
                        value={count}
                        type='number'
                        required
                    />
                </div>

                <button
                    onClick={() => setResult(calculateDateWithoutHolidays(date, count))}
                    className='bg-gray-700 border-2 border-white mt-2 w-fit text-white rounded-xl py-4 px-14'
                    type='button'
                >
                    CALCULAR
                </button>
            </form>
            <p className='text-center bg-white text-xl font-semibold rounded-lg py-4 px-2 mt-10'>
                {result ? result : '-'}
            </p>
        </>
    );
}
