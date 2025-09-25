import type { Metadata } from 'next';
import './globals.css';

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
        {children}
      </body>
    </html>
  );
}
