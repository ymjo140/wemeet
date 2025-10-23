import { UserProfile, Recommendation } from '../types/UserTypes';

// [유틸리티] Jaccard 유사도 계산 (취향 매칭의 기본)
function jaccardSimilarity(setA: string[], setB: string[]): number {
    if (setA.length === 0 && setB.length === 0) return 0;
    const intersection = setA.filter(item => setB.includes(item));
    const union = [...new Set([...setA, ...setB])];
    return intersection.length / union.length;
}

// [유틸리티] 공통 자유 시간 계산 (단순화된 Golden Slot)
function findGoldenTime(scheduleA: [number, number][], scheduleB: [number, number][]): number {
    // 실제로는 복잡한 시간 병합 및 필터링 로직이 필요하며, Cloud Function에서 실행될 예정입니다.
    // 여기서는 간단히, 스케줄이 비어있으면 4시간(240분)의 공통 시간으로 가정합니다.
    if (scheduleA.length === 0 && scheduleB.length === 0) return 240;
    
    // (실제 구현 시: 두 스케줄 배열을 비교하여 겹치는 자유 시간의 총합을 분 단위로 반환)
    return 120; // 임시로 2시간(120분) 공통 자유 시간 반환
}

// 💡 메인 AI 추천 점수 계산 (서버리스 환경에서 실행될 핵심 로직)
export function calculateMatchScore(self: UserProfile, partner: UserProfile): Recommendation {
    // 1. 시간 매칭 점수 (0.0 ~ 1.0)
    const timeOverlapMin = findGoldenTime(self.busySchedule || [], partner.busySchedule || []);
    const timeScore = Math.min(1, timeOverlapMin / 180); // 3시간(180분) 이상 시 만점

    // 2. 취향 매칭 점수 (0.0 ~ 1.0)
    const interestSim = jaccardSimilarity(self.interests, partner.interests);
    const tasteSim = jaccardSimilarity(self.tasteTags, partner.tasteTags);
    const combinedTasteScore = (interestSim * 0.6) + (tasteSim * 0.4);

    // 3. 거리 매칭 점수 (위치 정보가 없으므로 1.0으로 가정. 실제 앱에서는 GeoHash 기반 계산 필요)
    const distanceScore = 1.0; 

    // 4. 최종 점수 (가중치 모델: 시간 40%, 취향 40%, 거리 20%)
    const finalScore = (0.4 * timeScore) + (0.4 * combinedTasteScore) + (0.2 * distanceScore);
    
    return {
        user: partner,
        finalScore: Math.round(finalScore * 100), // 100점 만점으로 변환
        goldenSlot: `${Math.floor(timeOverlapMin / 60)}시간 ${timeOverlapMin % 60}분 공통`,
        commonInterests: self.interests.filter(item => partner.interests.includes(item)),
    };
}
