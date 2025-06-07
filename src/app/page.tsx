"use client";
import { useState } from 'react';

import JobForm from '../../components/JobForm';
import JobList from '../../components/JobList';

export default function Home() {
  const [refresh, setRefresh] = useState(0);

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-center sm:text-left mb-6">Welcome to the Hiring Platform</h1>

        {/* Job Form Component */}
        <JobForm onJobCreated={() => setRefresh(r => r + 1)} />

        {/* Job List Component */}
        <JobList refresh={refresh} />
      </main>
    </div>
  );
}