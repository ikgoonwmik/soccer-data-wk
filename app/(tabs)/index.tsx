import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MatchCard } from '@/components/match-card';
import { Spacing } from '@/constants/theme';
import type { MatchData } from '@/types/match';

/**
 * Demo data for matches
 * TODO: Replace with API data when backend is ready
 */
const DEMO_MATCHES: MatchData[] = [
  {
    id: '1',
    homeTeam: '전북',
    awayTeam: '대전',
    homeScore: 3,
    awayScore: 1,
    summary: '전북이 공중볼 경합에서 크게 앞섬',
    funRating: 7.8,
    status: 'finished',
  },
  {
    id: '2',
    homeTeam: '수원 FC',
    awayTeam: '울산',
    homeScore: 2,
    awayScore: 2,
    summary: '양 팀이 공격적으로 맞붙은 경기',
    funRating: 8.5,
    status: 'finished',
  },
  {
    id: '3',
    homeTeam: '포항',
    awayTeam: '제주',
    homeScore: 1,
    awayScore: 0,
    summary: '포항이 적은 기회로 효율적인 승리',
    funRating: 6.2,
    status: 'finished',
  },
];

export default function HomeScreen() {
  const [matches] = useState<MatchData[]>(DEMO_MATCHES);
  const router = useRouter();

  const handleMatchPress = (matchId: string) => {
    router.push(`/match/${matchId}`);
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <ThemedText style={styles.emptyText}>
        오늘 경기가 없습니다
      </ThemedText>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <ThemedText type="title" style={styles.title}>
        오늘의 경기 ⚽
      </ThemedText>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ThemedView style={styles.container}>
        <FlatList
          data={matches}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MatchCard match={item} onPress={handleMatchPress} />
          )}
          ListHeaderComponent={renderHeader}
          ListEmptyComponent={renderEmpty}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  header: {
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  title: {
    fontSize: 28,
  },
  emptyContainer: {
    paddingVertical: Spacing.xxxl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    opacity: 0.6,
  },
});
