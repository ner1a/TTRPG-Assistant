'use client';

import { useState } from 'react';
import type { User } from '@repo/types';
import LoginModal from './loginModal';
import { useRouter } from 'next/navigation';
import RegisterModal from './registerModal';

const API = process.env.NEXT_PUBLIC_API_URL;

export default function HeaderActions({ user }: { user: User | null }) {
  const router = useRouter();
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [pending, setPending] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function handleLogout() {
    setPending(true);
    setErr(null);
    try {
      await fetch(`${API}/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Logout failed';
      setErr(message);
    } finally {
      setPending(false);
      router.replace('/');
      router.refresh();
    }
  }

  return (
    <div className="flex items-center justify-end gap-3">
      {user ? (
        <>
          <span
            title={user.email ?? ''}
            className="font-semibold text-slate-100/90"
          >
            {user.username ?? 'User'}
          </span>
          <button
            onClick={handleLogout}
            disabled={pending}
            className="relative rounded-md border border-slate-700 px-3 py-1.5 text-slate-100 hover:bg-slate-900 disabled:opacity-60 disabled:text-slate-500 bg-slate-950"
          >
            Logout
            {err && (
              <span className="absolute -bottom-4.5 left-1/2 transform -translate-x-1/2 text-sm text-red-400">
                {err}
              </span>
            )}
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => setOpenLogin(true)}
            className="rounded-md border border-slate-900 px-3 py-1.5 text-slate-100 hover:border hover:border-slate-700"
          >
            Login
          </button>
          <button
            onClick={() => setOpenRegister(true)}
            className="rounded-md border border-slate-700 px-3 py-1.5 text-slate-100 hover:bg-slate-900 bg-slate-950"
          >
            Register
          </button>
          <LoginModal open={openLogin} onClose={() => setOpenLogin(false)} />
          <RegisterModal open={openRegister} onClose={() => setOpenRegister(false)} />
        </>
      )}
    </div>
  );
}
