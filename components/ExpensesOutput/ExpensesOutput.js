import { View, Text, FlatList } from 'react-native';
import { ExpensesList } from './ExpensesList';
import { ExpensesSummary } from './ExpensesSummary';

export const ExpensesOutput = ({ expenses, expensesPeriod }) => {
    return (
        <View>
            <ExpensesSummary
                expenses={expenses}
                periodName={expensesPeriod}
            />
            <ExpensesList />
        </View>
    );
};
