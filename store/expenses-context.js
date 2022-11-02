import { createContext, useReducer } from 'react';

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({ description, amount, date }) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, { description, amount, date }) => {},
});

const expensesReducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            const id = new Date().toString() + Math.random().toString();
            return [{ ...action.payload, id: id }, ...state];
        case 'UPDATE':
            return state.map((expense) => {
                if (expense.id === action.payload.id) {
                    return { ...expense, ...action.payload.data };
                }
                return expense;
            });
        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload);
        default:
            return state;
    }
};

export const ExpensesContextProvider = ({ children }) => {
    const [expansesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

    const addExpense = (expenseData) => {
        dispatch({
            type: 'ADD',
            payload: expenseData,
        });
    };

    const deleteExpense = (id) => {
        dispatch({
            type: 'DELETE',
            payload: id,
        });
    };

    const updateExpense = (id, expenseData) => {
        dispatch({
            type: 'UPDATE',
            payload: {
                id: id,
                data: expenseData,
            },
        });
    };

    const value = {
        expenses: expansesState,
        addExpense,
        deleteExpense,
        updateExpense,
    };

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
};

const DUMMY_EXPENSES = [
    { id: 'e1', description: 'Rent', amount: 850, date: new Date(2022, 10, 2) },
    { id: 'e2', description: 'Groceries', amount: 149.99, date: new Date(2022, 9, 21) },
    { id: 'e3', description: 'Gas', amount: 99.99, date: new Date(2022, 9, 18) },
    { id: 'e4', description: 'Car Insurance', amount: 199.99, date: new Date(2022, 9, 15) },
    { id: 'e5', description: 'Gym', amount: 15.99, date: new Date(2022, 9, 14) },
    { id: 'e6', description: 'Phone', amount: 29.99, date: new Date(2022, 9, 13) },
    { id: 'e7', description: 'Electricity', amount: 30, date: new Date(2022, 9, 12) },
    { id: 'e8', description: 'Internet', amount: 30, date: new Date(2022, 9, 11) },
    { id: 'e9', description: 'Cinema', amount: 12.99, date: new Date(2022, 9, 10) },
    { id: 'e10', description: 'Coffee', amount: 3.59, date: new Date(2022, 9, 5) },
];
