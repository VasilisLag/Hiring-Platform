'use client';
import { useState } from 'react';
import PageWrapper from '../../../components/Pagewrapper';
import AuthForm from '../../../components/AuthForm';

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login');

  return (
    <PageWrapper title={mode === 'login' ? 'Σύνδεση' : 'Εγγραφή'}>
      <div className="flex gap-4">
        <button onClick={() => setMode('login')} className="btn">Σύνδεση</button>
        <button onClick={() => setMode('register')} className="btn">Εγγραφή</button>
      </div>

      <AuthForm mode={mode} />
    </PageWrapper>
  );
}