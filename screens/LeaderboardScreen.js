import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function LeaderboardScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Leaderboard</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#121212'},
    heading: {fontSize: 24, color: '#fff', fontWeight: "bold"},
});