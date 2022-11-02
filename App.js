import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { AllExpenses } from './screens/AllExpenses';
import { ManageExpense } from './screens/ManageExpense';
import { RecentExpenses } from './screens/RecentExpenses';
import { GlobalStyles } from './utils/styles';
import { IconButton } from './components/IconButton';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

const ExpensesOverview = () => {
    return (
        <BottomTabs.Navigator
            screenOptions={({ navigation }) => ({
                headerStyle: { backgroundColor: GlobalStyles.colors.primary400 },
                headerTintColor: GlobalStyles.colors.primary100,
                tabBarStyle: { backgroundColor: GlobalStyles.colors.primary400 },
                tabBarActiveTintColor: GlobalStyles.colors.accent500,
                headerRight: ({ tintColor }) => (
                    <IconButton
                        size={24}
                        icon='add-circle-outline'
                        color={tintColor}
                        onPress={() => navigation.navigate('ManageExpense')}
                    />
                ),
            })}
        >
            <BottomTabs.Screen
                name='RecentExpenses'
                component={RecentExpenses}
                options={{
                    title: 'Recent Expenses',
                    tabBarLabel: 'Recent',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name='hourglass'
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            <BottomTabs.Screen
                name='AllExpenses'
                component={AllExpenses}
                options={{
                    title: 'All Expenses',
                    tabBarLabel: 'All Expnses',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name='calendar'
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
        </BottomTabs.Navigator>
    );
};

export default function App() {
    return (
        <>
            <StatusBar style='auto' />
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name='ExpensesOverview'
                        component={ExpensesOverview}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name='ManageExpense'
                        component={ManageExpense}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}
