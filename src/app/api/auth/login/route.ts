import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase  from '../../../lib/db';
import User from '../../../models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      // เชื่อมต่อกับฐานข้อมูล
      await connectToDatabase();

      // ตรวจสอบผู้ใช้ที่มี username และ password ตรงกัน
      const user = await User.findOne({ username, password });

      if (user) {
        // ไม่ต้อง Response userId กลับ
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error('Internal server error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
