/**
 * Type definitions for match data
 * These interfaces define the data shape expected by UI components
 */

export interface MatchData {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  summary: string;
  funRating: number;
  status: 'scheduled' | 'live' | 'finished';
}

/**
 * Extended match data with detailed statistics
 * Used in match detail screen
 */
export interface MatchDetail extends MatchData {
  stats: {
    shots: {
      home: number;
      away: number;
    };
    shotsOnTarget: {
      home: number;
      away: number;
    };
    possession: {
      home: number;
      away: number;
    };
  };
  acePlayer: {
    name: string;
    team: 'home' | 'away';
    rating: number;
    description: string;
  };
  funRatingBadge: '🔥 난타전' | '⚖️ 팽팽한 경기' | '😴 비교적 지루';
}
