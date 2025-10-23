// src/screens/ChatScreen.tsx
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

// 목업 채팅방 데이터 (Firebase에서 실시간으로 로드될 예정)
const CHAT_ROOMS = [
    { id: 'c1', name: '김도윤님', lastMessage: '커피챗 시간 확정해주세요.', timestamp: '1분 전', unread: 1 },
    { id: 'c2', name: '홍대 맛집 탐방 모임', lastMessage: '오늘 저녁 7시에 만나요!', timestamp: '2시간 전', unread: 0 },
    { id: 'c3', name: '박민서님', lastMessage: 'AI 추천 점수 92점으로 매칭되었습니다.', timestamp: '어제', unread: 0 },
];

const ChatListScreen = () => {
    const renderChatItem = ({ item }: { item: typeof CHAT_ROOMS[0] }) => (
        <TouchableOpacity style={styles.chatItem}>
            <View style={styles.avatar}><Text style={styles.avatarText}>{item.name[0]}</Text></View>
            <View style={styles.chatDetails}>
                <Text style={styles.chatName}>{item.name}</Text>
                <Text style={styles.lastMessage} numberOfLines={1}>{item.lastMessage}</Text>
            </View>
            <View style={styles.meta}>
                <Text style={styles.timestamp}>{item.timestamp}</Text>
                {item.unread > 0 && <Text style={styles.badge}>{item.unread}</Text>}
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>채팅</Text>
            <FlatList
                data={CHAT_ROOMS}
                renderItem={renderChatItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: { fontSize: 26, fontWeight: 'bold', padding: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
    chatItem: { flexDirection: 'row', padding: 15, borderBottomWidth: 1, borderBottomColor: '#f0f0f0', alignItems: 'center' },
    avatar: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#ddd', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
    avatarText: { fontSize: 24, color: '#fff' },
    chatDetails: { flex: 1 },
    chatName: { fontWeight: '600', fontSize: 16 },
    lastMessage: { color: '#888', fontSize: 13, marginTop: 3 },
    meta: { alignItems: 'flex-end' },
    timestamp: { fontSize: 12, color: '#aaa' },
    badge: { backgroundColor: '#ef4444', color: '#fff', borderRadius: 10, paddingHorizontal: 6, paddingVertical: 1, fontSize: 12, fontWeight: 'bold', marginTop: 5 },
});

export default ChatListScreen;
