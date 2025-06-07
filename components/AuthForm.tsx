'use client';

import { useState } from 'react';

type AuthMode = 'login' | 'register';

interface AuthFormProps {
  mode: AuthMode;
}

export default function AuthForm({ mode }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'candidate' | 'employer'>('candidate');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const payload =
        mode === 'register'
          ? { email, password, name, role }
          : { email, password };

      const response = await fetch(`/api/users/${mode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || 'Σφάλμα');
      } else {
        setMessage(
          mode === 'login'
            ? 'Επιτυχής σύνδεση!'
            : 'Η εγγραφή ήταν επιτυχής. Μπορείς τώρα να συνδεθείς.'
        );
      }
    } catch (error) {
      setMessage('Κάτι πήγε στραβά. Προσπάθησε ξανά.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 space-y-4 bg-white rounded-lg p-6 border shadow"
    >
      {mode === 'register' && (
        <>
          <div>
            <label className="block font-medium">Όνομα</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block font-medium">Ρόλος</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as 'candidate' | 'employer')}
              className="mt-1 w-full p-2 border rounded"
            >
              <option value="candidate">Υποψήφιος</option>
              <option value="employer">Εργοδότης</option>
            </select>
          </div>
        </>
      )}

      <div>
        <label className="block font-medium">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block font-medium">Κωδικός</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 w-full p-2 border rounded"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
      >
        {loading ? 'Παρακαλώ περίμενε...' : mode === 'login' ? 'Σύνδεση' : 'Εγγραφή'}
      </button>

      {message && (
        <div className="text-center mt-2 text-sm text-red-500">{message}</div>
      )}
    </form>
  );
}
