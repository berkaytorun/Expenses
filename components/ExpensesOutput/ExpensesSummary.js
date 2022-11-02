import { View, Text } from 'react-native';

export const ExpensesSummary = ({ periodName, expenses }) => {
    return (
        <View>
            <Text>{periodName}</Text>
            <Text>€ {expenses.reduce((total, expense) => total + expense.amount, 0).toFixed(2)}</Text>
        </View>
    );
};
