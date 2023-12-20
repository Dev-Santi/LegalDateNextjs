import type { Metadata } from 'next';
import { openSans } from '@/fonts';
import './globals.css';

export const metadata: Metadata = {
    title: '',
    description: '',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es">
            <body className={openSans.className}>{children}</body>
        </html>
    );
}
