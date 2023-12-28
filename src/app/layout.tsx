import type { Metadata } from 'next';
import { openSans } from '@/fonts';
import './globals.css';
import Navbar from '@/components/navbar';

export const metadata: Metadata = {
    title: 'Calculadora de plazos',
    description:
        'Calcula fechas termino en Uruguay de manera fácil y precisa. Introduce una fecha y el plazo requerido, selecciona los tipos de fechas que deben saltearse y se te proporcionará la fecha de vencimiento. Optimiza tu gestión de plazos legales de manera eficiente y evita posibles incumplimientos.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html className='' lang='es'>
            <body className={openSans.className + ' overflow-x-hidden'}>
                <div className='min-h-screen bg-[url("/bg.jpg")] bg-fixed bg-cover bg-bottom'>
                    <div className='min-h-screen bg-[rgba(0,37,47,0.9)]'>
                        <div className='max-w-[64rem] mx-auto px-6 pt-8'>
                            <Navbar />
                            {children}
                        </div>
                    </div>
                </div>
            </body>
        </html>
    );
}
