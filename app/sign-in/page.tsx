'use client';
import React, { useEffect, useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/config';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useAuthState } from 'react-firebase-hooks/auth';

const SigninPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await signInWithEmailAndPassword(email, password);
      console.log(res);
      sessionStorage.setItem('user', 'true')
      setEmail('');
      setPassword('');
      router.push('/')
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
      if (user) {
          router.push('/');
      }
  }, [user, router]);

  return (
    <div className="min-h-screen flex items-center pt-10 lg:pt-16  bg-background-10 flex-col justify-items-stretch">
      <div className='bold-32 text-black p-10'>Eventify</div>
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md justify-self-center">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-stone-100 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 bg-stone-100 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-background-10 text-white px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign In
            </button>
          </div>
        </form>
        {error && <p className="text-red-500 text-center mt-4">{error.message}</p>}
        {loading && <p className="text-gray-500 text-center mt-4">Loading...</p>}
        {user && <p className="text-green-500 text-center mt-4">Signed in successfully!</p>}
      </div>
      <p className='pt-4'>Don't have an account? <Link href="/sign-up" className='text-bold text-white'>Sign up</Link></p>
    </div>
  );
};

export default SigninPage;
