'use client';
import { calculateDateWithoutHolidays } from '@/calendar/functions';
import { useState } from 'react';

export default function Calculator() {
    const [result, setResult] = useState('');
    const [date, setDate] = useState('');
    const [count, setCount] = useState('15');

    return (
        <>
            <form className='text-center flex flex-col gap-10'>
                <div className='flex gap-8'>
                    <label className='bg-orange py-8 w-60' htmlFor='idStartDate'>
                        FECHA NOTIFICACION
                    </label>
                    <input
                        onChange={(e) => setDate(e.target.value)}
                        id='idStartDate'
                        className='py-8 w-40 rounded-2xl text-center'
                        type='date'
                        min='2023-01-01'
                        max='2024-12-31'
                        value={date}
                        required
                    />
                </div>

                <div className='flex gap-8'>
                    <label className='bg-orange block py-8 w-60' htmlFor='idDeadLine'>
                        PLAZO EN DIAS
                    </label>
                    <input
                        onChange={(e) => setCount(e.target.value)}
                        id='idDeadLine'
                        className='py-8 w-40 rounded-2xl text-center'
                        value={count}
                        type='number'
                        required
                    />
                </div>

                <button
                    onClick={() => setResult(calculateDateWithoutHolidays(date, count))}
                    className='bg-gray-700 border-2 border-white text-white rounded-xl py-4 px-8'
                    type='button'
                >
                    CALCULAR
                </button>
            </form>
            <p>{result}</p>
        </>
    );
}
