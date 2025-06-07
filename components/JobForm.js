"use client";

import { useState } from 'react';

const JobForm = ({ onJobCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [employer, setEmployer] = useState(''); // Νέο state

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/api/jobs', {
      method: 'POST',
      body: JSON.stringify({ title, description, employer }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (onJobCreated) onJobCreated();
    setTitle('');
    setDescription('');
    setEmployer('');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl w-full bg-white p-8 rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-semibold text-center">Create a Job Listing</h2>

      <div className="flex flex-col gap-4">
        {/* Employer Field */}
        <div className="flex flex-col">
          <label htmlFor="employer" className="text-lg font-medium">Employer</label>
          <input
            type="text"
            id="employer"
            value={employer}
            onChange={(e) => setEmployer(e.target.value)}
            className="mt-2 p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter employer name"
            required
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="title" className="text-lg font-medium">Job Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-2 p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter the job title"
            required
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
            required
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