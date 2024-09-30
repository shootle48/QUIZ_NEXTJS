import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../lib/db';
import Expense from '../../models/Expense';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    await connectToDatabase();
    const { id } = req.query;

    try {
      await Expense.findByIdAndDelete(id);
      res.status(200).json({ message: 'Expense deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting expense', error });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
