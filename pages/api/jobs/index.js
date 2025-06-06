import { connectToDatabase } from '../../../lib/mongo';
import Job from '../../../models/Job';
import User from '../../../models/User';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'POST') {
    const { title, description, employerId } = req.body;

    // Convert employerId to a valid ObjectId
    let employerObjectId;
    try {
      employerObjectId = mongoose.Types.ObjectId(employerId);  // Convert to ObjectId
    } catch (err) {
      return res.status(400).json({ message: 'Invalid employer ID' });
    }

    // Find the employer by ID
    const employer = await User.findById(employerObjectId);

    if (!employer) {
      return res.status(404).json({ message: 'Employer not found' });
    }

    // Create the job and link it to the employer
    const job = new Job({
      title,
      description,
      employer: employer._id,  // Reference to the employer's _id
    });

    await job.save();
    return res.status(201).json(job);  // Return the created job
  }

  if (req.method === 'GET') {
    const jobs = await Job.find({}) // Fetch all jobs
      .populate('employer', 'name email') // Populate employer info (optional)
      .exec();

    return res.status(200).json(jobs);  // Return the list of jobs
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}