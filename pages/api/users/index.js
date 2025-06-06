// pages/api/users/index.js
import { connectToDatabase } from '../../../lib/mongo';
import User from '../../../models/User';

export default async function handler(req, res) {
  await connectToDatabase();

  if (req.method === 'GET') {
    const users = await User.find({});
    return res.status(200).json(users);
  }

  if (req.method === 'POST') {
    const { name, email, role } = req.body;
    const user = new User({ name, email, role });
    await user.save();
    return res.status(201).json(user);
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}