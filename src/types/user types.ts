// src/types/UserTypes.ts

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
    // 1. 프로필 고도화: 인스타 스타일
    bio: string;                  // 자기소개 문구
    photos: string[];             // 프로필 사진 URL 목록 (최대 5개)
    
    // 2. AI 고도화를 위한 태그
    interests: string[];        // 사용자가 선택한 관심사 (예: ["카페", "축구"])
    tasteTags: string[];        // AI가 지도/ICS 분석으로 추출한 취향 태그 (예: ["홍대", "주말모임"])
    
    // 3. 캘린더 연동 데이터
    busySchedule: [number, number][]; // 오늘의 바쁜 시간 (분 단위 [startMin, endMin])
    lastActive: Date;
    
    // AI 추천 결과
    matchHistory: MatchScore[];
}

export interface Recommendation {
    user: UserProfile;
    finalScore: number;
    goldenSlot: string; // 공통으로 비어있는 시간대 정보
    commonInterests: string[];
}
