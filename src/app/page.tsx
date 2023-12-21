import { GoLaw } from 'react-icons/go';
import BottomTriangle from '@/components/triangles/BottomTriangle';
import TopTriangle from '@/components/triangles/TopTriangle';
import Link from 'next/link';
import { calculateDateWithoutHolidays } from '@/calendar/functions';
import Calculator from '@/components/calculator';

export default function Home() {
    return (
        <div className='max-w-[64rem] mx-auto p-6 pt-12'>
            <TopTriangle />

            <header className='flex justify-between'>
                <Link href='/' className='flex items-center gap-2'>
                    <span className='text-orange text-3xl'>
                        <GoLaw />
                    </span>
                    <span className='text-white tracking-wider font-semibold'>LLEGUE JUSTITO</span>
                </Link>
                <nav className='hidden lg:block'>
                    <ul className='flex gap-5 text-white tracking-wider uppercase'>
                        <li>
                            <Link href='/'>Calendarios</Link>
                        </li>
                        <li>
                            <Link href='/'>Sobre la app</Link>
                        </li>
                    </ul>
                </nav>
            </header>

            <main className='mx-auto w-fit mt-12'>
                <Calculator />
            </main>
            <BottomTriangle />
        </div>
    );
}
