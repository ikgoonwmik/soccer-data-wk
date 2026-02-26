import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { useThemeColor } from '@/hooks/use-theme-color';
import { BorderRadius, Spacing } from '@/constants/theme';

export interface StatComparisonBarProps {
  label: string;
  homeValue: number;
  awayValue: number;
  homeTeam: string;
  awayTeam: string;
}

/**
 * StatComparisonBar displays a horizontal comparison bar between two teams
 *
 * Shows:
 * - Label above the bar
 * - Visual bar showing relative proportion
 * - Numeric values for each team
 *
 * Designed for non-expert users (비축구인) - emphasizes visual comparison over raw numbers
 */
export function StatComparisonBar({
  label,
  homeValue,
  awayValue,
  homeTeam,
  awayTeam,
}: StatComparisonBarProps) {
  const homeColor = useThemeColor({}, 'tint');
  const awayColor = useThemeColor({}, 'secondaryText');
  const borderColor = useThemeColor({}, 'cardBorder');

  const total = homeValue + awayValue;
  const homePercentage = total > 0 ? (homeValue / total) * 100 : 50;
  const awayPercentage = total > 0 ? (awayValue / total) * 100 : 50;

  return (
    <View style={styles.container}>
      {/* Label */}
      <ThemedText style={styles.label}>{label}</ThemedText>

      {/* Team names and values */}
      <View style={styles.headerRow}>
        <ThemedText style={styles.teamText}>{homeTeam}</ThemedText>
        <ThemedText style={styles.teamText}>{awayTeam}</ThemedText>
      </View>

      {/* Comparison bar */}
      <View style={[styles.barContainer, { borderColor }]}>
        <View
          style={[
            styles.homeBar,
            {
              backgroundColor: homeColor,
              width: `${homePercentage}%`,
            },
          ]}
        />
        <View
          style={[
            styles.awayBar,
            {
              backgroundColor: awayColor,
              width: `${awayPercentage}%`,
            },
          ]}
        />
      </View>

      {/* Numeric values */}
      <View style={styles.valuesRow}>
        <ThemedText style={styles.valueText}>{homeValue}</ThemedText>
        <ThemedText style={styles.valueText}>{awayValue}</ThemedText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.lg,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  teamText: {
    fontSize: 13,
    opacity: 0.7,
  },
  barContainer: {
    height: 24,
    flexDirection: 'row',
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
    borderWidth: 1,
  },
  homeBar: {
    height: '100%',
  },
  awayBar: {
    height: '100%',
  },
  valuesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.xs,
  },
  valueText: {
    fontSize: 15,
    fontWeight: '600',
  },
});
