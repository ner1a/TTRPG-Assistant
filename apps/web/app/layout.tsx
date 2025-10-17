import type { Metadata } from 'next';
import './globals.css';

import Header from '../components/header/header'

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
    <html lang="en">
      <body>
        <Header />
        <main  className='container m-auto'>
          {children}
        </main>
      </body>
    </html>
  );
}