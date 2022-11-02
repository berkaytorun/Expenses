import { View, Text, FlatList, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../utils/styles';
import { ExpensesList } from './ExpensesList';
import { ExpensesSummary } from './ExpensesSummary';

export const ExpensesOutput = ({ expenses, expensesPeriod, fallbackText }) => {
    let fallbackContent = <Text style={styles.fallbackText}>{fallbackText}</Text>;

    return (
        <View style={styles.container}>
            <ExpensesSummary
                expenses={expenses}
                periodName={expensesPeriod}
            />
            {expenses.length > 0 ? <ExpensesList expenses={expenses} /> : fallbackContent}
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
    fallbackText: {
        color: 'white',
        fontsize: 18,
        textAlign: 'center',
        marginTop: 32,
    },
});
