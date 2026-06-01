/*
  KO / ENG 번역 데이터 + applySiteLang()
  레이아웃은 index.html 그대로, 텍스트만 교체
*/
(function (global) {
  const STORAGE_KEY = "siteLang";

  const EPS_KO = [
    {
      ep: "EP.1",
      tag: "START",
      icon: "🌞",
      title: "현식과 첫 번째 자기소개팅",
      titleHtml: '현식과 첫 번째 <span class="ep-mob-title-br"></span>자기소개팅',
      grid: "자기소개팅",
      body: "현식이 세상 밖으로 처음 나가는 오프닝 회차. 딱딱한 프로필 소개가 아니라, ‘처음 만나는 사람과 소개팅하듯’ 원현식을 알아가는 시간으로 구성한다. 가볍게 걷고, 묻고, 답하고, 웃으면서 현식이 어떤 사람인지 자연스럽게 보여주고, 앞으로의 여정을 예고한다.",
      kw: ["출발", "만남", "자기소개", "대화"],
      shots: ["assets/ep1-ref-a.png", "assets/ep1-ref-b.png"],
    },
    {
      ep: "EP.2",
      tag: "ROAD",
      icon: "🚗",
      title: "현식, 운전대를 잡고 추억여행을 떠나다",
      titleHtml: '현식, 운전대를 잡고 <span class="ep-desk-title-br"></span>추억여행을 떠나다',
      grid: "운전 +<br>추억여행",
      body: "현식이 직접 운전대를 잡고, 자신에게 의미 있는 장소로 이동하는 회차. 어릴 적 동네, 연습생 시절의 기억, 처음 노래를 좋아하게 된 순간 등 ‘초심’과 연결한다. 이후 회차에서도 운전은 콘텐츠의 기본 이동 장치로 활용 가능하다.",
      kw: ["운전", "드라이브", "추억", "초심"],
      shots: ["assets/outdoor-ref-a.webp", "assets/outdoor-ref-b.webp"],
    },
    {
      ep: "EP.3",
      tag: "LYRIC",
      icon: "✍️",
      title: "이야기를 작사로 써내보다",
      grid: "내 얘기<br>가사로",
      body: "현식이 본격적으로 자기 이야기를 노래로 남기기 위한 첫 단계. 작사가 또는 프로듀서와 함께 ‘내 이야기를 작사로 써내보는 법’을 배우는 회차다. 이후 모든 회차에서 나온 감정과 문장을 음악으로 연결하기 위한 장치가 된다.",
      kw: ["작사", "문장", "감정", "음악"],
      shots: ["assets/ep3-ref-a.png", "assets/ep3-ref-b.png"],
    },
    {
      ep: "EP.4",
      tag: "CAMP",
      icon: "⛺",
      title: "현식, 캠핑 가서 사진으로 하루를 남기다",
      titleHtml: '현식, 캠핑 가서 사진으로 <span class="ep-desk-title-br"></span>하루를 남기다',
      grid: "캠핑하고<br>한 컷",
      body: "현식이 해보고 싶어 했던 캠핑을 중심으로 한 회차. 캠핑장 또는 피크닉 공간에서 쉬고, 먹고, 대화하고, 사진으로 그날의 장면을 기록한다. 밤에는 캠핑장 라이브 또는 어쿠스틱 라이브로 감정적 엔딩을 구성한다.",
      kw: ["캠핑", "사진", "쉼", "밤"],
      shots: ["assets/ep4-ref-a.png", "assets/ep4-ref-b.png"],
    },
    {
      ep: "EP.5",
      tag: "STREET",
      icon: "🧥",
      title: "현식, 동묘를 걷고 야장에 앉아보다",
      titleHtml: '현식, 동묘를 걷고 <span class="ep-mob-title-br"></span>야장에 앉아보다',
      grid: "동묘 찍고<br>야장",
      body: "동묘에서 옷, 물건, 거리 분위기를 구경하며 현식의 자연스러운 리액션을 보여주는 회차. 후반부는 야장으로 이동해 편하게 먹고 이야기하는 구성. 예능감, 대중성, 숏폼 포인트가 가장 잘 나올 수 있는 회차다.",
      kw: ["동묘", "야장", "리액션", "숏폼"],
      shots: ["assets/story-ref-b.webp", "assets/ep5-ref-b.png"],
    },
    {
      ep: "EP.6",
      tag: "INTERVIEW",
      icon: "🎤",
      title: "현식, 친구와 로드인터뷰를 해보다",
      titleHtml: '현식, 친구와 <span class="ep-mob-title-br"></span>로드인터뷰를 해보다',
      grid: "친구랑<br>로드톡",
      body: "현식이 혼자 또는 친구/멤버와 함께 사람들을 만나보는 회차. “저 혹시 아이돌처럼 보이나요?”, “XODIAC 아세요?” 같은 질문으로 대중 반응을 자연스럽게 끌어낸다. 함께하는 인물이 있으면 현식의 편한 모습과 관계성도 살아난다.",
      kw: ["로드인터뷰", "친구", "멤버", "대중반응"],
      shots: ["assets/story-ref-a.webp", "assets/ep6-ref-b.png"],
    },
    {
      ep: "EP.7",
      tag: "BASEBALL",
      icon: "⚾",
      title: "현식, 야구장에 가서 하루를 즐기다",
      grid: "야구장에<br>가다",
      body: "야구장에 가서 응원, 먹거리, 관중 분위기, 현장 리액션을 담는 회차. 현식이 일상적인 대중 공간 속에 섞이는 모습이 잘 보일 수 있다. 응원가와 함성의 에너지를 감정 키워드로 연결해 마무리 가능하다.",
      kw: ["야구장", "응원", "먹거리", "리액션"],
      shots: ["assets/ep7-ref-a.png", "assets/ep7-ref-b.png"],
    },
    {
      ep: "EP.8",
      tag: "FINALE",
      icon: "🎙️",
      title: "현식, 작곡과 작사를 완성하다",
      grid: "노래로<br>완성",
      body: "시즌 동안 쌓아온 문장, 감정, 경험을 바탕으로 오리지널 곡을 완성하는 피날레. 작사 수업에서 시작된 흐름을 회수하고, 녹음 과정과 라이브 클립 공개까지 연결한다. ‘아이돌, 세상에 나가다 — 현식 편’의 최종 음악 IP가 완성되는 회차.",
      kw: ["작곡", "작사", "녹음", "피날레"],
      shots: ["assets/songmaking-ref-a.webp", "assets/songmaking-ref-b.webp"],
    },
  ];

  const EPS_EN = [
    {
      ep: "EP.1",
      tag: "START",
      icon: "🌞",
      title: "Hyunsik's first blind date with the world",
      titleHtml: 'Hyunsik\'s first <span class="ep-mob-title-br"></span>blind date with the world',
      grid: "Blind date<br>vibes",
      body: "The opening episode where Hyunsik steps outside the stage for the first time. Instead of a stiff profile intro, it's more like meeting Won Hyunsik on a first date—walk, ask, answer, laugh, and naturally show who he is while teasing the journey ahead.",
      kw: ["start", "meet", "intro", "talk"],
      shots: ["assets/ep1-ref-a.png", "assets/ep1-ref-b.png"],
    },
    {
      ep: "EP.2",
      tag: "ROAD",
      icon: "🚗",
      title: "Hyunsik takes the wheel on a memory road trip",
      titleHtml: 'Hyunsik takes the wheel on a <span class="ep-desk-title-br"></span>memory road trip',
      grid: "Driving +<br>memories",
      body: "Hyunsik drives himself to places that actually mean something—his old neighborhood, trainee memories, the moment he fell for singing. Driving becomes a core device for movement in later episodes too.",
      kw: ["drive", "road", "memories", "roots"],
      shots: ["assets/outdoor-ref-a.webp", "assets/outdoor-ref-b.webp"],
    },
    {
      ep: "EP.3",
      tag: "LYRIC",
      icon: "✍️",
      title: "Turning his story into lyrics",
      grid: "My story,<br>in lyrics",
      body: "The first real step toward putting his life into songs. With a songwriter or producer, he learns how to write lyrics from his own stories—setting up the thread that connects every episode's feelings to music.",
      kw: ["lyrics", "words", "feelings", "music"],
      shots: ["assets/ep3-ref-a.png", "assets/ep3-ref-b.png"],
    },
    {
      ep: "EP.4",
      tag: "CAMP",
      icon: "⛺",
      title: "Hyunsik goes camping and captures the day in photos",
      titleHtml: 'Hyunsik goes camping and <span class="ep-desk-title-br"></span>captures the day in photos',
      grid: "Camping +<br>one shot",
      body: "The camping episode he actually wanted to try. Rest, food, conversation, and photos that freeze the day—then a campsite or acoustic live performance to close on an emotional note.",
      kw: ["camping", "photos", "rest", "night"],
      shots: ["assets/ep4-ref-a.png", "assets/ep4-ref-b.png"],
    },
    {
      ep: "EP.5",
      tag: "STREET",
      icon: "🧥",
      title: "Hyunsik walks Dongmyo and ends up at a late-night bite",
      titleHtml: 'Hyunsik walks Dongmyo and <span class="ep-mob-title-br"></span>ends up at a late-night bite',
      grid: "Dongmyo +<br>late bite",
      body: "Browsing clothes, stuff, and street vibes in Dongmyo—pure, natural reactions. Later, a casual late-night meal and talk. Strong variety energy, mass appeal, and short-form moments.",
      kw: ["street", "food", "reactions", "shorts"],
      shots: ["assets/story-ref-b.webp", "assets/ep5-ref-b.png"],
    },
    {
      ep: "EP.6",
      tag: "INTERVIEW",
      icon: "🎤",
      title: "Hyunsik tries a road interview with a friend",
      titleHtml: 'Hyunsik tries a road <span class="ep-mob-title-br"></span>interview with a friend',
      grid: "Road talk<br>w/ friend",
      body: "Hyunsik meets people solo or with a friend/member. Questions like “Do I look like an idol?” or “Do you know XODIAC?” pull real public reactions. A co-star brings out his relaxed side and chemistry.",
      kw: ["interview", "friend", "member", "public"],
      shots: ["assets/story-ref-a.webp", "assets/ep6-ref-b.png"],
    },
    {
      ep: "EP.7",
      tag: "BASEBALL",
      icon: "⚾",
      title: "Hyunsik spends a day at the ballpark",
      grid: "Ballpark<br>day",
      body: "Cheering, stadium food, crowd energy, and in-the-moment reactions. Hyunsik blends into everyday public space. The cheers and chants can feed into the episode's emotional wrap-up.",
      kw: ["baseball", "cheer", "food", "reactions"],
      shots: ["assets/ep7-ref-a.png", "assets/ep7-ref-b.png"],
    },
    {
      ep: "EP.8",
      tag: "FINALE",
      icon: "🎙️",
      title: "Hyunsik finishes writing and composing",
      grid: "Finish it<br>in song",
      body: "The finale where lines, feelings, and experiences from the season become an original song. Picks up the lyric thread from earlier episodes, through recording and the live clip release—the music IP of “Idols, Step Into the World — Hyunsik” is complete.",
      kw: ["compose", "lyrics", "record", "finale"],
      shots: ["assets/songmaking-ref-a.webp", "assets/songmaking-ref-b.webp"],
    },
  ];

  /* 페이지 텍스트 맵: selector → { ko, en, html? } */
  const PAGE = [
    { sel: "#topbarBrand", ko: "Studio 596 Original · 아이돌, 세상에 나가다", en: "Studio 596 Original · Idols, Step Into the World" },
    { sel: "#s1 .hero-project", ko: "Road Music Project", en: "Road Music Project" },
    { sel: "#s1 .stamp", ko: "STUDIO 596 ORIGINAL · 2026", en: "STUDIO 596 ORIGINAL · 2026" },
    {
      sel: "#s1 .mtitle",
      html: true,
      ko: '아이돌,<br><em class="hl">세상에</em><br>나가다',
      en: 'Idols,<br><em class="hl">Step Into</em><br>the World',
    },
    { sel: "#s1 .hname", ko: "첫 번째 편: XODIAC 현식 편", en: "Episode 1: XODIAC Hyunsik" },
    {
      sel: "#s1 .hdesc",
      html: true,
      ko: '첫 번째 아이돌, XODIAC 현식<br><span class="hdesc-sub">무대 밖에서 경험하고, 이야기와 노래로 남기는 3개월의 기록</span>',
      en: 'First idol: XODIAC Hyunsik<br><span class="hdesc-sub">Three months of life outside the stage—stories and songs that stay</span>',
    },
    { sel: "#s1 .hero-spec", ko: "8 Episodes · 3 Months · 3 Original Songs", en: "8 Episodes · 3 Months · 3 Original Songs" },
    {
      sel: "#s1 .hero-quote",
      html: true,
      ko: "현식이 세상 밖에서 만난 순간들이,<br>하나의 음악이 됩니다",
      en: "The moments Hyunsik finds out in the world<br>become one song.",
    },
    {
      sel: "#s1 .scroll-hint",
      html: true,
      ko: "현식이 세상 밖으로 나가는 중<br>클로징까지 이어집니다 ↓",
      en: "Hyunsik is heading out into the world<br>Scroll to the closing ↓",
    },
    {
      sel: "#s2 .cbig",
      html: true,
      ko: '단순 브이로그가 아닌,<br><em>“경험 → 이야기 → 음악”</em><br>오리지널 IP',
      en: 'Not just a vlog—<br><em>“experience → story → music”</em><br>as original IP',
    },
    {
      sel: "#s2 .sb",
      html: true,
      ko: "무대 위 아이돌 현식이 아닌,<br>세상 밖으로 나온 원현식의 이야기.<br><br>운전, 캠핑, 만남, 식사, 대화 속에서<br>현식의 감정과 문장을 꺼내고,<br><br>매회 라이브 클립과 오리지널 곡 3곡으로<br>현식만의 음악적 기록을 완성합니다.",
      en: "Not idol Hyunsik on stage—<br>it's Won Hyunsik out in the real world.<br><br>Through driving, camping, meetups, meals, and talk,<br>he pulls out feelings and lines.<br><br>Each episode ends with a live clip,<br>and three original songs complete his musical arc.",
    },
    {
      sel: "#s2 .definition-box",
      ko: "현식의 경험이 이야기로, 이야기가 라이브 클립과 오리지널 음악으로 이어지는 로드 뮤직 콘텐츠.",
      en: "A road music show where Hyunsik's experiences become stories—and stories become live clips and original music.",
    },
    { sel: "#s3 .sh", ko: "왜 현식인가", en: "Why Hyunsik" },
    {
      sel: "#s3 .s3-intro p",
      ko: "XODIAC 현식은 감성적인 음색과 라이브 역량을 가진 메인보컬입니다. 동시에 스튜디오 안에서 정해진 질문에 답하는 방식보다, 밖에서 걷고, 먹고, 사람들을 만나며 자연스럽게 이야기할 때 매력이 더 잘 살아나는 아티스트입니다.",
      en: "XODIAC's Hyunsik is a main vocalist with a warm tone and real live chops. He's even more magnetic when he's walking, eating, and talking to people outside the studio—not answering scripted questions in a booth.",
    },
    { sel: "#s3 .frame-label", ko: "현식의 한마디", en: "In his words" },
    { sel: "#s3 .frame-quote", ko: "“솔직한 모습을 보여주고 싶어요”", en: '"I want to show the honest side of me."' },
    { sel: "#s3 .wcard:nth-child(1) h3", ko: "XODIAC 메인보컬, 감성적인 음색", en: "XODIAC main vocal, emotional tone" },
    {
      sel: "#s3 .wcard:nth-child(1) p",
      ko: "현식은 XODIAC의 메인보컬로, 감성적인 음색과 라이브 역량을 가진 아티스트입니다. 매회 엔딩 라이브 클립을 통해 단순 출연자가 아니라, 자연스럽게 노래하는 가수의 모습을 보여줍니다.",
      en: "As XODIAC's main vocal, his tone and live performance land naturally. End-of-episode live clips keep showing him as a singer—not just a guest.",
    },
    { sel: "#s3 .wcard:nth-child(2) h3", ko: "한 번 맞춰본 믿을 수 있는 호흡", en: "Proven chemistry you can trust" },
    {
      sel: "#s3 .wcard:nth-child(2) p",
      ko: "현식은 듀엣 프로젝트 ‘아무 말 없이도’를 통해 더웨이브스/MBC+와 이미 음악 제작, 라이브 클립, 쇼챔피언 무대, 비하인드 콘텐츠를 함께 진행한 경험이 있습니다. 기존 협업을 통해 보컬, 현장 적응력, 콘텐츠 호흡을 확인한 만큼 이번 프로젝트도 자연스럽게 이어갈 수 있습니다.",
      en: "Through the duet project “Without a Word,” he's already worked with The Waves/MBC+ on music, live clips, music show stages, and behind-the-scenes content—so vocal quality, on-set adaptability, and production rhythm are proven.",
    },
    { sel: "#s3 .wcard:nth-child(3) h3", ko: "스튜디오 밖에서 더 편해지는 현식", en: "More himself outside the studio" },
    {
      sel: "#s3 .wcard:nth-child(3) p",
      ko: "현식은 밖에서 움직이고, 먹고, 처음 보는 사람들과 이야기할 때 편안한 리액션이 잘 나오는 타입입니다. 운전, 캠핑, 야장, 동네 방문, 사람들과의 만남 속에서 현식의 인간적인 매력을 가볍고 재미있게 보여줄 수 있습니다.",
      en: "He's at ease on the move—eating, chatting with strangers, reacting naturally. Driving, camping, late-night bites, neighborhood visits, and meetups are perfect for showing his human side in a light, fun way.",
    },
    { sel: "#s3 .wcard:nth-child(4) h3", ko: "무겁지 않게 꺼내는 진짜 이야기", en: "Real stories, never heavy-handed" },
    {
      sel: "#s3 .wcard:nth-child(4) p",
      ko: "연습생 시절, 군 복무, 데뷔, 메인보컬 활동까지 현식에게는 무대 위 모습만으로는 다 보여주기 어려운 시간이 있습니다. 다만 이 콘텐츠는 과거사를 무겁게 파고드는 방식이 아니라, 편안한 대화 속에서 “그때는 그랬고, 그래서 지금이 더 좋다”는 식으로 자연스럽게 풀어갑니다.",
      en: "Trainee days, military service, debut, main vocal life—there's more to him than the stage. This show doesn't dig for drama; it lets stories surface gently: “that's how it was, and I'm grateful for now.”",
    },
    { sel: "#s4 .sh", ko: "콘텐츠 구조", en: "Show structure" },
    {
      sel: "#s4 .fmt-lead",
      html: true,
      ko: '본편 · 숏폼 · 라이브 클립 · 오리지널 곡으로 확장되는 <span class="fmt-lead-b">3개월 로드 뮤직 프로젝트</span>',
      en: 'A <span class="fmt-lead-b">3-month road music project</span> scaling across episodes, shorts, live clips, and original songs',
    },
    { sel: "#s4 .fmtc:nth-child(1) .fmtl", ko: "총 8회", en: "8 eps total" },
    { sel: "#s4 .fmtc:nth-child(2) .fmtl", ko: "약 3개월", en: "~3 months" },
    { sel: "#s4 .fmtc:nth-child(3) .fmtl", ko: "본편 내외", en: "~20 min each" },
    { sel: "#s4 .fmtc:nth-child(4) .fmtl", ko: "회차별 숏폼", en: "Shorts per ep" },
    { sel: "#s4 .fmtc:nth-child(5) .fmtl", ko: "매회 엔딩", en: "Every ep ending" },
    { sel: "#s4 .fmtc:nth-child(6) .fmtl", ko: "시즌 발매", en: "Season release" },
    { sel: "#s4 .flow-ko", ko: "경험 → 대화 → 라이브 클립 → 오리지널 곡", en: "Experience → talk → live clip → original song" },
    {
      sel: "#s4 .fmt-footer",
      html: true,
      ko: "본편, 숏폼, 라이브 클립, 오리지널 곡까지.<br>현식의 3개월이 콘텐츠 IP로 확장됩니다.",
      en: "Episodes, shorts, live clips, and original songs—<br>Hyunsik's three months grow into content IP.",
    },
    { sel: "#s5 .sh", ko: "8 Episodes · 1 Journey", en: "8 Episodes · 1 Journey" },
    {
      sel: "#s5 .sb",
      ko: "현식이 세상 밖에서 경험하고, 말하고, 노래로 남기는 8개의 여정",
      en: "Eight journeys where Hyunsik experiences, talks, and leaves it in song",
    },
    {
      sel: "#s5 .ep-hint",
      html: true,
      ko: '<span class="ep-hint-ico">👆</span>카드를 콕! 눌러보면 이야기가 쏙 나와요 — 하나씩 확인해 주세요 <span class="ep-hint-ico">✨</span>',
      en: '<span class="ep-hint-ico">👆</span>Tap a card—each story pops open. Take a look! <span class="ep-hint-ico">✨</span>',
    },
    { sel: "#s6 .sh", ko: "라이브 클립 시스템", en: "Live clip system" },
    {
      sel: "#s6 .lcsub",
      ko: "본편의 감정을 완성하고, 현식의 아티스트 이미지를 남기는 엔딩 포맷",
      en: "The ending format that completes each episode and keeps Hyunsik's artist image front and center",
    },
    { sel: "#s6 .cass-lbl", ko: "Road Cassette Player", en: "Road Cassette Player" },
    {
      sel: "#s6 .cass-sub",
      ko: "매회 남은 감정이 라이브로 쌓이고, 음악으로 이어집니다",
      en: "Feelings from each episode stack up as live moments—and flow into music",
    },
    { sel: "#s6 .s6-shots-lbl", ko: "샷 레퍼런스", en: "Shot references" },
    { sel: "#s6 .clipc:nth-child(1) .cn", ko: "차 안 라이브", en: "Car live" },
    {
      sel: "#s6 .clipc:nth-child(1) .cs",
      html: true,
      ko: "Drive · Close-up<br>이동 중 가장 편안한 목소리와<br>표정을 담는 라이브",
      en: "Drive · Close-up<br>His calmest voice and expressions<br>while on the road",
    },
    { sel: "#s6 .clipc:nth-child(2) .cn", ko: "캠핑장 라이브", en: "Campsite live" },
    {
      sel: "#s6 .clipc:nth-child(2) .cs",
      html: true,
      ko: "Night · Atmos<br>밤의 공기와 대화의 여운을<br>노래로 남기는 엔딩",
      en: "Night · Atmos<br>Night air and after-talk<br>wrapped in song",
    },
    { sel: "#s6 .clipc:nth-child(3) .cn", ko: "길 위 라이브", en: "Roadside live" },
    {
      sel: "#s6 .clipc:nth-child(3) .cs",
      html: true,
      ko: "Road · Memory<br>그날의 장면과 문장을<br>짧은 라이브로 기록",
      en: "Road · Memory<br>That day's scene and lines<br>in a short live take",
    },
    { sel: "#s6 .clipc:nth-child(4) .cn", ko: "카페 라이브", en: "Café live" },
    {
      sel: "#s6 .clipc:nth-child(4) .cs",
      html: true,
      ko: "Talk · Warm<br>대화가 끝난 뒤, 남은 감정을<br>조용히 부르는 라이브",
      en: "Talk · Warm<br>After the chat, whatever's left<br>sung softly",
    },
    { sel: "#s6 .clipc:nth-child(5) .cn", ko: "스튜디오596 라이브", en: "Studio 596 live" },
    {
      sel: "#s6 .clipc:nth-child(5) .cs",
      html: true,
      ko: "Signature · Original<br>현식의 보컬을 가장 선명하게 남기는 시그니처 클립",
      en: "Signature · Original<br>The clearest snapshot of Hyunsik's vocal identity",
    },
    { sel: "#s6 .clipc:nth-child(6) .cn", ko: "1절/어쿠스틱", en: "Verse / acoustic" },
    {
      sel: "#s6 .clipc:nth-child(6) .cs",
      html: true,
      ko: "Shortform · Acoustic<br>한 절만으로도 공유될 수 있는<br>짧고 선명한 라이브",
      en: "Shortform · Acoustic<br>One verse is enough to share—<br>short and sharp",
    },
    { sel: "#s7 .sh", ko: "오리지널 뮤직 IP", en: "Original music IP" },
    {
      sel: "#s7 .sb",
      ko: "현식의 경험과 이야기가 음악으로 확장되는 오리지널 IP",
      en: "Original IP where Hyunsik's experiences and stories expand into music",
    },
    { sel: "#s7 .alb:nth-child(1) .albtitle", ko: "바깥으로 나가는 마음", en: "Heart heading out" },
    { sel: "#s7 .alb:nth-child(1) .albtheme", ko: "자유 · 첫 출발 · 설렘", en: "Freedom · first step · excitement" },
    { sel: "#s7 .alb:nth-child(2) .albtitle", ko: "다시 노래하는 이유", en: "Why I sing again" },
    { sel: "#s7 .alb:nth-child(2) .albtheme", ko: "초심 · 과거 · 진심", en: "Roots · past · sincerity" },
    { sel: "#s7 .alb:nth-child(3) .albtitle", ko: "세상에 나온 아이돌", en: "An idol out in the world" },
    { sel: "#s7 .alb:nth-child(3) .albtheme", ko: "지금의 현식 · 다음 시작 · 완성", en: "Hyunsik now · next chapter · completion" },
    {
      sel: "#s7 .music-note",
      ko: "각 회차에서 수집한 키워드와 이야기 요소를 바탕으로, 현식의 오리지널 곡 3곡을 완성합니다",
      en: "Three original songs built from keywords and story beats collected across the season",
    },
    { sel: "#valTitle", ko: "기대 효과", en: "Expected impact" },
    {
      sel: "#valSub",
      ko: "현식 · 채널 · 음악 IP 관점에서 기대되는 확장 효과",
      en: "Expected growth for Hyunsik, the channel, and the music IP",
    },
    { sel: "#s8 .valc:nth-child(1) h4", ko: "개인 인지도 확장", en: "Broader personal reach" },
    {
      sel: "#s8 .valc:nth-child(1) p",
      html: true,
      ko: '무대 밖 모습까지 보여주는<span class="val-mob-br"></span>개인 콘텐츠 자산',
      en: 'Personal content that shows<span class="val-mob-br"></span>who he is off stage',
    },
    { sel: "#s8 .valc:nth-child(2) h4", ko: "인간적 매력 노출", en: "Human-side charm" },
    {
      sel: "#s8 .valc:nth-child(2) p",
      html: true,
      ko: '대화·이동·체험 속<span class="val-mob-br"></span>자연스러운 캐릭터 형성',
      en: 'Natural character through<span class="val-mob-br"></span>talk, travel, and experiences',
    },
    { sel: "#s8 .valc:nth-child(3) h4", ko: "팬덤 결속 강화", en: "Stronger fan bond" },
    {
      sel: "#s8 .valc:nth-child(3) p",
      html: true,
      ko: '매회 본편과 라이브 클립으로<span class="val-mob-br"></span>지속 접점 확보',
      en: 'Steady touchpoints via<span class="val-mob-br"></span>episodes and live clips',
    },
    { sel: "#s8 .valc:nth-child(4) h4", ko: "대중 친화 이미지", en: "Mass-friendly image" },
    {
      sel: "#s8 .valc:nth-child(4) p",
      html: true,
      ko: '일상 공간과 체험을 통해<span class="val-mob-br"></span>접근성 높은 이미지 구축',
      en: 'Everyday spaces and experiences<span class="val-mob-br"></span>build approachable appeal',
    },
    { sel: "#s8 .valc:nth-child(5) h4", html: true, ko: '보컬 아티스트<span class="val-mob-br"></span>이미지 강화', en: 'Vocal artist<span class="val-mob-br"></span>image' },
    {
      sel: "#s8 .valc:nth-child(5) p",
      html: true,
      ko: '엔딩 라이브와 오리지널 곡으로<span class="val-mob-br"></span>음악적 정체성 부각',
      en: 'Ending lives and originals<span class="val-mob-br"></span>highlight his musical identity',
    },
    { sel: "#s8 .valc:nth-child(6) h4", html: true, ko: '오리지널 음악<span class="val-mob-br"></span>자산 확보', en: 'Original music<span class="val-mob-br"></span>assets' },
    {
      sel: "#s8 .valc:nth-child(6) p",
      html: true,
      ko: '본편 서사를 기반으로 한<span class="val-mob-br"></span>오리지널 곡 3곡 제작',
      en: 'Three original songs<span class="val-mob-br"></span>rooted in the season arc',
    },
    { sel: "#s8 .valc:nth-child(7) h4", html: true, ko: '숏폼·라이브<span class="val-mob-br"></span>클립 확장', en: 'Shorts & live<span class="val-mob-br"></span>clip scale' },
    {
      sel: "#s8 .valc:nth-child(7) p",
      html: true,
      ko: '본편 이후에도 활용 가능한<span class="val-mob-br"></span>영상 클립 자산 확보',
      en: 'Reusable video clips<span class="val-mob-br"></span>beyond the main episodes',
    },
    { sel: "#s8 .valc:nth-child(8) h4", html: true, ko: '596 오리지널<span class="val-mob-br"></span>포맷 확보', en: 'Studio 596<span class="val-mob-br"></span>original format' },
    {
      sel: "#s8 .valc:nth-child(8) p",
      html: true,
      ko: '본편·숏폼·라이브·음악을 결합한<span class="val-mob-br"></span>시리즈 포맷 구축',
      en: 'A series format combining<span class="val-mob-br"></span>episodes, shorts, lives, and music',
    },
    { sel: "#s9 .sh", ko: "왜 이 프로그램인가", en: "Why this show" },
    { sel: "#s9 .swhybox h2", ko: "브랜드가 자연스럽게 살아 숨쉬는 콘텐츠 구조", en: "A structure where brands breathe naturally" },
    {
      sel: "#s9 .swhybox p",
      ko: "제품은 현식의 이동·캠핑·자전거·사진·라이브 클립 속 오브제로 자연스럽게 노출될 수 있고, 공간·프랜차이즈 브랜드는 현식이 직접 방문하고 경험하는 방식으로 콘텐츠화할 수 있습니다. 팬덤 기반 이벤트와 브랜드 이벤트를 연결할 수도 있습니다.",
      en: "Products can live in the objects of his drives, camping, bikes, photos, and live clips. Places and franchises become content when he visits and experiences them. Fan events and brand activations can link up too.",
    },
    { sel: "#s9 .spoint:nth-child(1) h4", ko: "🌟 XODIAC 현식의 매력", en: "🌟 Why Hyunsik works" },
    { sel: "#s9 .spoint:nth-child(2) h4", ko: "📡 MBC Studio 596 채널", en: "📡 MBC Studio 596 channel" },
    { sel: "#s9 .spoint:nth-child(3) h4", ko: "📦 만들어지는 콘텐츠 자산", en: "📦 Content assets created" },
    { sel: "#s10 .sh", ko: "스폰서 유형 & 이벤트", en: "Sponsor types & events" },
    { sel: "#s10 .styc:nth-child(1) h3", html: true, ko: '<span class="ttag tt1">Product</span> 물품형', en: '<span class="ttag tt1">Product</span> Physical' },
    { sel: "#s10 .styc:nth-child(2) h3", html: true, ko: '<span class="ttag tt2">Place</span> 공간형', en: '<span class="ttag tt2">Place</span> Venues' },
    { sel: "#s10 .styc:nth-child(3) h3", html: true, ko: '<span class="ttag tt3">Experience</span> 체험형', en: '<span class="ttag tt3">Experience</span> Experiential' },
    { sel: "#s10 .styc:nth-child(4) h3", html: true, ko: '<span class="ttag tt4">Event</span> 이벤트 연계', en: '<span class="ttag tt4">Event</span> Fan events' },
    {
      sel: "#s11 .cquote",
      html: true,
      ko: "세상 밖에서 경험한 순간들로,<br>이야기와 노래를 만들어갑니다.",
      en: "From moments out in the world,<br>we build stories—and songs.",
    },
    {
      sel: "#s11 .csub",
      html: true,
      ko: "XODIAC 현식의 첫 번째 로드 뮤직 프로젝트<br>MBC Studio 596 Original 「아이돌, 세상에 나가다」",
      en: "Hyunsik's first road music project<br>MBC Studio 596 Original 「Idols, Step Into the World」",
    },
    { sel: "#s11 .cspec", ko: "8 Episodes · 3 Months · 3 Original Songs", en: "8 Episodes · 3 Months · 3 Original Songs" },
    { sel: "#s11 .conf", ko: "© The Waves · MBC Studio 596 · XODIAC HYUNSIK · Proposal Web Page", en: "© The Waves · MBC Studio 596 · XODIAC HYUNSIK · Proposal Web Page" },
  ];

  const KW_S3_KO = ["보컬", "감성", "리액션", "야외 토크", "운전", "캠핑", "야장", "동네 방문", "라이브 클립", "오리지널 음악"];
  const KW_S3_EN = ["Vocal", "Emotion", "Reactions", "Outdoor talk", "Driving", "Camping", "Late bite", "Hometown", "Live clips", "Original music"];

  const SPON_S9 = {
    ko: [
      ["아이돌 팬덤 보유 메인보컬", "드라마 출연, 대중 인지도 확장 중", "MBC+와 협업 검증 완료", "자연스럽고 친근한 예능감"],
      ["MBC 공식 음악 유튜브 채널", "아이돌 팬덤 타깃 핵심 플랫폼", "본편+숏폼+라이브 클립 다중 노출", "오리지널 IP로 지속적 노출"],
      ["본편 8편 (20분 내외)", "숏폼 N개 (회차별)", "라이브 클립 8개 이상", "오리지널 곡 3곡 음원 발매"],
    ],
    en: [
      ["Main vocal with a solid fanbase", "Drama credits, growing public awareness", "Proven collab with MBC+", "Natural, friendly variety energy"],
      ["Official MBC music YouTube channel", "Core platform for idol fandoms", "Episodes + shorts + live clips", "Long-tail exposure as original IP"],
      ["8 main episodes (~20 min)", "Multiple shorts per episode", "8+ live clips", "3 original songs released"],
    ],
  };

  const SPON_S10 = {
    ko: [
      { ul: ["🎒 제품 사용·착용 장면 노출", "🚗 차량·캠핑·자전거 자연 노출", "📹 라이브 클립 오브제 노출"], chips: ["캠핑 의자", "자전거", "텀블러", "이어폰", "향수", "카메라"] },
      { ul: ["🏪 매장 방문 현장 토크", "🎵 브랜드 공간 라이브 클립 촬영", "🎉 브랜드 메뉴 연계 팬 이벤트"], chips: ["카페", "국밥집", "생활맥주", "캠핑장", "사진관"] },
      { ul: ["🎯 브랜드 체험을 회차 메인으로", "📸 현식이 찍은 사진을 브랜드 이미지로", "💬 체험 소감 자연스러운 토크"], chips: ["브랜드 호감도", "팬덤 직접 접촉", "SNS 바이럴"] },
      { ul: ["🖼️ 현식 사인 폴라로이드 이벤트", "📍 매장 방문 인증 이벤트", "🎧 스트리밍 인증 브랜드 증정", "💬 라이브 클립 댓글 이벤트"], chips: ["팬덤 구매 전환", "방문 트래픽", "인지도 상승"] },
    ],
    en: [
      { ul: ["🎒 Product use & wear on camera", "🚗 Natural placement in drive/camp/bike scenes", "📹 Objects in live clips"], chips: ["Camp chair", "Bike", "Tumbler", "Earbuds", "Fragrance", "Camera"] },
      { ul: ["🏪 In-store visits & talk", "🎵 Live clips shot in brand spaces", "🎉 Fan events tied to brand menus"], chips: ["Café", "Local eateries", "Beer brand", "Campsite", "Photo studio"] },
      { ul: ["🎯 Brand experience as the episode core", "📸 Hyunsik's photos as brand visuals", "💬 Casual talk after trying it"], chips: ["Brand favorability", "Direct fan contact", "Social buzz"] },
      { ul: ["🖼️ Signed polaroid events", "📍 Visit check-in events", "🎧 Stream & win promos", "💬 Live clip comment events"], chips: ["Fan purchase lift", "Foot traffic", "Awareness boost"] },
    ],
  };

  let siteLang = localStorage.getItem(STORAGE_KEY) || "ko";

  function getEps() {
    return siteLang === "en" ? EPS_EN : EPS_KO;
  }

  function getLang() {
    return siteLang;
  }

  function applyKwRow() {
    const row = document.querySelector("#s3 .kw-row");
    if (!row) return;
    const list = siteLang === "en" ? KW_S3_EN : KW_S3_KO;
    row.innerHTML = list.map((k) => `<span class="kw-chip">${k}</span>`).join("");
  }

  function applyEpGrid() {
    const nodes = document.querySelectorAll("#epGrid .emini");
    const eps = getEps();
    nodes.forEach((node, i) => {
      const et = node.querySelector(".et");
      if (et && eps[i]) et.innerHTML = eps[i].grid;
    });
  }

  function applySponsorBlocks() {
    const lang = siteLang;
    document.querySelectorAll("#s9 .spoint").forEach((box, i) => {
      const ul = box.querySelector("ul");
      if (!ul) return;
      ul.innerHTML = SPON_S9[lang][i].map((li) => `<li>${li}</li>`).join("");
    });
    document.querySelectorAll("#s10 .styc").forEach((box, i) => {
      const data = SPON_S10[lang][i];
      const ul = box.querySelector("ul");
      const chips = box.querySelector(".chips");
      if (ul) ul.innerHTML = data.ul.map((li) => `<li>${li}</li>`).join("");
      if (chips) chips.innerHTML = data.chips.map((c) => `<span class="chip">${c}</span>`).join("");
    });
  }

  function applyModeLabels(isSponsor) {
    const mtag = document.getElementById("mtag");
    const valSub = document.getElementById("valSub");
    if (!mtag) return;
    if (isSponsor) {
      mtag.textContent = "SPONSOR";
      mtag.className = "mode-tag mode-spon";
      if (valSub)
        valSub.textContent =
          siteLang === "en"
            ? "Value for Hyunsik, MBC Studio 596, and partner brands"
            : "현식, MBC Studio 596, 그리고 브랜드에 돌아가는 가치";
    } else {
      mtag.textContent = "MANAGEMENT";
      mtag.className = "mode-tag mode-mgmt";
      mtag.title = siteLang === "en" ? "For labels / MBC" : "기획사/MBC용";
      if (valSub)
        valSub.textContent =
          siteLang === "en"
            ? "Expected growth for Hyunsik, the channel, and the music IP"
            : "현식 · 채널 · 음악 IP 관점에서 기대되는 확장 효과";
    }
  }

  function applySiteLang(lang) {
    siteLang = lang === "en" ? "en" : "ko";
    localStorage.setItem(STORAGE_KEY, siteLang);
    document.documentElement.lang = siteLang === "en" ? "en" : "ko";
    document.title =
      siteLang === "en"
        ? "Idols, Step Into the World — MBC Studio 596"
        : "아이돌, 세상에 나가다 — MBC Studio 596";

    PAGE.forEach((item) => {
      const el = document.querySelector(item.sel);
      if (!el) return;
      const val = siteLang === "en" ? item.en : item.ko;
      if (item.html) el.innerHTML = val;
      else el.textContent = val;
    });

    applyKwRow();
    applyEpGrid();
    applySponsorBlocks();

    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.classList.toggle("on", btn.dataset.lang === siteLang);
    });
  }

  function initLangToggle(isSponsor) {
    document.getElementById("langKo")?.addEventListener("click", () => {
      applySiteLang("ko");
      applyModeLabels(isSponsor);
    });
    document.getElementById("langEn")?.addEventListener("click", () => {
      applySiteLang("en");
      applyModeLabels(isSponsor);
    });
    applySiteLang(siteLang);
    applyModeLabels(isSponsor);
  }

  global.SiteI18n = {
    getEps,
    getLang,
    applySiteLang,
    initLangToggle,
    EPS_KO,
    EPS_EN,
  };
})(window);
