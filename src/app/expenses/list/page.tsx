'use client'
import { useEffect, useState } from "react";
import { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../../lib/db";
import Expense from "../../models/Expense";

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    await connectToDatabase();

    try {
      const expenses = await Expense.find();
      res.status(200).json({ expenses });
    } catch (error) {
      console.error("Error fetching expenses:", error);
      res.status(500).json({ message: "Error fetching expenses", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

export default function ExpenseListPage() {
    const [expenses, setExpenses] = useState([]);
  
    useEffect(() => {
      const fetchExpenses = async () => {
        const res = await fetch("/api/expenses/list"); 
        const data = await res.json();
        setExpenses(data.expenses);
      };
  
      fetchExpenses();
    }, []);
  
    const handleDelete = async (id: string) => {
      const res = await fetch(`/api/expenses/delete?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setExpenses(expenses.filter((expense) => expense._id !== id));
      }
    };
  
    return (
      <div className="max-w-md mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4">Expense List</h1>
        <ul className="space-y-4">
          {expenses.map((expense) => (
            <li
              key={expense._id}
              className="p-4 border rounded-lg flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{expense.amount} USD</p>
                <p className="text-sm">
                  {new Date(expense.date).toLocaleDateString()}
                </p>
                <p className="text-xs">{expense.note}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleDelete(expense._id)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
