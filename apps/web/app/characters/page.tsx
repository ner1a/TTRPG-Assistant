import { cookies } from 'next/headers';
import { Character } from '@repo/types';
import { getUser } from '../../lib/auth';
import { redirect } from 'next/navigation';
import CharacterListModel from '../../components/characterListModel';

const API = process.env.NEXT_PUBLIC_API_URL;

export default async function CharactersPage() {
    const user = await getUser();
    if (!user) redirect('/');

  const acc = (await cookies()).get('acc')?.value;
  if (!acc) return null;
  const res = await fetch(`${API}/characters`, {
    headers: { Cookie: `acc=${acc}` },
    cache: 'no-store',
  });
  const data = await res.json();
  return (
      <>
        <section className="m-auto flex flex-row w-full gap-2 justify-center flex-col items-center py-4">
          {res.ok && data.length > 0 ? (
            data.map((character: Character) => (
              <CharacterListModel key={character._id} characterId={character._id} />
            ))
          ) : (
            <h1>You have not any characters yet!</h1>
          )}
        </section>
      </>
    );
}
