import { ExpensesOutput } from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { useContext, useEffect, useState } from 'react';
import { LoadingOverlay } from '../components/LoadingOverlay';
import { getExpenses } from '../utils/http';
import { ErrorOverlay } from '../components/ErrorOverlay';

export const AllExpenses = () => {
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

    return error && !isLoading ? (
        <ErrorOverlay
            message={error}
            onConfirm={() => {
                setError(null);
            }}
        />
    ) : isLoading ? (
        <LoadingOverlay />
    ) : (
        <ExpensesOutput
            expenses={expensesContext.expenses}
            expensesPeriod='All Expenses'
            fallbackText='No expenses'
        />
    );
};
