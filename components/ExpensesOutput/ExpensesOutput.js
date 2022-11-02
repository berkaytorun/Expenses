import { View, Text, FlatList, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../utils/styles';
import { ExpensesList } from './ExpensesList';
import { ExpensesSummary } from './ExpensesSummary';

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

export const ExpensesOutput = ({ expenses, expensesPeriod }) => {
    return (
        <View style={styles.container}>
            <ExpensesSummary
                expenses={DUMMY_EXPENSES}
                periodName={expensesPeriod}
            />
            <ExpensesList expenses={DUMMY_EXPENSES} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 18,
        paddingBottom: 0,
        backgroundColor: GlobalStyles.colors.primary500,
        flex: 1,
    },
});
