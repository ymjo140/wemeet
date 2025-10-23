// src/types/UserTypes.ts
// 사용자의 프로필 및 매칭 관련 데이터 모델

export interface MatchScore {
    partnerId: string;
    score: number;
    timestamp: Date;
}

export interface UserProfile {
    id: string;
    name: string;
    age: number;
    gender: 'M' | 'F' | 'O';
    interests: string[];        // 선택된 관심사
    tasteTags: string[];        // AI 분석 취향 태그
    busySchedule: [number, number][]; // 오늘의 바쁜 시간
    bio: string;                  // 자기소개 (고도화된 프로필)
    photos: string[];             // 프로필 사진 URL 리스트 (고도화된 프로필)
    isRegistered: boolean;
    matchHistory: MatchScore[];
}
