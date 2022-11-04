import { useContext, useEffect, useState } from 'react';
import { ErrorOverlay } from '../components/ErrorOverlay';
import { ExpensesOutput } from '../components/ExpensesOutput/ExpensesOutput';
import { LoadingOverlay } from '../components/LoadingOverlay';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../utils/date';
import { getExpenses } from '../utils/http';

export const RecentExpenses = () => {
    const expensesContext = useContext(ExpensesContext);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getExpenseHelper = async () => {
            setIsLoading(true);
            try {
                const expenses = await getExpenses();
                expensesContext.setExpenses(expenses);
            } catch (error) {
                setError('Could not fetch expenses');
            }
            setIsLoading(false);
        };

        getExpenseHelper();
    }, []);

    const recentExpenses = expensesContext.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);
        return expense.date >= date7DaysAgo;
    });

    return error && !isLoading ? (
        <ErrorOverlay message={error} onConfirm={()=>{
            setError(null);
        }} />
    ) : isLoading ? (
        <LoadingOverlay />
    ) : (
        <ExpensesOutput
            expenses={recentExpenses}
            expensesPeriod='Recent'
            fallbackText='No recent expenses'
        />
    );
};
