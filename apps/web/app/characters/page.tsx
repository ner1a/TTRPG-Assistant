import { cookies } from 'next/headers';
import ListItem from '../../components/listItem';
import { Character } from '@repo/types';

const API = process.env.NEXT_PUBLIC_API_URL;

export default async function CharactersPage() {
  const acc = (await cookies()).get('acc')?.value;
  if (!acc) return null;
  const res = await fetch(`${API}/characters`, {
    headers: { Cookie: `acc=${acc}` },
    cache: 'no-store',
  });
  const data = await res.json();
  return (
      <>
        <section className="m-auto flex justify-center flex-col items-center py-4">
          {res.ok && data.length > 0 ? (
            data.map((character: Character) => (
              <ListItem key={character._id}>{character.name}</ListItem>
            ))
          ) : (
            <h1>You have not any characters yet!</h1>
          )}
        </section>
      </>
    );
}
