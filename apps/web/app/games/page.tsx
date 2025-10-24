import { cookies } from 'next/headers';
import ListItem from '../../components/listItem';
import { Game } from '@repo/types';
import { getUser } from '../../lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

const API = process.env.NEXT_PUBLIC_API_URL;

export default async function GamesPage() {
  const user = await getUser();
  if (!user) redirect('/');

  const acc = (await cookies()).get('acc')?.value;
  if (!acc) return null;
  const res = await fetch(`${API}/game`, {
    headers: { Cookie: `acc=${acc}` },
    cache: 'no-store',
  });

  const data = await res.json();
  return (
    <>
      <section className="m-auto flex justify-center flex-col items-center py-4">
        {res.ok && data.length > 0 ? (
          data.map((game: Game) => (
            <Link href={'/games/' + encodeURIComponent(game.title) + '?id=' + (encodeURIComponent(game._id))} key={game._id} className='title'>
              <ListItem>{game.title}</ListItem>
            </Link>
          ))
        ) : (
          <h1>You have not any games yet!</h1>
        )}
      </section>
    </>
  );
}
