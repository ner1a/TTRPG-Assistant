import { cookies } from 'next/headers';
import ListItem from '../../components/listItem';
import { Character } from '@repo/types';
import { getUser } from '../../lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

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
  console.log(data)
  return (
      <>
        <section className="m-auto flex justify-center flex-col items-center py-4">
          {res.ok && data.length > 0 ? (
            data.map((character: Character) => (
              <Link href={"/characters/" + (character.name)} key={character._id}>
                <ListItem>{character.name}</ListItem>
              </Link>
            ))
          ) : (
            <h1>You have not any characters yet!</h1>
          )}
        </section>
      </>
    );
}
