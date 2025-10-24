import {  Party } from '@repo/types';
import { cookies } from 'next/headers';
import { getUser } from '../lib/auth';
import { redirect } from 'next/navigation';
import CharacterListModel from './characterListModel';

const API = process.env.NEXT_PUBLIC_API_URL;

export default async function PartyModel({ partyId }: { partyId: string }) {
  const user = await getUser();
  if (!user) redirect('/');

  const acc = (await cookies()).get('acc')?.value;
  if (!acc) return null;

  const res = await fetch(`${API}/party/${encodeURIComponent(partyId)}`, {
    headers: { Cookie: `acc=${acc}` },
    cache: 'no-store',
  });

  if (!res.ok) return null;

  const party: Party = await res.json();
  
  return (
    <li className="p-4 border-0 bg-slate-900 rounded-xl">
      <h2 className="text-xl font-semibold title pb-2">{party.name}</h2>
      {party.description && <p className="indent-6">{party.description}</p>}

      <div className="mt-4 flex flex-col gap-2">
        {party.characters && party.characters.length === 0 ? (
          <span className="indent-6">No characters in this party.</span>
        ) : (
          <>
            <h2 className="title text-lg font-medium">Characters</h2>
            <ul className='flex gap-2'>
              {party.characters && party.characters.map((c) => {
                return <CharacterListModel key={c} characterId={c} />;
              })}
            </ul>
          </>
        )}
      </div>
    </li>
  );
}
