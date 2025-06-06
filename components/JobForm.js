"use client"; // This is required to mark this component as client-side

import { useState } from 'react';

const JobForm = ({ employerId }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const job = { title, description, employerId };
    const response = await fetch('/api/jobs', {
      method: 'POST',
      body: JSON.stringify(job),
      headers: { 'Content-Type': 'application/json' },
    });

    const result = await response.json();
    console.log('Job created:', result);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl w-full bg-white p-8 rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-semibold text-center">Create a Job Listing</h2>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label htmlFor="title" className="text-lg font-medium">Job Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the job title"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="description" className="text-lg font-medium">Job Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-2 p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Enter the job description"
          />
        </div>
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create Job
        </button>
      </div>
    </form>
  );
};

export default JobForm;