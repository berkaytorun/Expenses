import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input } from './Input';
import { Button } from '../Button';
import { getFormattedDate } from '../../utils/date';
import { GlobalStyles } from '../../utils/styles';

export const ExpenseForm = ({ onCancel, onSubmit, submitButtonLabel, defaultValues }) => {
    const [inputs, setInputs] = useState({
        amount: {
            value: defaultValues ? defaultValues.amount.toString() : '',
            isValid: true,
        },
        date: {
            value: defaultValues ? getFormattedDate(defaultValues.date) : getFormattedDate(new Date()),
            isValid: true,
        },
        description: {
            value: defaultValues ? defaultValues.description : '',
            isValid: true,
        },
    });

    const submitHandler = () => {
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value.replace(/(\d+[/])(\d+[/])/, '$2$1')),
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
                    invalid={!inputs.amount.isValid}
                    textInputConfig={{
                        keyboardType: 'decimal-pad',
                        onChangeText: (inputText) => {
                            setInputs((curInputValues) => {
                                return {
                                    ...curInputValues,
                                    amount: {
                                        value: Number(inputText.replace(',', '.')),
                                        isValid: true,
                                    },
                                };
                            });
                        },
                        value: inputs.amount.value,
                    }}
                />
                <Input
                    style={styles.rowInput}
                    label='Date'
                    invalid={!inputs.date.isValid}
                    textInputConfig={{
                        placeholder: 'DD/MM/YYYY',
                        maxLength: 10,
                        onChangeText: (inputText) => {
                            setInputs((curInputValues) => {
                                return {
                                    ...curInputValues,
                                    date: {
                                        value: inputText,
                                        isValid: true,
                                    },
                                };
                            });
                        },
                        value: inputs.date.value,
                    }}
                />
            </View>
            <Input
                label='Description'
                invalid={!inputs.description.isValid}
                textInputConfig={{
                    multiline: true,
                    onChangeText: (inputText) => {
                        setInputs((curInputValues) => {
                            return {
                                ...curInputValues,
                                description: {
                                    value: inputText,
                                    isValid: true,
                                },
                            };
                        });
                    },
                    value: inputs.description.value,
                }}
            />
            {inputs.amount.isValid && inputs.date.isValid && inputs.description.isValid ? null : (
                <Text style={styles.errorText}>Invalid input Values</Text>
            )}
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
    errorText: {
        color: GlobalStyles.colors.error500,
        textAlign: 'center',
        marginHorizontal: 8,
        marginBottom: 10,
    },
});
