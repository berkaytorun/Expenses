import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { GlobalStyles } from '../utils/styles';

export const LoadingOverlay = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator
                size='large'
                color='white'
            />
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
});
