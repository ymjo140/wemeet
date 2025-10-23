// src/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
// MatchCard 컴포넌트를 import하여 사용합니다.

const HomeScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>개인 만남 추천</Text>
            <View style={{ padding: 15 }}>
                <Text style={styles.subHeader}>AI 기반 오늘의 Golden Slot 매칭</Text>
                {/* 추천 상대 및 장소 목록이 여기에 표시될 예정 */}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f7f9fb' },
    header: { fontSize: 24, fontWeight: 'bold', padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
    subHeader: { fontSize: 18, fontWeight: '600', marginTop: 10 },
});

export default HomeScreen;
