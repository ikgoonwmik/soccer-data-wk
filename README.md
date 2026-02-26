# 3초 경기 요약 ⚽

축구를 잘 모르는 사용자도 **3초 안에 경기 내용을 이해**할 수 있는 모바일 앱.

> 경기 안 봐도, 카드 한 장으로 이해

## 핵심 가치

- 숫자 → 의미로 번역
- 데이터 → 이야기로 변환
- 전문가 정보 → 생활 언어로 표현

## 기술 스택

| 영역 | 기술 |
|------|------|
| Framework | Expo SDK 54, Expo Router |
| Language | TypeScript 5.9, React 19, React Native 0.81 |
| 테마 | 라이트/다크 모드 자동 지원 |
| 아키텍처 | React Native New Architecture, React Compiler |

## 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm start

# 플랫폼별 실행
npm run ios
npm run android
npm run web

# 린트
npm run lint
```

## 프로젝트 구조

```
app/
├── _layout.tsx            # 루트 레이아웃 (Stack)
├── modal.tsx              # 모달 화면
├── (tabs)/
│   ├── _layout.tsx        # 탭 레이아웃
│   └── index.tsx          # 홈 — 오늘의 경기 리스트
└── match/
    └── [id].tsx           # 경기 상세 화면

components/
├── match-card.tsx         # 경기 요약 카드
├── stat-comparison-bar.tsx # 팀 통계 비교 바
├── themed-text.tsx        # 테마 적용 텍스트
├── themed-view.tsx        # 테마 적용 뷰
└── ui/                    # UI 프리미티브

constants/
└── theme.ts               # Colors, Spacing, BorderRadius

hooks/
├── use-color-scheme.ts    # 색상 모드 감지
└── use-theme-color.ts     # 테마 컬러 유틸

types/
└── match.ts               # MatchData, MatchDetail 타입
```

## 화면 구성

### 홈 화면
- "오늘의 경기" 경기 리스트
- MatchCard: 팀명, 스코어, 한줄 요약, 재미도 배지

### 경기 상세 화면
- **한줄 요약** — 경기 핵심 흐름 (생활 언어)
- **한눈에 보는 승부** — 슈팅/유효슈팅/점유율 비교 바
- **오늘의 에이스** — MVP 선수 카드
- **경기 재미도** — 배지 + 점수
- **AI 경기 한눈에 보기** — 버튼 플레이스홀더 (추후 구현)

## 개발 로드맵

- **Phase 1 (MVP)** — 경기 리스트, MatchCard, 한줄 요약, 슈팅 비교 바
- **Phase 2** — 에이스 카드, 재미도 계산, 상세 화면 완성, 캐싱
- **Phase 3** — AI 한눈에 보기, 공유 카드, 알림

## 시스템 아키텍처 (계획)

```
[Expo App] → [PHP API Server] → [외부 축구 데이터 API]
```

- **서버**: 외부 API 캐싱, 한줄 요약 생성, 재미도 계산
- **앱**: 렌더링, 사용자 인터랙션, 공유
