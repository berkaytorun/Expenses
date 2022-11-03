import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Input } from './Input';
import { Button } from '../Button';

export const ExpenseForm = ({ onCancel, onSubmit, submitButtonLabel }) => {
    const [inputValues, setInputValues] = useState({
        amount: '',
        date: '',
        description: '',
    });

    const submitHandler = () => {};

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
                                    amount: inputText,
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
                    onPress={onSubmit}
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
