// src/screens/HomeScreen.tsx
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import MatchCard from '../components/MatchCard';
import { Recommendation, UserProfile } from '../types/UserTypes';
import { calculateMatchScore } from '../services/AIService';

// 💡 카테고리 세분화 목록 (Munto 앱 이미지 참고)
const CATEGORIES = [
    { id: '1', name: '추천 호스트', icon: '❤️' },
    { id: '2', name: '소규모 모임', icon: '👥' },
    { id: '3', name: '주말 모임', icon: '📅' },
    { id: '4', name: '당일 모임', icon: '⏰' },
    { id: '5', name: '대규모 모임', icon: '🎉' },
];

const mockUser: UserProfile = {
    id: 'p1', name: '김지수', age: 26, gender: 'F', 
    bio: '디자인과 코딩을 즐기는 사람입니다. 맛집 탐방 좋아해요!',
    photos: ['https://i.pravatar.cc/150?img=1', 'https://i.pravatar.cc/150?img=2'],
    interests: ['카페', '맛집', '독서', '미술'], tasteTags: ['성수', '클래식', '브런치'],
    busySchedule: [], lastActive: new Date(), matchHistory: [], isRegistered: true,
};

// 💡 AI 매칭 결과 목업 데이터
const mockRecommendations: Recommendation[] = [
    calculateMatchScore({ id: 'self', interests: ['카페', '축구'], tasteTags: ['홍대', '주말모임'], busySchedule: [], name: 'self', age: 25, gender: 'M', bio: '', photos: [], lastActive: new Date(), matchHistory: [], isRegistered: true,}, mockUser),
].map((rec, index) => ({ ...rec, finalScore: rec.finalScore - index * 5 }));


const HomeScreen = () => {
    const [selectedTab, setSelectedTab] = useState('개인 만남 추천');

    const renderCategoryItem = ({ item }: { item: typeof CATEGORIES[0] }) => (
        <TouchableOpacity style={styles.categoryItem}>
            <Text style={styles.categoryIcon}>{item.icon}</Text>
            <Text style={styles.categoryText}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* 상단 탭 (개인 만남 vs 익명 모임) */}
            <View style={styles.tabContainer}>
                {['개인 만남 추천', '익명 모임'].map(tab => (
                    <TouchableOpacity
                        key={tab}
                        onPress={() => setSelectedTab(tab)}
                        style={[styles.tabButton, selectedTab === tab && styles.activeTab]}
                    >
                        <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>{tab}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* 💡 카테고리 세분화 섹션 */}
                {selectedTab === '익명 모임' && (
                    <View style={styles.categorySection}>
                        <Text style={styles.sectionTitle}>이런 모임 어때요?</Text>
                        <FlatList
                            data={CATEGORIES}
                            renderItem={renderCategoryItem}
                            keyExtractor={item => item.id}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                )}

                {/* 💡 AI 추천 섹션 */}
                {selectedTab === '개인 만남 추천' && (
                    <View style={styles.recommendationSection}>
                        <Text style={styles.sectionTitle}>AI 기반 오늘의 맞춤 추천</Text>
                        {mockRecommendations.map((rec, index) => (
                            <MatchCard
                                key={index}
                                recommendation={rec}
                                onPress={() => console.log(`Open Profile: ${rec.user.name}`)}
                            />
                        ))}
                        <Text style={styles.footerText}>더 많은 매칭 상대 확인하기</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f7f9fb' },
    tabContainer: { flexDirection: 'row', justifyContent: 'space-around', borderBottomWidth: 1, borderBottomColor: '#eee', backgroundColor: '#fff' },
    tabButton: { paddingVertical: 15, borderBottomWidth: 2, borderBottomColor: 'transparent', flex: 1, alignItems: 'center' },
    activeTab: { borderBottomColor: '#4c6ef5' },
    tabText: { fontSize: 16, color: '#888' },
    activeTabText: { color: '#4c6ef5', fontWeight: 'bold' },
    scrollContent: { paddingBottom: 50 },
    
    // 카테고리 스타일
    categorySection: { paddingVertical: 15, borderBottomWidth: 6, borderBottomColor: '#eee' },
    categoryItem: { alignItems: 'center', width: 80, marginHorizontal: 5 },
    categoryIcon: { fontSize: 30, marginBottom: 5, color: '#4c6ef5' },
    categoryText: { fontSize: 12, textAlign: 'center', color: '#333' },
    
    // 추천 스타일
    recommendationSection: { paddingVertical: 10 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', paddingHorizontal: 15, marginTop: 10, marginBottom: 5 },
    footerText: { textAlign: 'center', color: '#4c6ef5', padding: 20, fontSize: 14 },
});

export default HomeScreen;
