# CSS 정리

## 1. CSS란?

- **CSS(Cascading Style Sheets)**: HTML로 작성된 문서의 **표현(스타일)** 을 담당하는 언어.
- HTML이 문서의 **구조(뼈대)** 를 담당한다면, CSS는 **색상, 글꼴, 여백, 배치, 반응형** 등 **시각적 표현**을 담당한다.
- 스타일 시트는 **캐스케이딩(Cascading, 우선순위에 따른 상속/적용)** 규칙을 따른다.
- **분리 원칙**: 구조(HTML) / 표현(CSS) / 동작(JS)을 분리하면 유지보수성이 높아진다.

---

## 2. CSS 적용 방식 3가지

### 2-1. Inline CSS (인라인 방식)
- 태그의 `style` 속성에 직접 작성.
- **가장 우선순위가 높음** (다만 `!important`보다는 낮음).
- 재사용이 어렵고 HTML이 지저분해짐 → **테스트/임시용**으로 적합.

```html
<p style="color: red; font-size: 16px;">인라인 스타일</p>

2-2. Internal CSS (내부 방식)
HTML <head> 안의 <style> 태그에 작성.

해당 HTML 문서에만 적용됨 → 한 페이지 전용 스타일.

여러 페이지에 동일 스타일을 쓰려면 각 페이지마다 중복 작성해야 함.

html
<head>
  <style>
    p { color: blue; }
  </style>
</head>

2-3. External CSS (외부 방식)
별도의 .css 파일을 만들고 <link>로 불러오는 방식.

가장 권장되는 방식: 재사용성, 유지보수성, 캐시 활용 등 장점.

이번 과제에서 사용한 방식 (resume_style.css).

html
<head>
  <link rel="stylesheet" href="resume_style.css" />
</head>
🔎 우선순위 정리
방식	우선순위	비고
Inline CSS	가장 높음	!important 제외
Internal / External	동일 (나중에 선언된 것이 우선)	캐스케이딩 규칙
!important	최우선	남용 금지
실제 적용 우선순위는 선택자 명시도(Specificity) 와 선언 순서에 의해 결정된다.

3. CSS Selector (선택자)
선택자	예시	설명
전체 선택자	*	모든 요소
태그(타입) 선택자	p, h1	특정 태그
클래스 선택자	.btn	class="btn" 요소
ID 선택자	#header	id="header" 요소 (문서 내 1개 권장)
속성 선택자	input[type="text"]	특정 속성 기준
자손 선택자	div p	div 내부의 모든 p
자식 선택자	div > p	div의 직계 자식 p
인접 형제 선택자	h1 + p	h1 바로 다음 p
일반 형제 선택자	h1 ~ p	h1 이후의 모든 p
가상 클래스	a:hover, li:nth-child(2)	상태/위치
가상 요소	p::before, p::after	요소 앞뒤 생성
명시도(Specificity) 순서: !important > Inline > ID > Class/Attribute/Pseudo-class > Tag/Pseudo-element > *

4. 주요 style 속성

4-1. 텍스트 관련
속성	설명	예시
font-size	글자 크기	font-size: 16px; / 1.2em / 1rem
font-weight	글자 굵기	400 (normal), 700 (bold)
text-align	텍스트 정렬	left, center, right, justify
css
.title {
  font-size: 24px;
  font-weight: 700;
  text-align: center;
}

4-2. Box Model (박스 모델)
모든 HTML 요소는 박스(box) 로 취급되며, 다음 4가지 영역으로 구성된다.

text
┌──────────────────────────────┐
│           margin             │  ← 요소 바깥 여백
│  ┌────────────────────────┐  │
│  │        border          │  │  ← 테두리
│  │  ┌──────────────────┐  │  │
│  │  │     padding      │  │  │  ← 테두리 안쪽 여백
│  │  │  ┌────────────┐  │  │  │
│  │  │  │  content   │  │  │  │  ← 실제 내용(텍스트/이미지)
│  │  │  └────────────┘  │  │  │
│  │  └──────────────────┘  │  │
│  └────────────────────────┘  │
└──────────────────────────────┘
속성	설명	예시
margin	요소 바깥쪽 여백	margin: 10px 20px;
padding	요소 안쪽 여백	padding: 16px;
border	테두리 (굵기/스타일/색)	border: 1px solid #ccc;
width / height	내용 영역의 크기	width: 300px;
box-sizing	크기 계산 기준	content-box(기본) / border-box

4-3. box-sizing이 중요한 이유
기본값 content-box: width가 content 영역만 반영 → padding/border 추가 시 전체 크기가 커짐.

border-box: width가 content + padding + border를 포함 → 레이아웃 계산이 쉬움.

실무에서는 전역 border-box 를 거의 기본으로 사용한다.

css
*,
*::before,
*::after {
  box-sizing: border-box;
}

4-4. 아이템 정렬 (Flexbox 맛보기)
속성	설명
display: flex	자식 요소들을 1차원(가로/세로) 으로 배치
justify-content	주축 정렬 (flex-start, center, space-between 등)
align-items	교차축 정렬 (flex-start, center, stretch 등)
gap	아이템 사이 간격
flex-wrap	줄바꿈 허용 여부
css
.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}
4-5. 반응형 디자인 (Media Query)
css
@media (max-width: 600px) {
  .header-content {
    flex-direction: column;
  }
}
max-width: 화면이 그 값 이하일 때 적용 (모바일 우선이면 min-width)

viewport 메타 태그와 함께 사용해야 모바일에서 의도대로 동작:

html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

5. 이번 과제에서 적용한 포인트

학습 내용	적용 위치
External CSS	resume_style.css 파일 + <link> 연결
Semantic 태그	<header>, <main>, <section>
Box Model	padding, margin, border, border-radius
box-sizing: border-box	전역 리셋
텍스트 스타일	h1, h2, h3의 font-size, font-weight, text-align
반응형 디자인	@media (max-width: 768px), @media (max-width: 480px)
인쇄 스타일	@media print

text

---

