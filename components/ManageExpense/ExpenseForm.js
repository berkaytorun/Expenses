import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input } from './Input';
import { Button } from '../Button';
import { getFormattedDate } from '../../utils/date';

export const ExpenseForm = ({ onCancel, onSubmit, submitButtonLabel, defaultValues }) => {
    const [inputValues, setInputValues] = useState({
        amount: defaultValues ? defaultValues.amount.toString() : '',
        date: defaultValues ? getFormattedDate(defaultValues.date) : getFormattedDate(new Date()),
        description: defaultValues ? defaultValues.description : '',
    });

    const submitHandler = () => {
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value,
        };

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            // Alert.alert('Invalid input', 'Please check your input values');
            setInputs((currentInputs) => {
                return {
                    amount: { value: currentInputs.amount.value, isValid: amountIsValid },
                    date: { value: currentInputs.date.value, isValid: dateIsValid },
                    description: {
                        value: currentInputs.description.value,
                        isValid: descriptionIsValid,
                    },
                };
            });
            return;
        }

        onSubmit(expenseData);
    };

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <Input
                    style={styles.rowInput}
                    label='Amount'
                    textInputConfig={{
                        keyboardType: 'decimal-pad',
                        onChangeText: (inputText) => {
                            setInputValues((curInputValues) => {
                                return {
                                    ...curInputValues,
                                    amount: Number(inputText.replace(',', '.')),
                                };
                            });
                        },
                        value: inputValues.amount,
                    }}
                />
                <Input
                    style={styles.rowInput}
                    label='Date'
                    textInputConfig={{
                        placeholder: 'DD/MM/YYYY',
                        maxLength: 10,
                        onChangeText: (inputText) => {
                            setInputValues((curInputValues) => {
                                return {
                                    ...curInputValues,
                                    date: inputText,
                                };
                            });
                        },
                        value: inputValues.date,
                    }}
                />
            </View>
            <Input
                label='Description'
                textInputConfig={{
                    multiline: true,
                    onChangeText: (inputText) => {
                        setInputValues((curInputValues) => {
                            return {
                                ...curInputValues,
                                description: inputText,
                            };
                        });
                    },
                    value: inputValues.description,
                }}
            />
            <View style={styles.buttonContainer}>
                <Button
                    style={styles.button}
                    mode='flat'
                    onPress={onCancel}
                >
                    Cancel
                </Button>
                <Button
                    onPress={submitHandler}
                    style={styles.button}
                >
                    {submitButtonLabel}
                </Button>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    form: {
        marginTop: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 24,
        textAlign: 'center',
    },
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowInput: {
        flex: 1,
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
});
