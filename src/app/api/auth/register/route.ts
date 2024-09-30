import { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../../lib/db';
import User from '../../../models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      // เชื่อมต่อกับฐานข้อมูล
      await connectToDatabase();

      // ตรวจสอบว่ามีผู้ใช้ที่ซ้ำอยู่หรือไม่
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
      }

      // สร้าง User ใหม่
      const newUser = new User({ username, password });
      await newUser.save();

      // ไม่ต้อง Response userId กลับ
      res.status(201).json({ message: 'User registered' });
    } catch (error) {
      console.error('Internal server error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
