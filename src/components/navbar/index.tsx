'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { GoLaw } from 'react-icons/go';
import { RxHamburgerMenu } from 'react-icons/rx';
import { VscClose } from 'react-icons/vsc';
import { IoPersonCircleOutline } from 'react-icons/io5';
import { useSession } from 'next-auth/react';

export default function Navbar() {
    const [isMenuActive, setIsMenuActive] = useState(false);
    const [logOutLinkActive, setLogOutLinkActive] = useState(false);
    const { data: session } = useSession();

    const path = usePathname();

    function handleLogOut() {
        setLogOutLinkActive(!logOutLinkActive);
    }

    function handleClick() {
        setIsMenuActive(!isMenuActive);
    }

    return (
        <header className='flex justify-between items-center'>
            <Link
                href='/'
                className='flex items-center gap-2 text-white hover:text-orange'
            >
                <span className='text-orange text-3xl'>
                    <GoLaw />
                </span>
                <span className='tracking-wider font-semibold'>JUSTO A TIEMPO</span>
            </Link>

            {/* Mobile nav */}

            <div className='md:hidden '>
                <button
                    onClick={handleClick}
                    className='relative z-20 text-4xl text-orange'
                >
                    {!isMenuActive ? (
                        <RxHamburgerMenu />
                    ) : (
                        <VscClose className='text-white' />
                    )}
                </button>

                <nav
                    className={
                        'absolute z-10 shadow-xl transition-all duration-[400ms] bg-orange text-white top-0 right-0 p-5 pt-24 text-center rounded-bl-xl ' +
                        (isMenuActive ? 'top-0' : 'top-[-22rem]')
                    }
                >
                    <ul className='flex flex-col gap-5 text-xl'>
                        <li>
                            <Link
                                className={path == '/' ? 'opacity-50' : ''}
                                onClick={handleClick}
                                href='/'
                            >
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={path == '/calendario' ? 'opacity-50' : ''}
                                onClick={handleClick}
                                href='/calendario'
                            >
                                Calendario
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={path == '/acerca-de' ? 'opacity-50' : ''}
                                onClick={handleClick}
                                href='/acerca-de'
                            >
                                Guía
                            </Link>
                        </li>
                        <li>
                            {session ? (
                                <Link onClick={handleClick} href='/api/auth/signout'>
                                    Cerrar sesion
                                </Link>
                            ) : (
                                <Link
                                    className={
                                        'font-bold underline ' +
                                        (path == '/login' ? 'opacity-50' : '')
                                    }
                                    onClick={handleClick}
                                    href='/login'
                                >
                                    Iniciar sesion
                                </Link>
                            )}
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Tablet - Desktop nav */}

            <nav className='hidden md:block'>
                <ul className='flex gap-5 text-white items-center tracking-wider uppercase'>
                    <li>
                        <Link
                            className={
                                path == '/' ? 'text-gray-500' : 'hover:text-orange'
                            }
                            href='/'
                        >
                            Inicio
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={
                                path == '/calendario'
                                    ? 'text-gray-500'
                                    : 'hover:text-orange'
                            }
                            href='/calendario'
                        >
                            Calendario
                        </Link>
                    </li>
                    <li>
                        <Link
                            className={
                                path == '/acerca-de'
                                    ? 'text-gray-500'
                                    : 'hover:text-orange'
                            }
                            href='/acerca-de'
                        >
                            Guía
                        </Link>
                    </li>
                    <li>
                        {session ? (
                            <div className='relative flex flex-col items-center ml-10'>
                                <h2
                                    onClick={handleLogOut}
                                    className='rounded-full hover:scale-105 hover:text-orange cursor-pointer flex items-center justify-center w-12 h-12 border-2'
                                >
                                    {session?.user?.name?.split('')[0]}
                                </h2>
                                <Link
                                    className={
                                        'hover:text-orange text-center absolute top-[-10rem]' +
                                        ' ' +
                                        (logOutLinkActive ? 'top-[3.5rem]' : '')
                                    }
                                    href='/api/auth/signout'
                                >
                                    Cerrar sesión
                                </Link>
                            </div>
                        ) : (
                            <Link
                                className='hover:text-orange block text-5xl ml-14'
                                href='/login'
                            >
                                <IoPersonCircleOutline />
                            </Link>
                        )}
                    </li>
                </ul>
            </nav>
        </header>
    );
}
