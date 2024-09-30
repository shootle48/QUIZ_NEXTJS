import mongoose, { Schema, Document, Model } from 'mongoose';

interface IExpense extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  amount: number;
  date: Date;
  type: 'income' | 'expense';
  note?: string;
}

const expenseSchema: Schema<IExpense> = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
  note: { type: String },
});

const Expense: Model<IExpense> = mongoose.models.Expense || mongoose.model<IExpense>('Expense', expenseSchema);

export default Expense;
