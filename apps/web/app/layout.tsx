import type { Metadata } from 'next';
import './globals.css';

import Header from '../components/header/header'

import { Roboto } from 'next/font/google'
 
const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'TTRPG Assistant',
  description: 'A web application for managing tabletop RPG sessions',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.className}>
      <body>
        <Header />
        <main  className='container m-auto main-container'>
          {children}
        </main>
      </body>
    </html>
  );
}