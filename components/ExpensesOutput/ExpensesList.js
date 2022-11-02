import { FlatList, Text } from 'react-native';
import { ExpenseItem } from './ExpenseItem';

export const ExpensesList = ({ expenses }) => {
    return (
        <FlatList
            showsVerticalScrollIndicator={false}
            data={expenses}
            keyExtractor={(item, index) => item.id}
            renderItem={(itemData)=> <ExpenseItem  {...itemData.item}/>}
        />
    );
};
