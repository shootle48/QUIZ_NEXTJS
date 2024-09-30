import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../lib/db';
import Expense from '../../models/Expense';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    await connectToDatabase();
    const { id, amount, date, type, note } = req.body;

    try {
      const updatedExpense = await Expense.findByIdAndUpdate(id, { amount, date, type, note }, { new: true });
      res.status(200).json({ message: 'Expense updated', expense: updatedExpense });
    } catch (error) {
      res.status(500).json({ message: 'Error updating expense', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
