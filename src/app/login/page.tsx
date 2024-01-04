import Link from "next/link";
import { ImEnter } from "react-icons/im";

import { MdPersonPin, MdPerson } from "react-icons/md";
import { GiPadlock } from "react-icons/gi";

export default function () {
    return (
        <main className='flex items-center justify-center min-h-[calc(100vh-10rem)]'>
            <form className='mt-10 relative flex flex-col items-center gap-4 bg-[#ffffff10] shadow-xl backdrop-blur-md p-10 rounded-xl '>
                <ImEnter className='text-[4rem] text-white absolute top-[-1rem]' />

                <div className='mt-10 flex items-center h-full bg-orange'>
                    <label
                        className='text-white text-xl w-12 flex items-center justify-center'
                        htmlFor='email'
                    >
                        <MdPerson />
                    </label>
                    <input
                        type='email'
                        id='email'
                        required
                        className='p-2 w-full'
                        placeholder='Email'
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
                        id='pass'
                        type='password'
                        required
                        className='p-2 w-full'
                        placeholder='Contraseña'
                    />
                </div>

                <div className='flex w-full flex-col'>
                    <button className='text-white py-1 shadow-md bg-gray-700 w-full hover:bg-orange'>
                        Iniciar sesión
                    </button>
                    <p className='text-white text-center drop-shadow-md mt-10 mb-2'>
                        ¿No tienes cuenta?
                    </p>
                    <Link
                        href={"/signup"}
                        className='text-white text-center shadow-md py-1 bg-gray-700 w-full hover:bg-orange'
                    >
                        Registrarse
                    </Link>
                </div>
            </form>
        </main>
    );
}
