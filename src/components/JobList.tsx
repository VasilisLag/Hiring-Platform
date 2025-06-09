'use client';

import { useEffect, useState } from 'react';

interface Employer {
  _id: string;
  name: string;
}

interface Job {
  _id: string;
  title: string;
  description: string;
  employer: Employer;
}

interface JobListProps {
  refresh?: boolean;
}

const JobList = ({ refresh }: JobListProps) => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    async function fetchJobs() {
      try {
        const response = await fetch('/api/jobs');
        const data = await response.json();
        setJobs(data);
      } catch (err) {
        console.error('Failed to fetch jobs:', err);
      }
    }
    fetchJobs();
  }, [refresh]);

  if (!jobs) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Job Listings</h2>
      {jobs.length > 0 ? (
        jobs.map((job) => (
          <div key={job._id} className="border p-4 rounded-lg shadow-sm">
            <h3 className="text-xl font-bold">{job.title}</h3>
            <p>{job.description}</p>
            <p className="text-gray-500">Employer: {job.employer.name}</p>
          </div>
        ))
      ) : (
        <p>No job listings available.</p>
      )}
    </div>
  );
};

export default JobList;