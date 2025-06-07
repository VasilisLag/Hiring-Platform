import { connectToDatabase } from '../../../lib/mongo';
import Job from '../../../models/Job';
import User from '../../../models/User';

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'POST') {
    const { title, description, employer } = req.body;

    // Βρες ή δημιούργησε employer
    let employerUser = await User.findOne({ name: employer, role: 'employer' });
    if (!employerUser) {
      employerUser = await User.create({
        name: employer,
        email: `${employer.replace(/\s+/g, '').toLowerCase()}@example.com`, // dummy email
        role: 'employer',
      });
    }

    const job = await Job.create({
      title,
      description,
      employer: employerUser._id,
    });

    return res.status(201).json(job);
  }

  if (req.method === 'GET') {
    const jobs = await Job.find({})
      .populate('employer', 'name email')
      .exec();

    return res.status(200).json(jobs);
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}