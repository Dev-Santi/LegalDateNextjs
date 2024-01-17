'use client';

import Link from 'next/link';
import { FormEvent } from 'react';
import { GiPadlock } from 'react-icons/gi';
import { ImEnter } from 'react-icons/im';
import { MdPerson } from 'react-icons/md';
import { MdOutlineDriveFileRenameOutline } from 'react-icons/md';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import axios, { AxiosError } from 'axios';
import Swal from 'sweetalert2';

export default function page() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const router = useRouter();

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        try {
            const signUpResponse = await axios.post('/api/auth/signup', {
                name: name,
                email: email,
                password: pass,
            });

            if (signUpResponse.status === 200) {
                await Swal.fire({
                    title: '¡Registro exitoso!',
                    icon: 'success',
                    confirmButtonText: 'Entrar',
                    confirmButtonColor: 'green',
                });

                const sigInResponse = await signIn('credentials', {
                    email: signUpResponse.data.message.email,
                    password: pass,
                    redirect: false,
                });

                router.push('/');
            }
        } catch (e) {
            console.log(e);

            if (e instanceof AxiosError) {
                const message = e.response?.data.message;

                if (message === 'Usuario ya existe') {
                    Swal.fire({
                        title: 'El correo que intentas utilizar ya está registrado.',
                        confirmButtonColor: 'red',
                    });
                }
                if (message === 'Contraseña demasiado corta') {
                    Swal.fire({
                        title: 'Contraseña demasiado corta',
                        confirmButtonColor: 'red',
                    });
                }
            } //Algun otro error
            else {
                Swal.fire({
                    title: 'Ha ocurrido un error, intente nuevamente.',
                    confirmButtonColor: 'red',
                });
            }
        }
    }

    return (
        <main className='flex items-center justify-center min-h-[calc(100vh-10rem)]'>
            <form
                onSubmit={handleSubmit}
                className='mt-10 relative flex flex-col items-center gap-4 bg-[#ffffff10] shadow-xl backdrop-blur-md p-10 rounded-xl '
            >
                <ImEnter className='text-[4rem] text-white absolute top-[-1rem]' />

                <div className='mt-10 flex items-center h-full bg-orange'>
                    <label
                        className='text-white text-xl w-12 flex items-center justify-center'
                        htmlFor='name'
                    >
                        <MdOutlineDriveFileRenameOutline />
                    </label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        id='name'
                        type='text'
                        required
                        className='p-2 w-full'
                        placeholder='Nombre'
                        minLength={3}
                        maxLength={30}
                    />
                </div>

                <div className=' flex items-center h-full bg-orange'>
                    <label
                        className='text-white text-xl w-12 flex items-center justify-center'
                        htmlFor='email'
                    >
                        <MdPerson />
                    </label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type='email'
                        id='email'
                        required
                        className='p-2 w-full'
                        placeholder='Email'
                        maxLength={60}
                    />
                </div>

                <div className='flex items-center h-full bg-orange'>
                    <label
                        className='text-white text-xl w-12 flex items-center justify-center'
                        htmlFor='pass'
                    >
                        <GiPadlock />
                    </label>
                    <input
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                        id='pass'
                        type='password'
                        required
                        minLength={6}
                        maxLength={50}
                        className='p-2 w-full'
                        placeholder='Contraseña'
                    />
                </div>

                <div className='flex w-full flex-col'>
                    <button className='text-white py-1 shadow-md bg-gray-700 w-full hover:bg-orange'>
                        Registrarse
                    </button>
                    <p className='text-white text-center drop-shadow-md mt-10 mb-2'>
                        ¿Ya tienes una cuenta?
                    </p>
                    <Link
                        href={'/login'}
                        className='text-white text-center shadow-md py-1 bg-gray-700 w-full hover:bg-orange'
                    >
                        Iniciar sesion
                    </Link>
                </div>
            </form>
        </main>
    );
}
