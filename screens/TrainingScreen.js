import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

export default function TrainingScreen({navigation}) {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}> Training Mode </Text>
            <Button title="Start Reaction Test" onPress = {() => navigation.navigate("ReactionTest")}></Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex:1, justifyContent: "center", alignItems: "center", backgroundColour: '#121212'},
    heading: { fontSize: 24, color: '#fff', fontWeight: "bold"},
});