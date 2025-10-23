// src/components/MatchCard.tsx
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Recommendation } from '../types/UserTypes';

interface MatchCardProps {
    recommendation: Recommendation;
    onPress: () => void;
}

const MatchCard = ({ recommendation, onPress }: MatchCardProps) => {
    const { user, finalScore, goldenSlot, commonInterests } = recommendation;

    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            {/* 💡 프로필 고도화: 메인 사진 표시 */}
            <Image source={{ uri: user.photos[0] || 'https://via.placeholder.com/150' }} style={styles.profileImage} />
            
            <View style={styles.infoContainer}>
                <View style={styles.header}>
                    <Text style={styles.name}>{user.name}, {user.age}세</Text>
                    {/* 💡 AI 고도화: 매칭 점수 시각화 */}
                    <Text style={styles.scoreBadge}>{finalScore}점</Text>
                </View>
                
                <Text style={styles.slotDetail}>⏰ {goldenSlot} 공통 자유 시간</Text>
                
                {/* 공통 관심사 목록 */}
                <View style={styles.tagContainer}>
                    {commonInterests.slice(0, 3).map((tag, index) => (
                        <Text key={index} style={styles.tag}>{tag}</Text>
                    ))}
                    {commonInterests.length > 3 && <Text style={styles.tag}>+{commonInterests.length - 3}</Text>}
                </View>

                {/* 💡 채팅 기능 연동: 커피챗 신청 버튼 */}
                <TouchableOpacity style={styles.chatButton}>
                    <Text style={styles.chatButtonText}>☕ 커피챗 신청</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginVertical: 10,
        marginHorizontal: 15,
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        overflow: 'hidden',
    },
    profileImage: { width: 120, height: 160, resizeMode: 'cover' },
    infoContainer: { flex: 1, padding: 15, justifyContent: 'space-between' },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    name: { fontSize: 18, fontWeight: 'bold' },
    scoreBadge: { backgroundColor: '#4c6ef5', color: '#fff', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 15, fontSize: 14, fontWeight: '600' },
    slotDetail: { fontSize: 13, color: '#666', marginTop: 5 },
    tagContainer: { flexDirection: 'row', flexWrap: 'wrap', marginVertical: 8 },
    tag: { backgroundColor: '#eef2ff', color: '#4c6ef5', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10, marginRight: 5, marginBottom: 5, fontSize: 12 },
    chatButton: { backgroundColor: '#10b981', padding: 10, borderRadius: 8, marginTop: 10 },
    chatButtonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});

export default MatchCard;
