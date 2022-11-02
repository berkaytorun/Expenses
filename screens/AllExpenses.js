import { ExpensesOutput } from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { useContext } from 'react';

export const AllExpenses = () => {
    const expensesContext = useContext(ExpensesContext);

    return (
        <ExpensesOutput
            expenses={expensesContext.expenses}
            expensesPeriod='All Expenses'
            fallbackText='No expenses'
        />
    );
};
