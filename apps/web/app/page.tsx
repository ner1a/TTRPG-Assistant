"use client";
import LoginForm from '../components/loginForm';
import styles from './page.module.css';

export default function Home() {

  async function handleLogin(email: string, password: string) {
    
    const res = await fetch(`http://localhost:3000/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    console.log('Response data:', data);
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <LoginForm handleLogin={handleLogin} />
      </main>
    </div>
  );
}
