import { Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const IconButton = ({ size, icon, color, onPress }) => {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => pressed && styles.pressed}
        >
            <View style={styles.container}>
                <Ionicons
                    name={icon}
                    size={size}
                    color={color}
                />
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 24,
        paddingHorizontal: 6,
        marginHorizontal: 8,
    },
    pressed: {
        opacity: 0.5,
    },
});
