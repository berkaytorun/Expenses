import { useContext, useEffect, useState } from 'react';
import { ExpensesOutput } from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../utils/date';
import { getExpenses } from '../utils/http';

export const RecentExpenses = () => {
    const expensesContext = useContext(ExpensesContext);

    useEffect(() => {
        const getExpenseHelper = async () => {
            const expenses = await getExpenses();
            expensesContext.setExpenses(expenses);
        };

        getExpenseHelper();
    }, []);

    const recentExpenses = expensesContext.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);
        return expense.date >= date7DaysAgo;
    });

    return (
        <ExpensesOutput
            expenses={recentExpenses}
            expensesPeriod='Recent'
            fallbackText='No recent expenses'
        />
    );
};
