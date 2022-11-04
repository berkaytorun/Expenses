import { useContext, useEffect, useState } from 'react';
import { ExpensesOutput } from '../components/ExpensesOutput/ExpensesOutput';
import { LoadingOverlay } from '../components/loadingOverlay';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../utils/date';
import { getExpenses } from '../utils/http';

export const RecentExpenses = () => {
    const expensesContext = useContext(ExpensesContext);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const getExpenseHelper = async () => {
            setIsLoading(true);
            const expenses = await getExpenses();
            setIsLoading(false);
            expensesContext.setExpenses(expenses);
        };

        getExpenseHelper();
    }, []);

    const recentExpenses = expensesContext.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);
        return expense.date >= date7DaysAgo;
    });

    return isLoading ? (
        <LoadingOverlay />
    ) : (
        <ExpensesOutput
            expenses={recentExpenses}
            expensesPeriod='Recent'
            fallbackText='No recent expenses'
        />
    );
};
