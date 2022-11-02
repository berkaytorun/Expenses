import { useContext, useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from '../components/Button';
import { IconButton } from '../components/IconButton';
import { ExpensesContext } from '../store/expenses-context';
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
            <View style={styles.buttonContainer}>
                <Button
                    style={styles.button}
                    mode='flat'
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    Cancel
                </Button>
                <Button
                    onPress={() => {
                        if (isEditing) {
                            expensesContext.updateExpense(expenseId, {
                                description: 'Test!!!!',
                                amount: 2.99,
                                date: new Date(),
                            });
                        } else {
                            expensesContext.addExpense({
                                description: 'Test',
                                amount: 100,
                                date: new Date(),
                            });
                        }
                        navigation.goBack();
                    }}
                    style={styles.button}
                >
                    {isEditing ? 'Update' : 'Add'}
                </Button>
            </View>
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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        marginHorizontal: 4,
        minWidth: 100,
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 3,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center',
    },
});
