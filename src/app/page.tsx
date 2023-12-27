import Link from 'next/link';
import Calculator from '@/components/calculator';

export default function Home() {
    return (
        <main className='mx-auto w-fit flex flex-col items-center justify-center min-h-[calc(100vh-5rem)]'>
            <Calculator />

            <Link
                className='text-blue-400 text-sm text-center mt-6 hover:text-white'
                href='https://www.linkedin.com/in/santiago-larrosa-bauz%C3%A1-99b740251/'
                target='_blank'
            >
                ¿Tienes ideas para aportar? ¿Has encontrado algún problema en la aplicacion? ¡Quiero saberlo!
            </Link>
        </main>
    );
}
