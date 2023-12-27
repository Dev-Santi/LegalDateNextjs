'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GoLaw } from 'react-icons/go';
import { RxHamburgerMenu } from 'react-icons/rx';
import { VscClose } from 'react-icons/vsc';

export default function Navbar() {
    const [isMenuActive, setIsMenuActive] = useState(false);
    const path = usePathname();

    function handleClick() {
        setIsMenuActive(!isMenuActive);
    }

    return (
        <header className='flex justify-between items-center'>
            <Link href='/' className='flex items-center gap-2 text-white hover:text-orange'>
                <span className='text-orange text-3xl'>
                    <GoLaw />
                </span>
                <span className=' tracking-wider font-semibold'>JUSTO A TIEMPO</span>
            </Link>

            {/* Mobile nav */}

            <div className='md:hidden'>
                <button onClick={handleClick} className='relative z-20 text-4xl text-orange'>
                    {!isMenuActive ? <RxHamburgerMenu /> : <VscClose />}
                </button>

                <nav
                    className={
                        'absolute z-10 bg-white text-black top-0 right-0 p-5 pt-24 text-center rounded-bl-xl ' +
                        (isMenuActive ? 'block' : 'hidden')
                    }
                >
                    <ul className='flex flex-col gap-5 text-xl'>
                        <li>
                            <Link onClick={handleClick} href='/'>
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link onClick={handleClick} href='/acerca-de'>
                                Sobre la app
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Tablet - Desktop nav */}

            <nav className='hidden md:block'>
                <ul className='flex gap-5 text-white tracking-wider uppercase'>
                    <li>
                        <Link className={path == '/' ? 'text-gray-500' : 'hover:text-orange'} href='/'>
                            Inicio
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={path == '/acerca-de' ? 'text-gray-500' : 'hover:text-orange'}
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
