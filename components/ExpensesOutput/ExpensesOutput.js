import { View, Text, FlatList, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../utils/styles';
import { ExpensesList } from './ExpensesList';
import { ExpensesSummary } from './ExpensesSummary';


export const ExpensesOutput = ({ expenses, expensesPeriod }) => {
    

    return (
        <View style={styles.container}>
            <ExpensesSummary
                expenses={expenses}
                periodName={expensesPeriod}
            />
            <ExpensesList expenses={expenses} />
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
