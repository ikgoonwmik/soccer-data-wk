import { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { StatComparisonBar } from '@/components/stat-comparison-bar';
import { useThemeColor } from '@/hooks/use-theme-color';
import { BorderRadius, Spacing } from '@/constants/theme';
import type { MatchDetail } from '@/types/match';

/**
 * Demo data for match details
 * TODO: Replace with API data when backend is ready
 */
const DEMO_MATCH_DETAILS: Record<string, MatchDetail> = {
  '1': {
    id: '1',
    homeTeam: '전북',
    awayTeam: '대전',
    homeScore: 3,
    awayScore: 1,
    summary: '전북이 경기 내내 주도권을 유지하며 안정적인 승리',
    funRating: 7.8,
    status: 'finished',
    stats: {
      shots: { home: 18, away: 8 },
      shotsOnTarget: { home: 7, away: 3 },
      possession: { home: 62, away: 38 },
    },
    acePlayer: {
      name: '김민혁',
      team: 'home',
      rating: 8.5,
      description: '공격을 주도하며 2골 1도움 기록',
    },
    funRatingBadge: '🔥 난타전',
  },
  '2': {
    id: '2',
    homeTeam: '수원 FC',
    awayTeam: '울산',
    homeScore: 2,
    awayScore: 2,
    summary: '양 팀이 공격적으로 맞붙은 치열한 경기',
    funRating: 8.5,
    status: 'finished',
    stats: {
      shots: { home: 14, away: 16 },
      shotsOnTarget: { home: 6, away: 7 },
      possession: { home: 48, away: 52 },
    },
    acePlayer: {
      name: '주민규',
      team: 'away',
      rating: 8.2,
      description: '결정적 순간마다 팀을 구해낸 골키퍼',
    },
    funRatingBadge: '⚖️ 팽팽한 경기',
  },
  '3': {
    id: '3',
    homeTeam: '포항',
    awayTeam: '제주',
    homeScore: 1,
    awayScore: 0,
    summary: '포항이 적은 기회로 효율적인 승리를 거둠',
    funRating: 6.2,
    status: 'finished',
    stats: {
      shots: { home: 9, away: 12 },
      shotsOnTarget: { home: 4, away: 3 },
      possession: { home: 45, away: 55 },
    },
    acePlayer: {
      name: '이호재',
      team: 'home',
      rating: 7.8,
      description: '결승골과 함께 수비 가담으로 활약',
    },
    funRatingBadge: '😴 비교적 지루',
  },
};

export default function MatchDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [matchDetail, setMatchDetail] = useState<MatchDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const cardBackground = useThemeColor({}, 'card');
  const borderColor = useThemeColor({}, 'cardBorder');
  const secondaryTextColor = useThemeColor({}, 'secondaryText');
  const badgeBackground = useThemeColor({}, 'badge');
  const badgeTextColor = useThemeColor({}, 'badgeText');
  const buttonBackground = useThemeColor({}, 'tint');

  useEffect(() => {
    // Simulate API call
    // TODO: Replace with actual API call when backend is ready
    const loadMatchDetail = async () => {
      setLoading(true);
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 300));
      const detail = id ? DEMO_MATCH_DETAILS[id] : null;
      setMatchDetail(detail || null);
      setLoading(false);
    };

    loadMatchDetail();
  }, [id]);

  const handleBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <ThemedView style={styles.container}>
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" />
            <ThemedText style={[styles.loadingText, { color: secondaryTextColor }]}>
              경기 정보를 불러오는 중...
            </ThemedText>
          </View>
        </ThemedView>
      </SafeAreaView>
    );
  }

  if (!matchDetail) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <ThemedView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity
              onPress={handleBack}
              style={styles.backButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <ThemedText style={styles.backButtonText}>← 뒤로</ThemedText>
            </TouchableOpacity>
          </View>
          <View style={styles.errorContainer}>
            <ThemedText style={styles.errorText}>경기를 찾을 수 없습니다</ThemedText>
          </View>
        </ThemedView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ThemedView style={styles.container}>
        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={handleBack}
            style={styles.backButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <ThemedText style={styles.backButtonText}>← 뒤로</ThemedText>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Score Section */}
          <View style={[styles.card, { backgroundColor: cardBackground, borderColor }]}>
            <View style={styles.scoreContainer}>
              <ThemedText style={styles.teamName}>{matchDetail.homeTeam}</ThemedText>
              <View style={styles.scoreRow}>
                <ThemedText style={styles.score}>{matchDetail.homeScore}</ThemedText>
                <ThemedText style={styles.scoreDivider}>:</ThemedText>
                <ThemedText style={styles.score}>{matchDetail.awayScore}</ThemedText>
              </View>
              <ThemedText style={styles.teamName}>{matchDetail.awayTeam}</ThemedText>
            </View>
          </View>

          {/* Section A: Summary */}
          <View style={[styles.card, { backgroundColor: cardBackground, borderColor }]}>
            <ThemedText style={styles.sectionTitle}>🧠 한줄 요약</ThemedText>
            <ThemedText style={styles.summaryText}>{matchDetail.summary}</ThemedText>
          </View>

          {/* Section B: Stats Comparison */}
          <View style={[styles.card, { backgroundColor: cardBackground, borderColor }]}>
            <ThemedText style={styles.sectionTitle}>📊 한눈에 보는 승부</ThemedText>
            <View style={styles.statsContainer}>
              <StatComparisonBar
                label="슈팅"
                homeValue={matchDetail.stats.shots.home}
                awayValue={matchDetail.stats.shots.away}
                homeTeam={matchDetail.homeTeam}
                awayTeam={matchDetail.awayTeam}
              />
              <StatComparisonBar
                label="유효슈팅"
                homeValue={matchDetail.stats.shotsOnTarget.home}
                awayValue={matchDetail.stats.shotsOnTarget.away}
                homeTeam={matchDetail.homeTeam}
                awayTeam={matchDetail.awayTeam}
              />
              <StatComparisonBar
                label="점유율"
                homeValue={matchDetail.stats.possession.home}
                awayValue={matchDetail.stats.possession.away}
                homeTeam={matchDetail.homeTeam}
                awayTeam={matchDetail.awayTeam}
              />
            </View>
          </View>

          {/* Section C: Ace Player */}
          <View style={[styles.card, { backgroundColor: cardBackground, borderColor }]}>
            <ThemedText style={styles.sectionTitle}>⭐ 오늘의 에이스</ThemedText>
            <View style={styles.aceContainer}>
              <ThemedText style={styles.aceName}>{matchDetail.acePlayer.name}</ThemedText>
              <ThemedText style={[styles.aceRating, { color: secondaryTextColor }]}>
                평점 {matchDetail.acePlayer.rating}
              </ThemedText>
              <ThemedText style={styles.aceDescription}>
                {matchDetail.acePlayer.description}
              </ThemedText>
            </View>
          </View>

          {/* Section D: Fun Rating */}
          <View style={[styles.card, { backgroundColor: cardBackground, borderColor }]}>
            <ThemedText style={styles.sectionTitle}>🎯 경기 재미도</ThemedText>
            <View style={[styles.funBadge, { backgroundColor: badgeBackground }]}>
              <ThemedText style={[styles.funBadgeText, { color: badgeTextColor }]}>
                {matchDetail.funRatingBadge}
              </ThemedText>
            </View>
            <ThemedText style={[styles.funRatingNumber, { color: secondaryTextColor }]}>
              {matchDetail.funRating.toFixed(1)} / 10
            </ThemedText>
          </View>

          {/* Section E: AI Summary Button (Not implemented yet) */}
          <View style={[styles.card, { backgroundColor: cardBackground, borderColor }]}>
            <TouchableOpacity
              style={[styles.aiButton, { backgroundColor: buttonBackground }]}
              activeOpacity={0.7}
              onPress={() => {
                // TODO: Implement AI image generation
                console.log('AI summary requested');
              }}
            >
              <ThemedText style={styles.aiButtonText}>📸 경기 한눈에 보기</ThemedText>
              <ThemedText style={[styles.aiButtonSubtext, { color: badgeTextColor }]}>
                곧 제공 예정
              </ThemedText>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  backButton: {
    alignSelf: 'flex-start',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxxl,
  },
  card: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
  },
  teamName: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
    textAlign: 'center',
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    minWidth: 80,
    justifyContent: 'center',
  },
  score: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  scoreDivider: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: Spacing.md,
  },
  summaryText: {
    fontSize: 16,
    lineHeight: 24,
  },
  statsContainer: {
    gap: Spacing.md,
  },
  aceContainer: {
    alignItems: 'center',
  },
  aceName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: Spacing.xs,
  },
  aceRating: {
    fontSize: 14,
    marginBottom: Spacing.sm,
  },
  aceDescription: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  funBadge: {
    alignSelf: 'center',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.full,
    marginBottom: Spacing.sm,
  },
  funBadgeText: {
    fontSize: 18,
    fontWeight: '600',
  },
  funRatingNumber: {
    fontSize: 14,
    textAlign: 'center',
  },
  aiButton: {
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    minHeight: 60,
    justifyContent: 'center',
  },
  aiButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: Spacing.xs,
  },
  aiButtonSubtext: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.md,
  },
  loadingText: {
    fontSize: 14,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
  },
});
