import Link from 'next/link';

import BottomTriangle from '@/components/triangles/BottomTriangle';
import TopTriangle from '@/components/triangles/TopTriangle';
import Calculator from '@/components/calculator';

import { GoLaw } from 'react-icons/go';

export default function Home() {
    return (
        <div className='max-w-[64rem] mx-auto px-6 pt-8'>
            <TopTriangle />

            <header className='flex justify-between'>
                <Link href='/' className='flex items-center gap-2'>
                    <span className='text-orange text-3xl'>
                        <GoLaw />
                    </span>
                    <span className='text-white tracking-wider font-semibold'>JUSTO A TIEMPO</span>
                </Link>
                <nav className='hidden md:block'>
                    <ul className='flex gap-5 text-white tracking-wider uppercase'>
                        <li>
                            <Link href='/'>Sobre la app</Link>
                        </li>
                    </ul>
                </nav>
            </header>

            <main className='mx-auto my-2 w-fit mt-24'>
                <Calculator />
            </main>

            <BottomTriangle />
        </div>
    );
}
