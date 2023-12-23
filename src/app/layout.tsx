import type { Metadata } from 'next';
import { openSans } from '@/fonts';
import './globals.css';

export const metadata: Metadata = {
    title: '',
    description: '',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang='es'>
            <body className={openSans.className + ' overflow-hidden'}>
                <div className='min-h-screen bg-[url("/bg.jpg")] bg-cover bg-bottom p-0 m-0'>
                    <div className='min-h-screen bg-[rgba(0,37,47,0.9)]'>{children}</div>
                </div>
            </body>
        </html>
    );
}
