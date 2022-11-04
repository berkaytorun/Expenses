import axios from 'axios';
import { URL } from '../.firebaseUrl';
import { getFormattedDate } from './date';

export const storeExpense = async (expenseData) => {
    const response = await axios.post(URL + 'expenses.json', expenseData);
    const id = response.data.name;
    
    return id;
};

export const getExpenses = async () => {
    const response = await axios.get(URL + 'expenses.json');

    const expenses = [];

    for (const key in response.data) {
        expenses.push({
            id: key,
            date: new Date(response.data[key].date),
            amount: response.data[key].amount,
            description: response.data[key].description,
        });
    }

    return expenses;
};
