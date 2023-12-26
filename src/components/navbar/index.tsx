'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GoLaw } from 'react-icons/go';

export default function Navbar() {
    const path = usePathname();
    return (
        <header className='flex justify-between'>
            <Link href='/' className='flex items-center gap-2 text-white hover:text-orange'>
                <span className='text-orange text-3xl'>
                    <GoLaw />
                </span>
                <span className=' tracking-wider font-semibold'>JUSTO A TIEMPO</span>
            </Link>
            <nav className='hidden md:block'>
                <ul className='flex gap-5 text-white tracking-wider uppercase'>
                    <li>
                        <Link
                            className={
                                'hover:text-orange ' +
                                (path == '/' ? 'text-gray-500 hover:text-gray-500' : '')
                            }
                            href='/'
                        >
                            Inicio
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={
                                'hover:text-orange ' +
                                (path == '/acerca-de' ? 'text-gray-500 hover:text-gray-500' : '')
                            }
                            href='/acerca-de'
                        >
                            Sobre la app
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
