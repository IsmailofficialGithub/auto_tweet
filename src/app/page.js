'use client';

import { useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const callAPI = async (route) => {
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch(`/api/${route}`);
      const data = await res.json();
      setMessage(data.message || 'Success!');
    } catch (err) {
      setMessage('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tweet Sender</h1>
      <button
        onClick={() => callAPI('autotweet')}
        className="bg-blue-600 text-white px-4 py-2 rounded mr-4"
        disabled={loading}
      >
        Send 10 Auto Tweets
      </button>
      <button
        onClick={() => callAPI('tweet')}
        className="bg-green-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        Send Second Tweet
      </button>

      {loading && <p className="mt-4 text-yellow-600">Processing...</p>}
      {message && <p className="mt-4 text-green-700">{message}</p>}
    </main>
  );
}
