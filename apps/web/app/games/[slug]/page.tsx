import { Game, Party } from '@repo/types';
import { cookies } from 'next/headers';
import styles from './gameDetails.module.css';
import EditIcon from '../../../public/icons/EditIcon.svg';
import Link from 'next/link';
import PartyModel from '../../../components/partyModel';

const API = process.env.NEXT_PUBLIC_API_URL;

export default async function GameDetails({
  searchParams,
}: {
  searchParams: { id: string };
}) {
  const acc = (await cookies()).get('acc')?.value;
  if (!acc) return null;

  const { id } = await searchParams;

  const res = await fetch(`${API}/game/${encodeURIComponent(id)}`, {
    headers: { Cookie: `acc=${acc}` },
    cache: 'no-store',
  });

  if (!res.ok) return null;
  const game: Game = await res.json();

  let parties: Party[] = [];
  if (Array.isArray(game.parties) && game.parties.length > 0) {
    const fetchPromises = game.parties.map((partyId: string) =>
      fetch(`${API}/party/${encodeURIComponent(partyId)}`, {
        headers: { Cookie: `acc=${acc}` },
        cache: 'no-store',
      })
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null),
    );

    parties = await Promise.all(fetchPromises);
  }

  return (
    <div
      className={
        'flex flex-col gap-3 p-6 px-8 mt-4 rounded-xl ' +
        styles.gameDetailContainer
      }
      key={game._id}
    >
      <h1 className={'self-center ' + styles.gameName}>{game.title}</h1>
      <h2 className={styles.titles}>System</h2>
      <span className={'indent-6 ' + styles.contents}>{game.system}</span>
      <h2 className={styles.titles}>Description</h2>
      <p className={'indent-6 ' + styles.contents}>{game.description}</p>
      <div>
        <h2 className={styles.titles}>Game Notes</h2>
      </div>
      <div>
        <h2 className={styles.titles}>Sessions</h2>
      </div>
      <div>
        <h2 className={styles.titles}>Parties</h2>
        {
          <div className="mt-4 flex flex-col gap-2">
            {parties.length === 0 ? (
              <span className="indent-6">No parties in this game.</span>
            ) : (
              <ul>
                {parties.map((p) => {
                  return <PartyModel key={p._id} partyId={p._id} />;
                })}
              </ul>
            )}
          </div>
        }
      </div>
    </div>
  );
}
