'use client'
import { useState } from 'react';

const ExpenseForm = ({ onSubmit }) => {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('expense');
  const [note, setNote] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ amount, date, type, note });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount" className="input" />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input" />
      <select value={type} onChange={(e) => setType(e.target.value)} className="input">
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <input type="text" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Note" className="input" />
      <button type="submit" className="btn-primary">Add Expense</button>
    </form>
  );
};

export default ExpenseForm;
