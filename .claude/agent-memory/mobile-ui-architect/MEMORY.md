# Mobile UI Architect Memory

## Project: 3초 경기 요약 (Soccer Match Summary App)

### Design System

**Theme Location:** `/constants/theme.ts`

**Colors:**
- Light/dark mode support via `useThemeColor` hook
- Card colors: `card`, `cardBorder` for card backgrounds and borders
- Text colors: `text`, `secondaryText` for primary and secondary text
- Badge colors: `badge`, `badgeText` for fun rating badges
- `scoreDivider` for score separator styling

**Spacing System:** `Spacing` object in theme.ts
- xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 24, xxxl: 32

**Border Radius:** `BorderRadius` object in theme.ts
- sm: 4, md: 8, lg: 12, xl: 16, full: 9999

### Component Patterns

**Themed Components:**
- `ThemedText`: Pre-styled text with theme color support, types: default, title, subtitle, defaultSemiBold, link
- `ThemedView`: View with automatic background color from theme
- Use `useThemeColor` hook to access theme colors in custom components

**Component File Naming:**
- kebab-case for component files (e.g., `match-card.tsx`, `themed-text.tsx`)
- PascalCase for component names (e.g., `MatchCard`, `ThemedText`)

**Comparison Bar Component:**
- `StatComparisonBar` at `/components/stat-comparison-bar.tsx`
- Props: label, homeValue, awayValue, homeTeam, awayTeam
- Built with native View (no external chart libraries)
- Visual-first design: bar proportions more prominent than numbers
- Uses flexbox with percentage widths for responsive bars

### Screen Architecture

**Home Screen Structure:**
- Uses `SafeAreaView` with edges prop for safe area handling
- `FlatList` for performance with match cards
- Header, empty state, and list items clearly separated
- Content padding via `contentContainerStyle` on FlatList
- Navigation: `useRouter()` + `router.push()` to match detail

**Match Card Component:**
- Location: `/components/match-card.tsx`
- Props: `match` (MatchData), `onPress` callback
- Layout: Score section (horizontal) → Summary → Fun rating badge
- Touch target: Entire card is tappable via `TouchableOpacity`
- Shadow/elevation for depth on both platforms

**Match Detail Screen:**
- Location: `/app/match/[id].tsx` (dynamic route)
- Uses `useLocalSearchParams<{ id: string }>()` to get route param
- ScrollView for vertical content with multiple sections
- Back button in header with `router.back()`
- Loading, error, and success states all handled
- Section structure (per CLAUDE.md 5.2):
  - Score display (larger than card)
  - A: 한줄 요약 (summary text)
  - B: 한눈에 보는 승부 (StatComparisonBar × 3)
  - C: 오늘의 에이스 (ace player card)
  - D: 경기 재미도 (fun rating badge + number)
  - E: AI 경기 한눈에 보기 (button placeholder, not functional)

### Type Definitions

**Location:** `/types/match.ts`
- `MatchData`: Core interface for match information (used in list view)
- `MatchDetail`: Extended interface with stats, acePlayer, funRatingBadge (used in detail view)
- Status types: 'scheduled' | 'live' | 'finished'
- Extends pattern: `interface MatchDetail extends MatchData { ... }`

### Key Design Decisions

**비축구인 (Non-Expert) Friendly:**
- Plain language labels: "한줄 요약" instead of technical terms
- Visual cues: Emojis (🧠, 🔥) to aid quick scanning
- Score prominently displayed with clear team names
- Fun rating (재미도) to help users decide which matches to watch

**Mobile-First:**
- Minimum touch targets (card is fully tappable)
- FlatList for list performance
- SafeAreaView for notch/status bar handling
- Platform-aware shadows (shadowProps + elevation)

### Data Flow Pattern

Components receive data via props with TypeScript interfaces. Demo data in screen file marked with TODO comments for API replacement. No data fetching logic in UI components.

### Navigation

File-based routing via Expo Router:
- `app/(tabs)/index.tsx` - Home screen
- `app/match/[id].tsx` - Match detail screen (dynamic route)
- Tab layout in `app/(tabs)/_layout.tsx`
- Root layout in `app/_layout.tsx` - Register all top-level screens here

Navigation patterns:
- Use `useRouter()` hook from `expo-router`
- Push to dynamic routes: `router.push(\`/match/${id}\`)` (template literal)
- Back navigation: `router.back()`

Path alias: `@/*` points to project root
