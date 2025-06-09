import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../../../lib/mongo';
import User, { IUser, UserRole } from '../../../models/User';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectToDatabase();

  if (req.method === 'GET') {
    try {
      const users: IUser[] = await User.find({});
      return res.status(200).json(users);
    } catch (err) {
      console.error('Failed to fetch users:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  if (req.method === 'POST') {
    const { name, email, role } = req.body as {
      name: string;
      email: string;
      role: UserRole;
    };

    try {
      const user = new User({ name, email, role });
      await user.save();
      return res.status(201).json(user);
    } catch (err) {
      console.error('Error creating user:', err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  return res.status(405).json({ message: 'Method Not Allowed' });
}