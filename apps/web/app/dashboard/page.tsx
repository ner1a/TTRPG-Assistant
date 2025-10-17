import { redirect } from 'next/navigation';
import { getUser } from '../../lib/auth';

export default async function DashboardPage() {
  const me = await getUser();
  if (me === null) redirect('/');

  return (
    <section className="m-auto flex justify-center flex-col items-center py-4">
      <h1 className='text-3xl font-bold'>
        Welcome{me.username ? `, ${me.username}` : ''}!
      </h1>
    </section>
  );
}
