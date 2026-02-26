import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';
import { BorderRadius, Spacing } from '@/constants/theme';
import type { MatchData } from '@/types/match';

export interface MatchCardProps {
  match: MatchData;
  onPress?: (matchId: string) => void;
}

/**
 * MatchCard displays a summary of a soccer match
 *
 * Shows:
 * - Team names and scores
 * - One-line summary with brain emoji
 * - Fun rating badge with fire emoji
 *
 * Designed to be understood by non-soccer-experts (비축구인) in 3 seconds
 */
export function MatchCard({ match, onPress }: MatchCardProps) {
  const cardBackground = useThemeColor({}, 'card');
  const borderColor = useThemeColor({}, 'cardBorder');
  const secondaryTextColor = useThemeColor({}, 'secondaryText');
  const badgeBackground = useThemeColor({}, 'badge');
  const badgeTextColor = useThemeColor({}, 'badgeText');
  const dividerColor = useThemeColor({}, 'scoreDivider');

  const handlePress = () => {
    onPress?.(match.id);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      disabled={!onPress}
    >
      <ThemedView
        style={[
          styles.card,
          { backgroundColor: cardBackground, borderColor },
        ]}
      >
        {/* Score Section */}
        <View style={styles.scoreContainer}>
          <ThemedText style={styles.teamName}>{match.homeTeam}</ThemedText>
          <View style={styles.scoreRow}>
            <ThemedText style={styles.score}>{match.homeScore}</ThemedText>
            <ThemedText style={[styles.scoreDivider, { color: dividerColor }]}>:</ThemedText>
            <ThemedText style={styles.score}>{match.awayScore}</ThemedText>
          </View>
          <ThemedText style={styles.teamName}>{match.awayTeam}</ThemedText>
        </View>

        {/* Summary Section */}
        <View style={styles.summaryContainer}>
          <ThemedText style={[styles.summaryLabel, { color: secondaryTextColor }]}>
            🧠 한줄 요약
          </ThemedText>
          <ThemedText style={styles.summaryText}>
            {match.summary}
          </ThemedText>
        </View>

        {/* Fun Rating Badge */}
        <View style={[styles.badge, { backgroundColor: badgeBackground }]}>
          <ThemedText style={[styles.badgeText, { color: badgeTextColor }]}>
            🔥 재미도 {match.funRating.toFixed(1)}
          </ThemedText>
        </View>
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    // Elevation for Android
    elevation: 2,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  teamName: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    minWidth: 60,
    justifyContent: 'center',
  },
  score: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  scoreDivider: {
    fontSize: 20,
    fontWeight: '600',
  },
  summaryContainer: {
    marginBottom: Spacing.md,
  },
  summaryLabel: {
    fontSize: 13,
    marginBottom: Spacing.xs,
  },
  summaryText: {
    fontSize: 15,
    lineHeight: 22,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  badgeText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
