import axios from 'axios';
import { URL } from '../.firebaseUrl';

export const storeExpense = (expenseData) => {
    axios.post(URL + 'expenses.json', expenseData);
};
