import { View, Text, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../utils/styles';

export const ExpensesSummary = ({ periodName, expenses }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.periodText}>{periodName}</Text>
            <Text style={styles.amountText}>
                € {expenses.reduce((total, expense) => total + expense.amount, 0).toFixed(2)}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 5,
        padding: 10,
        backgroundColor: GlobalStyles.colors.primary50,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    periodText: {
        fontSize: 12,
        color: GlobalStyles.colors.primary400,
    },
    amountText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: GlobalStyles.colors.primary500,
    },
});
