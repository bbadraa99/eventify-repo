'use client';
import React, { useEffect, useState } from 'react';
import { useSignInWithEmailAndPassword, useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/config';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../Sign.module.css';

const SigninPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const [signInWithEmailAndPassword, user, loading, error] = useSignInWithEmailAndPassword(auth);
  const [createUserWithEmailAndPassword, userSignUp, loadingSignUp, errorSignUp] = useCreateUserWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        if (password !== confirmPassword) {
          alert('Passwords do not match!');
          return;
        }
        const res = await createUserWithEmailAndPassword(email, password);
      } else {
        const res = await signInWithEmailAndPassword(email, password);
      }
      sessionStorage.setItem('user', 'true');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      router.push('/');
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (user || userSignUp) {
      router.push('/');
    }
  }, [user, userSignUp, router]);

  useEffect(() => {
    const interval = setInterval(() => {
      const show = document.querySelector(`.${styles.carousel} .${styles.image}.${styles.show}`);
      const next = show?.nextElementSibling || document.querySelector(`.${styles.carousel} .${styles.image}:first-child`);
      if (show) show.classList.remove(styles.show);
      if (next) next.classList.add(styles.show);

      const textGroup = document.querySelector(`.${styles.textGroup}`);
      if (textGroup) {
        const active = document.querySelector(`.${styles.bullets} .${styles.active}`);
        const nextBullet = active?.nextElementSibling || document.querySelector(`.${styles.bullets} span:first-child`);
        const index = nextBullet?.getAttribute('data-value');

        if (active) active.classList.remove(styles.active);
        if (nextBullet) nextBullet.classList.add(styles.active);
        //if (textGroup && index) textGroup.style.transform = `translateY(-${index - 1} * 2.2rem)`;
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-10">
      <div className={`flex flex-col lg:flex-row bg-white shadow-lg rounded-5xl overflow-hidden max-w-4xl w-full ${isSignUp ? styles.reverse : ''}`}>
        <div className={`flex flex-col justify-center items-center py-8 px-16 lg:w-1/2 bg-white ${styles.formContainer}`}>
          <div className="text-4xl font-bold mb-6">Eventify</div>
          <h2 className="text-3xl font-bold mb-6 text-center text-black">{isSignUp ? 'Create an Account' : 'Welcome Back'}</h2>
          <p className="text-center text-gray-700 mb-6">
            {isSignUp ? (
              <>
                Already have an account?{' '}
                <button onClick={() => setIsSignUp(false)} className="text-indigo-600">
                  Sign in
                </button>
              </>
            ) : (
              <>
                Not registered yet?{' '}
                <button onClick={() => setIsSignUp(true)} className="text-indigo-600">
                  Sign up
                </button>
              </>
            )}
          </p>
          <form onSubmit={handleSubmit} className="w-full max-w-sm">
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
                className="mt-1 block w-full px-3 py-2 bg-gray-100 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
                className="mt-1 block w-full px-3 py-2 bg-gray-100 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            {isSignUp && (
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-gray-100 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            )}
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="w-full bg-black text-white px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {isSignUp ? 'Sign Up' : 'Sign In'}
              </button>
            </div>
          </form>
          {!isSignUp && (
            <p className="pt-4 text-gray-700">
              Forgotten your password or your login details? <Link href="/reset-password" className="text-indigo-600">Get help</Link>
            </p>
          )}
        </div>
        <div className={`hidden lg:flex lg:w-1/2 m-8 items-center justify-center relative ${styles.carouselContainer}`}>
          <div className={styles.carousel}>
            <div className={styles.imagesWrapper}>
              <Image src="/images/sign-in-1.png" className={`${styles.image} ${styles.img1} ${styles.show}`} alt="Create your own courses" fill />
              <Image src="/images/sign-in-2.png" className={`${styles.image} ${styles.img2}`} alt="Customize as you like" fill />
              <Image src="/images/sign-in-3.png" className={`${styles.image} ${styles.img3}`} alt="Invite students to your class" fill />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
