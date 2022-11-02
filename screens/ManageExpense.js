import { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from '../components/Button';
import { IconButton } from '../components/IconButton';
import { GlobalStyles } from '../utils/styles';

export const ManageExpense = ({ route, navigation }) => {
    const expenseId = route.params?.expenseId;
    const isEditing = !!expenseId;

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
                >
                    Cancel
                </Button>
                <Button style={styles.button}>{isEditing ? 'Update' : 'Add'}</Button>
            </View>
            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton
                        icon='trash'
                        color={GlobalStyles.colors.error500}
                        size={24}
                        onPress={() => {}}
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
