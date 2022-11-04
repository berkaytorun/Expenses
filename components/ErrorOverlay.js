import { View, Text, StyleSheet } from 'react-native';
import { GlobalStyles } from '../utils/styles';
import { Button } from './Button';

export const ErrorOverlay = ({ message, onConfirm }) => {
    return (
        <View style={styles.container}>
            <Text style={[styles.text, styles.title]}>Something went wrong</Text>
            <Text style={styles.text}>{message}</Text>
            <Button onPress={onConfirm}>Okay</Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 12,
        backgroundColor: GlobalStyles.colors.primary500,
    },
    text: {
        textAlign: 'center',
        marginBottom: 12,
        color: 'white',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
