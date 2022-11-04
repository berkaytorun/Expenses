import { useContext, useLayoutEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ErrorOverlay } from '../components/ErrorOverlay';
import { IconButton } from '../components/IconButton';
import { LoadingOverlay } from '../components/LoadingOverlay';
import { ExpenseForm } from '../components/ManageExpense/ExpenseForm';
import { ExpensesContext } from '../store/expenses-context';
import { deleteExpense, storeExpense, updateExpense } from '../utils/http';
import { GlobalStyles } from '../utils/styles';

export const ManageExpense = ({ route, navigation }) => {
    const expenseId = route.params?.expenseId;
    const isEditing = !!expenseId;

    const expensesContext = useContext(ExpensesContext);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense',
        });
    }, [navigation, isEditing]);

    return error && !isLoading ? (
        <ErrorOverlay
            message={error}
            onConfirm={() => setError(null)}
        />
    ) : isLoading ? (
        <LoadingOverlay />
    ) : (
        <View style={styles.container}>
            <ExpenseForm
                onCancel={() => navigation.goBack()}
                onSubmit={async (expenseData) => {
                    setIsLoading(true);
                    try {
                        if (isEditing) {
                            expensesContext.updateExpense(expenseId, expenseData);
                            await updateExpense(expenseId, expenseData);
                        } else {
                            const id = await storeExpense(expenseData);
                            expensesContext.addExpense({ ...expenseData, id: id });
                        }
                        navigation.goBack();
                    } catch (error) {
                        setError('Could not save expense');
                        setIsLoading(false);
                    }
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
                        onPress={async () => {
                            setIsLoading(true);
                            try {
                                await deleteExpense(expenseId);
                                expensesContext.deleteExpense(expenseId);
                                navigation.goBack();
                            } catch (error) {
                                setError('Could not delete expense');
                                setIsLoading(false);
                            }
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
