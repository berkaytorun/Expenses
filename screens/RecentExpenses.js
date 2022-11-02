import { useContext } from 'react';
import { ExpensesOutput } from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../utils/date';

export const RecentExpenses = () => {
    const expensesContext = useContext(ExpensesContext);

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
