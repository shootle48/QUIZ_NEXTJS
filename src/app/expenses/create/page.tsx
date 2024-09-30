import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase  from '../../lib/db';
import Expense from '../../models/Expense';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    await connectToDatabase();
    const { userId, amount, date, type, note } = req.body;

    try {
      const expense = new Expense({ userId, amount, date, type, note });
      await expense.save();
      res.status(201).json({ message: 'Expense created', expense });
    } catch (error) {
      res.status(500).json({ message: 'Error creating expense', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
