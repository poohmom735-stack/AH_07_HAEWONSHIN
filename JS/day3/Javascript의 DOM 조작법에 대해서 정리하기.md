# 🏷️ [Javascript의 DOM 조작법] 개념 정리 

- 학습일 : 2026-10-19  

## DOM(Document Object Model) 이란?

DOM(Document Object Model, 문서 객체 모델)은 웹 브라우저가 정적인 HTML 문서를 컴퓨터가 이해하고 조작할 수 있도록 트리 구조의 객체(Object)로 바꾼 프로그래밍 인터페이스(API)입니다.
브라우저는 원시 텍스트인 HTML 코드를 그대로 이해하지 못하기 때문에, 이를 쪼개서 계층적인 구조로 메모리에 생성합니다. 

이 구조 덕분에 JavaScript와 같은 프로그래밍 언어가 웹 페이지의 구조, 스타일, 내용을 동적으로 추가, 수정, 삭제할 수 있게 됩니다.
DOM의 핵심 특징과 구조는 다음과 같습니다.

🌳 트리 구조 (DOM Tree)

DOM은 HTML 문서의 상하 관계를 나뭇가지 형태의 계층 구조(tree 구조)로 표현합니다. tree의 자료구조는 이름에서 알 수 있는 것처럼 하나의 root node에서 시작됩니다. 
그런데 나무는 땅에서 솟아서 점점 위로 뻗어나가지만 tree형 자료구조는 흔히 위의 root node에서 아래로 퍼져나가는 형태로 그립니다. 

​tree에서는 위쪽의 node를 부모(parent) 노드 아랫쪽 노드를 자식(child)라고 합니다. root node는 가장 위에서 시작되는 node이니까 parent가 없는 node가 됩니다. 그리고 children(자식)이 없는 node를 leaf node라고 합니다
tree 구조에서 root 노드를 포함한 모든 개개의 개체를 node라고 표현합니다. head, body, title, script, h1, HEADER-1 등의 태그뿐 아니라 태그 안의 텍스트나 속성 등도 모두 node에 속합니다. 
이중 HTML 태그를 요소노드(Element Node)라고 부르고 요소 노드 안에 있는 글자를 Text 노드(Text Node)라고 부르기도 합니다.

<img width="485" height="507" alt="image" src="https://github.com/user-attachments/assets/cd8cb1a1-a76a-40bb-81de-9cd00a9ed58b" />

• 노드 (Node): 트리를 구성하는 각 객체를 의미합니다. HTML 요소, 속성, 텍스트 등이 모두 각각의 노드가 됩니다.
• 루트 노드 (Root Node): 트리의 최상단에 위치하는 document 객체입니다. 브라우저는 이 document를 통해 모든 HTML 요소에 접근합니다.

JavaScript로 문서객체를 생성한다는 것은 어떤 의미인가?

문서 객체가 생성되는 방식은 두 가지로 나누어 볼 수 있습니다. 우선 웹 브라우저가 HTML 페이지에 적혀 있는 태그를 읽으면 생성하는 것입니다. 이런 과정을 정적으로 문서 객체를 생성한다고 말합니다. 단순히 적혀져 있는 그대로 문서객체가 생성되는 것을 표현한 것입니다. 
반대로 원래 HTML 페이지에 없던 문서객체를 JavaScript를 이용해서 생성할 수 있습니다. 이런 과정을 동적으로 문서객체를 생성한다고 합니다. 따라서 JavaScript로 문서객체를 생성한다는 것은 처음에는 HTML 페이지에 없던 문서객체를 동적으로 생성하는 것이 됩니다. 


### 왜 DOM이 필요할까요?

• 정적인 문서를 동적으로 변경: 원래 HTML은 한 번 작성되면 변하지 않는 정적인 텍스트입니다. 하지만 DOM이 존재함으로써 사용자가 버튼을 클릭했을 때 글자가 바뀌거나, 새로운 메뉴가 나타나는 등의 동적인 상호작용이 가능해집니다.
• 언어 독립적 인터페이스: DOM은 W3C 표준으로 정의되어 있어 꼭 JavaScript가 아니더라도 다양한 언어에서 웹 페이지를 제어하는 데 활용할 수 있습니다

- DOM은 어떻게 사용할까?
- 
아래의 코드는 JavaScript를 사용해서 동적으로 문서객체를 생성하는 예를 보겠습니다.
<img width="647" height="472" alt="image" src="https://github.com/user-attachments/assets/fef41bd2-b205-43f3-8cb3-133e44a9388d" />


## Selector(선택자)로 DOM 요소 가져오기

### JavaScript에서 CSS 선택자(Selector)를 사용해 DOM 요소를 가져올 때는 querySelector()와 querySelectorAll() 메서드를 사용합니다. 
이 메서드들을 사용하면 마치 CSS에서 스타일을 입힐 때처럼 편리하게 원하는 HTML 요소를 선택할 수 있습니다.

// 1. 태그 선택자: 가장 처음 나오는 <p> 태그를 가져옴
const firstParagraph = document.querySelector('p');

// 2. 클래스 선택자 (.): 클래스명이 'menu-item'인 첫 번째 요소를 가져옴
const firstMenu = document.querySelector('.menu-item');

// 3. 아이디 선택자 (#): 아이디가 'main-title'인 요소를 가져옴
const mainTitle = document.querySelector('#main-title');

// 4. 복합 선택자: 아이디가 'nav'인 요소 내부의 클래스가 'active'인 <li> 태그
const activeMenu = document.querySelector('#nav li.active');

### document.querySelectorAll('선택자')

조건에 맞는 모든 요소를 찾아 일종의 배열 형태(NodeList)로 반환합니다. 
만족하는 요소가 없으면 빈 NodeList를 반환합니다

// 클래스명이 'box'인 모든 요소를 가져옴
const boxes = document.querySelectorAll('.box');

// 전체 요소를 순회하며 작업할 때 주로 forEach를 사용합니다.
boxes.forEach((box) => {
  box.style.backgroundColor = 'blue'; // 모든 박스의 배경색을 파란색으로 변경
});

### 기존 방식과의 차이점 

과거에는 getElementById('id')나 getElementsByClassName('class') 같은 메서드를 주로 사용했습니다. 
기존 방식과 선택자(Selector) 방식은 위가  차이가 있습니다.

최근 현대적인 웹 개발에서는 특별한 성능 최적화가 필요한 경우가 아니라면, 
가독성과 범용성이 뛰어난 querySelector와 querySelectorAll을 사용하는 것이 표준처럼 권장됩니다.

• document.querySelector('선택자')
	• 일치하는 요소 중 맨 처음 발견된 딱 1개만 가져옵니다.
	• 존재하지 않으면 null을 반환합니다.
  
• document.querySelectorAll('선택자')
	• 일치하는 모든 요소를 한꺼번에 다 가져옵니다.
	• 결과는 배열과 유사한 NodeList 형태로 반환됩니다


## Event 란?
웹 페이지에서 발생하는 모든 동작이나 사건을 Event(이벤트)라고 하며, 

### EventListener(이벤트 리스너)
이를 감지하고 처리하는 도구가 EventListener(이벤트 리스너)입니다.

### EventListener(이벤트 리스너) 란?

이벤트 리스너는 말 그대로 "이벤트가 일어나는지 귀를 기울여 듣고 있는 감시자"입니다.
특정 HTML 요소에서 지정한 이벤트가 발생하는지 지켜보고 있다가, 사건이 터지면 연결된 자바스크립트 함수(이벤트 핸들러)를 실행시킵니다.

### EventListener(이벤트 리스너) 를 사용하는 목적, 이유

HTML 문서 자체는 정적이기 때문에 화면이 스스로 움직이지 못합니다. 이벤트 리스너를 사용하는 이유는 다음과 같습니다.
• 동적인 상호작용: 사용자가 버튼을 눌렀을 때 팝업창을 띄우거나, 스크롤을 내릴 때 애니메이션이 작동하는 등 인터랙티브한 웹사이트를 만들기 위함입니다.
• 관심사 분리: HTML(구조)과 JavaScript(동작) 코드를 깔끔하게 분리하여 유지보수를 쉽게 만듭니다. (HTML 태그 안에 onclick="..."을 직접 적는 과거 방식 탈피)
• 다중 연결 가능: 하나의 버튼에 "클릭 시 로그 수집", "클릭 시 화면 변경" 등 여러 개의 독립된 기능을 동시에 심어둘 수 있습니다.

### EventListener(이벤트 리스너) 정의하기

가장 표준적이고 권장되는 정의 방법은 addEventListener() 메서드를 사용하는 것입니다.

기본 문법

javascript
~~~
요소.addEventListener('이벤트타입', 실행할함수);
~~~

실제 구현 예시

html 
~~~
<button id="myBtn">클릭해 보세요</button>
~~~

javascript
~~~
// 1. 요소를 먼저 가져옵니다.
const button = document.querySelector('#myBtn');

// 2. 이벤트 리스너를 정의합니다.
button.addEventListener('click', function() {
  alert('버튼이 클릭되었습니다!');
});
~~~                                                 
  

### EventListener(이벤트 리스너) 응용


① 어떤 요소가 클릭되었는지 정보 활용하기 (event 객체)

이벤트가 발생하면 브라우저는 발생한 사건의 상세 정보를 담은 event 객체를 함수에 전달합니다.

~~~
javascript
button.addEventListener('click', (event) => {
  console.log(event.target); // 클릭된 HTML 요소 자체를 가리킴 (<button>...</button>)
  console.log(event.clientX, event.clientY); // 클릭된 화면의 X, Y 좌표
});
~~~

② 이벤트 기본 동작 막기 (preventDefault)

<a> 태그를 누르면 페이지가 이동하고, <form>을 제출하면 새로고침이 됩니다. 이런 브라우저의 기본 작동을 막고 자바스크립트로 따로 제어할 때 응용합니다.
~~~
javascript
const link = document.querySelector('a');

link.addEventListener('click', (event) => {
  event.preventDefault(); // 링크가 작동해서 페이지가 이동하는 것을 막음
  console.log('페이지 이동 대신 이 문구가 출력됩니다.');
});
~~~

③ 이벤트 제거하기 (removeEventListener)

특정 조건이 만족된 후 더 이상 이벤트를 감지할 필요가 없을 때 리스너를 삭제하여 메모리를 절약합니다. (※ 제거할 때는 익명 함수가 아닌 이름을 가진 함수를 연결해야 합니다.)
~~~
javascript
function handleClick() {
  console.log('딱 한 번만 실행됩니다.');
  
  // 실행 후 바로 리스너 제거
  button.removeEventListener('click', handleClick);
}

button.addEventListener('click', handleClick);
~~~

## 마우스 감지란?
마우스 감지 사용

마우스 감지는 웹 페이지나 애플리케이션에서 사용자의 마우스 움직임, 클릭, 휠 조작, 특정 요소 위로 커서가 올라가는 행동(호버) 등의 이벤트를 실시간으로 포착하고 반응하는 기술입니다. 자바스크립트(JavaScript)의 이벤트 리스너(addEventListener)를 활용해 구현합니다.

마우스 감지 사용 예시

주요 마우스 이벤트 종류와 웹 페이지에서의 활용 방법입니다.

• mousemove (움직임 감지): 마우스 커서의 좌표를 실시간으로 추적합니다. 커스텀 마우스 커서 효과를 만들거나 게임을 구현할 때 씁니다.
• mouseenter / mouseleave (진입/이탈 감지): 마우스가 특정 영역에 들어오거나 나갈 때 발생합니다. 네비게이션 드롭다운 메뉴나 카드 UI의 호버 시각 효과에 쓰입니다.
• mousedown / mouseup (클릭 누름/뗄 때 감지): 마우스 버튼을 누르고 떼는 순간을 개별적으로 감지합니다. 드래그 앤 드롭 기능을 만들 때 필수적입니다.

### 화살표 함수란?
화살표 함수 사용

화살표 함수(Arrow Function)는 ES6(2015년)에서 도입된 자바스크립트의 함수 선언 문법으로, 기존의 function 키워드 대신 화살표(=>)를 사용하여 코드를 더 간결하게 작성할 수 있도록 도와줍니다. 항상 이름이 없는 익명 함수로 정의되므로 보통 변수에 할당하여 사용합니다.
• 기존 일반 함수: function(a, b) { return a + b; }
• 화살표 함수: (a, b) => a + b

화살표 함수 사용 규칙

• 단일 실행 및 반환: 함수 본문이 한 줄의 표현식이라면 중괄호 {}와 return 키워드를 생략할 수 있습니다.
• 매개변수 1개: 매개변수가 딱 하나만 존재한다면 소괄호 ()도 생략이 가능합니다.
• 매개변수 0개 또는 다수: 매개변수가 없거나 2개 이상일 때는 반드시 소괄호 ()를 적어야 합니다.
• lexical this: 일반 함수와 달리 자신만의 this를 가지지 않고, 함수가 선언된 주변 환경(상위 스코프)의 this를 그대로 물려받아 사용합니다

-1. 사례 코드: 화살표 함수를 이용한 마우스 감지 구현

화살표 함수를 사용하여 화면에서 사용자의 마우스 좌표 위치를 실시간으로 감지하고 출력하는 간단한 자바스크립트 예제 코드입니다.
~~~
javascript
// 마우스 위치를 화면에 표시할 HTML 요소가 있다고 가정합니다.
const logElement = document.querySelector('#mouse-log');

// 화살표 함수를 사용하여 mousemove 이벤트를 감지하고 좌표를 출력합니다.
window.addEventListener('mousemove', (event) => {
  const x = event.clientX;
  const y = event.clientY;
  
  logElement.textContent = `마우스 위치 - X: ${x}px, Y: ${y}px`;
});
~~~

-2. 사례 코드 2: 커스텀 마우스 포인터를 만드는 예제 코드

기본 마우스 커서를 숨기고, 마우스를 움직일 때마다 내가 만든 디자인(동그라미 등)이 커서를 부드럽게 따라다니도록 만드는 기능


HTML

마우스 커서 역할을 할 HTML 요소를 하나 생성합니다.
~~~
html <div class="custom-cursor"></div>
~~~

CSS

기본 마우스 포인터를 없애고(cursor: none), 커스터마이징할 커서의 크기와 색상을 지정합니다. 마우스 움직임에 따라 실시간으로 위치를 바꿀 수 있도록 position: fixed를 사용합니다.

~~~
css
body {
  cursor: none; /* 기본 마우스 포인터 숨기기 */
  background-color: #111;
  height: 100vh;
}

.custom-cursor {
  width: 20px;
  height: 20px;
  background-color: #ff007f;
  border-radius: 50%; /* 동그라미 모양 */
  position: fixed;
  transform: translate(-50%, -50%); /* 마우스 중심에 오도록 정렬 */
  pointer-events: none; /* 커서가 클릭 이벤트를 방해하지 않도록 설정 */
  transition: transform 0.1s ease-out; /* 부드러운 효과 추가 */
}
~~~

JavaScript (화살표 함수 사용)

mousemove 이벤트를 감지하여 사용자의 마우스 좌표(clientX, clientY) 값으로 커서 요소의 위치를 실시간 업데이트

~~~
javascript
const cursor = document.querySelector('.custom-cursor');

// 화살표 함수를 사용하여 마우스 움직임 감지
window.addEventListener('mousemove', (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});
~~~
 
## 📚 참고 자료 (References)

- 구글 제미나이
- [JavaScript] DOM이란 무엇인가?[Aldev님의 쉽게 읽는 프로그래밍](https://m.blog.naver.com/magnking/220972680805)
