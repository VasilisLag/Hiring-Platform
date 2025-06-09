import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/mongo';
import Job from '../../../models/Job';
import User from '../../../models/User';
import { IUser } from '../../../models/User';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase();

  if (req.method === 'POST') {
    const { title, description, employer } = req.body as {
      title: string;
      description: string;
      employer: string;
    };

    try {
      // Βρες ή δημιούργησε employer
      let employerUser: IUser | null = await User.findOne({ name: employer, role: 'employer' });

      if (!employerUser) {
        const email = `${employer.replace(/\s+/g, '').toLowerCase()}@example.com`;
        employerUser = await User.create({
          name: employer,
          email,
          role: 'employer',
        });
      }

      const job = await Job.create({
        title,
        description,
        employer: employerUser._id,
      });

      return res.status(201).json(job);
    } catch (err) {
      console.error('Error creating job:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  if (req.method === 'GET') {
    try {
      const jobs = await Job.find({})
        .populate('employer', 'name email')
        .exec();

      return res.status(200).json(jobs);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}