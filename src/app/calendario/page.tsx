'use client';

import calendar from '@/calendar/calendar';
import { useState } from 'react';

export default function page() {
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
                    <div className='bg-gray-900 text-xl flex items-center justify-center h-[5rem]'></div>
                );
            }
        }
    }

    return (
        <main className='py-12 gap-5 mt-10 flex justify-center items-center flex-col text-white'>
            <div className='w-[40rem] h-fit bg-black'>
                <h2 className='bg-gray-700 py-2 text-center text-3xl'>Enero</h2>

                {/* Casillas */}
                <div className='grid text-center grid-cols-7'>
                    <span className='py-2'>Lunes</span>
                    <span className='py-2'>Martes</span>
                    <span className='py-2'>Miércoles</span>
                    <span className='py-2'>Jueves</span>
                    <span className='py-2'>Viernes</span>
                    <span className='py-2'>Sábado</span>
                    <span className='py-2'>Domingo</span>
                    {alocateEmptyDivsUntilFirstDay(calendar.years[1].months[8].days[0])}
                    {calendar.years[1].months[8].days.map((day) => {
                        return (
                            <div className='bg-gray-900 text-xl flex items-center justify-center h-[5rem]'>
                                {day.date.split('-')[2]}
                            </div>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}
