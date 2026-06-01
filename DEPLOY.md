# GitHub Pages 배포 가이드

레포: **hyunsik-content-mbc596** (`thewaves1201-cyber`)  
기본 URL: `https://thewaves1201-cyber.github.io/hyunsik-content-mbc596/`

## 폴더 구조 (레포 루트 기준)

```
hyunsik-content-mbc596/
├── hyunsik_content_v3.html    ← 기존 「현식 × 596」 사이트 (01 website)
├── assets/                    ← 기존 에셋 (favicon, og 이미지 등)
└── proposal/                  ← 신규 「아이돌, 세상에 나가다」 기획안 (03 claude_website)
    ├── index.html
    ├── management/index.html  ← URL용 로더 (내용은 index.html)
    ├── mbc/index.html         ← management 와 동일
    └── sponsor/index.html     ← 스폰서/PPL용 (sponsor 모드)
```

## 공개 URL

| 용도 | URL |
|------|-----|
| 기존 사이트 (현식 × 596) | `https://thewaves1201-cyber.github.io/hyunsik-content-mbc596/hyunsik_content_v3.html` |
| 신규 기획안 (기본·기획사/MBC) | `https://thewaves1201-cyber.github.io/hyunsik-content-mbc596/proposal/` |
| 기획사/MBC용 (명시 경로) | `https://thewaves1201-cyber.github.io/hyunsik-content-mbc596/proposal/management/` |
| MBC용 (동일) | `https://thewaves1201-cyber.github.io/hyunsik-content-mbc596/proposal/mbc/` |
| 스폰서/PPL용 | `https://thewaves1201-cyber.github.io/hyunsik-content-mbc596/proposal/sponsor/` |

스폰서 모드는 URL에 `/sponsor/` 가 포함되면 자동 전환됩니다.  
(대안: `?mode=sponsor` 또는 `#sponsor`)

## 로컬에서 수정·미리보기

1. **원본 작업 폴더**: `03 claude_website/` (`index.html` 수정)
2. **배포용 복사** (레포에 올릴 때):

```bash
cp "03 claude_website/index.html" "01 website/proposal/index.html"
```

3. 로컬 서버 (프로젝트 루트에서):

```bash
cd "03 claude_website"
python3 -m http.server 8080
```

- http://localhost:8080/ — 기획사/MBC용  
- http://localhost:8080/sponsor/ — 스폰서용  

## GitHub에 올리는 방법

1. `hyunsik-content-mbc596` 레포를 clone
2. 아래를 레포 루트에 반영:
   - `proposal/` 폴더 전체 → `01 website/proposal/` 내용 복사
   - (기존 파일은 그대로 두기)
3. commit & push → GitHub Pages 반영 (수 분 소요)

## 참고

- `04 cursor_website` 는 사용하지 않습니다 (삭제됨).
- `proposal/*/index.html` 로더는 **경로만** 나누고, 실제 콘텐츠는 `proposal/index.html` 한 파일입니다.
