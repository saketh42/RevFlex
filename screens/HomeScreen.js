import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

export default function HomeScreen({navigation}) {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Welcome to RevFlex!</Text>
            <Button title="Start Training" onPress={() => navigation.navigate("Training")} />    
        </View>
    );
};

const styles = StyleSheet.create({
    container: {flex: 1, justifycontent: 'center', alignItems: "center", backgroundColor: '#121212'},
    heading: {fontsize: 24, color: '#fff', fontweight: "bold"},
});
