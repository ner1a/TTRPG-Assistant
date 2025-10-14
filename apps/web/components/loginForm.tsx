"use client";
import { useState } from "react";

export default function LoginForm({handleLogin}: Readonly<{handleLogin: (email: string, password: string) => void;}>) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleLogin(email, password);
    }} className="max-w-md mx-auto p-6 border border-gray-300 rounded-2xl flex gap-4 flex-col">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <div className="mb-4">
            <input type="email" id="email" name="email" placeholder='Email' className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-6">
            <input type="password" id="password" name="password" placeholder='Password' className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className="bg-white p-2 text-black rounded-lg hover:bg-gray-500" type="submit">Login</button>
    </form>
    );
}