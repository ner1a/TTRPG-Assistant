'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const API = process.env.NEXT_PUBLIC_API_URL;

export default function LoginModal(props: {
  open: boolean;
  onClose: () => void;
}) {
  const { open, onClose } = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  function clearWhenClose() {
    setError(null);
    setEmail('');
    setPassword('');
  }

  // Close with ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    clearWhenClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  async function submitLogin() {
    setError(null);
    setPending(true);
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message ?? 'Login failed');
      }
      onClose();
      router.replace('/dashboard');
      router.refresh();
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Login failed';
      setError(message);
    } finally {
      setPending(false);
    }
  }

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Side panel */}
      <aside
        className={
          'fixed inset-y-0 right-0 z-50 h-screen w-full max-w-md transform border-l border-slate-800 bg-slate-900 text-slate-100 shadow-2xl transition-transform duration-300 ' +
          (open ? 'translate-x-0' : 'translate-x-full')
        }
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-800 px-5 py-4 ">
          <h3 className="text-lg font-semibold">Sign in</h3>
          <button
            onClick={onClose}
            className="rounded-full h-[40px] w-[40px] p-2 text-slate-300 hover:bg-slate-800 hover:text-white"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 p-5">
          <form
            className="grid gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              submitLogin();
            }}
          >
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 placeholder-slate-500 outline-none ring-0 focus:border-slate-500"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              required
              className="rounded-md border border-slate-700 bg-slate-950 px-3 py-2 placeholder-slate-500 outline-none ring-0 focus:border-slate-500"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            <div className="flex justify-between items-center">
              <p className="pl-3 text-sm text-red-400">{error}</p>
              <div className="self-end flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-md px-3 py-2 text-slate-300 hover:bg-slate-800 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  disabled={pending}
                  className="rounded-md bg-white px-3 py-2 text-slate-900 transition disabled:opacity-60 hover:scale-105"
                >
                  Sign in
                </button>
              </div>
            </div>
          </form>
        </div>
      </aside>
    </>
  );
}
