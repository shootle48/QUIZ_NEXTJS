"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { NextApiRequest, NextApiResponse } from "next";
import  connectToDatabase  from "../../lib/db";
import User from "../../models/User";

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await connectToDatabase();
    const { username, password } = req.body;

    try {
      // ตรวจสอบว่ามี username ซ้ำหรือไม่
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(409).json({ message: "User already exists" });
      }

      // สร้างผู้ใช้ใหม่
      const newUser = new User({ username, password });
      await newUser.save();

      res.status(201).json({ message: "User registered", userId: newUser._id });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

export function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      // Redirect to login page after successful registration
      router.push("/auth/login");
    } else {
      const errorData = await res.json();
      alert(`Registration failed: ${errorData.message || "Unknown error"}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="input"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="input"
        />
        <button type="submit" className="btn-primary w-full">
          Register
        </button>
      </form>
      <p className="mt-4">
        Already have an account?{" "}
        <a href="/auth/login" className="text-blue-600">
          Login
        </a>
      </p>
    </div>
  );
}
