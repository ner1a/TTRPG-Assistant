import Link from 'next/link';
import { getUser } from '../../lib/auth';
import HeaderActions from './headerActions';

export default async function Header() {
  const user = await getUser();

  return (
    <header className="border-b border-slate-800">
      <div className="mx-auto grid container grid-cols-3 items-center gap-2 px-4 py-4">

        <div className="justify-self-start">
          <Link href="/" className="font-bold text-slate-100 no-underline hover:opacity-90">
            TTRPG Assistant
          </Link>
        </div>

        <nav className="flex items-center justify-center gap-5">
          {user && (
            <>
            <li className='list-none'>
              <Link href="/dashboard" className="border p-3 rounded-3xl hover:bg-gray-900">
                Dashboard
              </Link>
            </li>
            <li className='list-none'>
              <Link href="/games" className="border p-3 rounded-3xl hover:bg-gray-900">
                Games
              </Link>
            </li>
            <li className='list-none'>
              <Link href="/characters" className="border p-3 rounded-3xl hover:bg-gray-900">
                Characters
              </Link>
            </li>
            </>
          )}
        </nav>

        <div className="justify-self-end">
          <HeaderActions user={user} />
        </div>
      </div>
    </header>
  );
}
