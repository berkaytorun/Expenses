import { useContext, useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton } from '../components/IconButton';
import { ExpenseForm } from '../components/ManageExpense/ExpenseForm';
import { ExpensesContext } from '../store/expenses-context';
import { storeExpense } from '../utils/http';
import { GlobalStyles } from '../utils/styles';

export const ManageExpense = ({ route, navigation }) => {
    const expenseId = route.params?.expenseId;
    const isEditing = !!expenseId;

    const expensesContext = useContext(ExpensesContext);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense',
        });
    }, [navigation, isEditing]);

    return (
        <View style={styles.container}>
            <ExpenseForm
                onCancel={() => navigation.goBack()}
                onSubmit={async (expenseData) => {
                    if (isEditing) {
                        expensesContext.updateExpense(expenseId, expenseData);
                    } else {
                        const id = await storeExpense(expenseData);
                        expensesContext.addExpense({ ...expenseData, id: id });
                    }
                    navigation.goBack();
                }}
                submitButtonLabel={isEditing ? 'Update' : 'Add'}
                defaultValues={isEditing ? expensesContext.expenses.find((expense) => expense.id === expenseId) : null}
            />
            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton
                        icon='trash'
                        color={GlobalStyles.colors.error500}
                        size={36}
                        onPress={() => {
                            expensesContext.deleteExpense(expenseId);
                            navigation.goBack();
                        }}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: GlobalStyles.colors.primary800,
        padding: 12,
    },

    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 3,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center',
    },
});
