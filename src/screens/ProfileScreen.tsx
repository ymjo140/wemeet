// src/screens/ProfileScreen.tsx
import React from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { UserProfile } from '../types/UserTypes';

const { width } = Dimensions.get('window');
const PHOTO_SIZE = width / 3;

interface ProfileProps {
    user: UserProfile;
    isSelf: boolean; // 본인 프로필인지 여부
}

const ProfileScreen = ({ user, isSelf }: ProfileProps) => {
    return (
        <ScrollView style={styles.container}>
            
            {/* 💡 프로필 고도화: 사진 갤러리 (인스타처럼 3열 배치) */}
            <View style={styles.photoGrid}>
                {user.photos.map((uri, index) => (
                    <Image key={index} source={{ uri }} style={styles.photo} />
                ))}
            </View>

            {/* 기본 정보 */}
            <View style={styles.infoBox}>
                <Text style={styles.name}>{user.name}, {user.age}세</Text>
                <Text style={styles.bio}>{user.bio || (isSelf ? "프로필 수정에서 자기소개를 추가해보세요." : "자기소개가 아직 없습니다.")}</Text>
            </View>

            {/* 액션 버튼 */}
            <View style={styles.actionRow}>
                {isSelf ? (
                    <TouchableOpacity style={styles.editButton}>
                        <Text style={styles.actionText}>프로필 수정</Text>
                    </TouchableOpacity>
                ) : (
                    <>
                        {/* 💡 채팅 기능 연동: DM 보내기 */}
                        <TouchableOpacity style={[styles.editButton, { flex: 1 }]}>
                            <Text style={styles.actionText}>DM 보내기</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.followButton, { flex: 1 }]}>
                            <Text style={styles.actionText}>커피챗 신청</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>

            {/* 상세 정보 (관심사 및 AI 분석 취향 태그) */}
            <View style={styles.detailSection}>
                <Text style={styles.heading}>나의 관심사</Text>
                <View style={styles.tagContainer}>
                    {user.interests.map((tag, index) => (
                        <Text key={index} style={styles.interestTag}>{tag}</Text>
                    ))}
                </View>

                <Text style={styles.heading}>AI 분석 취향 태그 (장소, 시간 등)</Text>
                <View style={styles.tagContainer}>
                    {user.tasteTags.map((tag, index) => (
                        <Text key={index} style={styles.tasteTag}>{tag}</Text>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    photoGrid: { flexDirection: 'row', flexWrap: 'wrap' },
    photo: { width: PHOTO_SIZE, height: PHOTO_SIZE, borderWidth: 1, borderColor: '#fff' },
    infoBox: { padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
    name: { fontSize: 24, fontWeight: 'bold' },
    bio: { fontSize: 16, color: '#666', marginTop: 8 },
    actionRow: { flexDirection: 'row', padding: 15, justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: '#eee' },
    editButton: { padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginHorizontal: 5 },
    followButton: { padding: 10, backgroundColor: '#4c6ef5', borderRadius: 8, marginHorizontal: 5 },
    actionText: { color: 'white', textAlign: 'center', fontWeight: 'bold' },
    detailSection: { padding: 15 },
    heading: { fontSize: 18, fontWeight: 'bold', marginBottom: 8, marginTop: 15, color: '#333' },
    tagContainer: { flexDirection: 'row', flexWrap: 'wrap' },
    interestTag: { backgroundColor: '#e0f2fe', color: '#1d4ed8', padding: 8, borderRadius: 15, marginRight: 6, marginBottom: 6, fontSize: 14 },
    tasteTag: { backgroundColor: '#fef3c7', color: '#92400e', padding: 8, borderRadius: 15, marginRight: 6, marginBottom: 6, fontSize: 14 },
});

export default ProfileScreen;
