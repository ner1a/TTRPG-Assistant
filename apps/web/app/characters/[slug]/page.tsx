import { cookies } from 'next/headers';
import { Character } from '@repo/types';

const API = process.env.NEXT_PUBLIC_API_URL;

export default async function CharacterDetails({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const acc = (await cookies()).get('acc')?.value;
  if (!acc) return null;
  
  const id = await searchParams.id;
  const res = await fetch(`${API}/characters/${encodeURIComponent(id)}`, {
    headers: { Cookie: `acc=${acc}` },
    cache: 'no-store',
  });

  const character: Character = await res.json();

  return (
      <>
          {res.ok ? (
                <div className='flex flex-col gap-2' key={character._id}>
                    <h1>{character.name}</h1>
                    <span>Level: {character.level}</span>
                    <span>Class: {character.class}</span>
                    <p>{character.background}</p>
                </div>
          ) : (
            <h1>You have not any characters yet!</h1>
          )}
      </>
    );
}
