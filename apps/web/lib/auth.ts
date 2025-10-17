import { cookies } from 'next/headers';
import { User } from '@repo/types';

const API = process.env.NEXT_PUBLIC_API_URL;

export async function getUser(): Promise<User | null> {
  const acc = (await cookies()).get('acc')?.value;
  if (!acc) return null;

  const res = await fetch(`${API}/auth/me`, {
    headers: { Cookie: `acc=${acc}` },
    cache: 'no-store',
  });
  if (!res.ok) return null;
  const data = (await res.json()) as { user?: User } | null;
  return data?.user ?? null;
}
