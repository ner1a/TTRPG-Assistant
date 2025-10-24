import { redirect } from 'next/navigation';
import { getUser } from '../lib/auth';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { Character } from '@repo/types';

const API = process.env.NEXT_PUBLIC_API_URL;

export default async function CharacterListModel({
  characterId,
}: {
  characterId: string;
}) {
  const user = await getUser();
  if (!user) redirect('/');

  const acc = (await cookies()).get('acc')?.value;
  if (!acc) return null;

  const res = await fetch(
    `${API}/characters/${encodeURIComponent(characterId)}`,
    {
      headers: { Cookie: `acc=${acc}` },
      cache: 'no-store',
    },
  );
  if (!res.ok) return null;

  const character: Character = await res.json();

  return (
    <li>
      <Link href={`/characters/c?id=${character._id}`}>
        <div className="border-0 rounded-lg bg-slate-800 py-2 px-3 hover:bg-slate-950">
          <h2 className="font-bold text-slate-300">{character.name}</h2>
          <div className="flex gap-2">
            <div className="text-xs">
              <span className="text-slate-400">Level: </span>
              <span>{character.level ? character.level : '1'}</span>
            </div>
            <div className="text-xs">
              <span className="text-slate-400">Background: </span>
              <span>{character.background}</span>
            </div>
            {character.origin && (
              <div className="text-xs">
                <span className="text-slate-400">Origin: </span>
                <span>{character.origin}</span>
              </div>
            )}
          </div>
        </div>
      </Link>
    </li>
  );
}
