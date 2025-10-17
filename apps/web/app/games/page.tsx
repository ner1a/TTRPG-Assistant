import { cookies } from 'next/headers';
import ListItem from '../../components/listItem';
import { Game } from '@repo/types';

const API = process.env.NEXT_PUBLIC_API_URL;

export default async function GamesPage() {
  const acc = (await cookies()).get('acc')?.value;
  if (!acc) return null;
  const res = await fetch(`${API}/game`, {
    headers: { Cookie: `acc=${acc}` },
    cache: 'no-store',
  });

  const data = await res.json();
  console.log(data);
  return (
    <>
      <section className="m-auto flex justify-center flex-col items-center py-4">
        {res.ok && data.length > 0 ? (
          data.map((game: Game) => (
            <ListItem key={game._id}>{game.title}</ListItem>
          ))
        ) : (
          <h1>You have not any games yet!</h1>
        )}
      </section>
    </>
  );
}
