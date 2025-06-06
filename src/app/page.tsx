import JobForm from '../../components/JobForm';
import JobList from '../../components/JobList';

export default function Home() {
  const employerId = "60b2f12e8f8c2c2b88d8b5f7"; // Use an actual employer ID here

  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-center sm:text-left mb-6">Welcome to the Hiring Platform</h1>

        {/* Job Form Component */}
        <JobForm employerId={employerId} />

        {/* Job List Component */}
        <JobList />
      </main>
    </div>
  );
}