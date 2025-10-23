// src/components/MatchCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MatchCard = () => {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>AI 추천 상대 카드</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default MatchCard;
