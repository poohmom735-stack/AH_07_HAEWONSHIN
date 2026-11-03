# JavaScript DOM 조작법 및 Web API 정리

웹 브라우저 환경에서 자바스크립트는 브라우저가 제공하는 다양한 **Web API**를 활용하여 동적인 웹 애플리케이션을 구현합니다. 본 문서에서는 Web API의 기본 개념부터 DOM, Event, Timer, Storage, Fetch API까지 핵심 조작법을 체계적으로 정리합니다.

---

## 1. Web API

### 1.1 Web API의 정의
**Web API(Web Application Programming Interface)**는 웹 브라우저가 자바스크립트 엔진 외부에서 제공하는 확장 인터페이스 모음입니다. 자바스크립트 언어 자체의 기본 문법(변수, 조건문, 반복문 등) 외에, 브라우저 환경 제어, 네트워크 통신, 데이터 저장, 사용자 입력 처리 등의 복잡한 기능을 자바스크립트로 조작할 수 있도록 해주는 객체와 메서드의 집합입니다.

Web API는 브라우저 내부에서 동작하며 자바스크립트의 실행 환경(Runtime Environment)인 `window` 객체를 통해 접근할 수 있습니다.

### 1.2 Web API의 예시
웹 브라우저에서 자주 활용되는 대표적인 Web API 예시는 다음과 같습니다.

| Web API 종류 | 주요 기능 및 역할 | 대표 객체 및 메서드 |
| :--- | :--- | :--- |
| **DOM API** | HTML/CSS 문서 요소를 탐색하고 동적으로 조작 | `document.getElementById()`, `appendChild()` |
| **Event API** | 사용자의 클릭, 키보드 입력, 마우스 이동 등의 사건 처리 | `addEventListener()`, `removeEventListener()` |
| **Timer API** | 일정 시간 후 코드 실행 또는 일정 간격으로 반복 실행 | `setTimeout()`, `setInterval()` |
| **Storage API** | 클라이언트 브라우저에 데이터를 로컬로 저장 | `localStorage.setItem()`, `getItem()` |
| **Fetch API** | 서버와 비동기 네트워크 통신을 통해 데이터 주고받기 | `fetch()`, `Response.json()` |
| **Console API** | 개발자 도구 콘솔에 로깅 및 디버깅 정보 출력 | `console.log()`, `console.error()` |

---

## 2. DOM API (Document Object Model API)

### 2.1 DOM API의 정의 및 역할
**DOM API**는 HTML 문서를 구조화된 객체 트리(DOM Tree)로 표현하고, 자바스크립트를 통해 문서 요소의 추가, 수정, 삭제, 스타일 변경 등을 가능하게 해주는 인터페이스입니다.

브라우저는 HTML 코드를 해석하여 `document` 객체를 생성하며, 개발자는 `document` 객체를 시작점으로 화면 요소를 탐색하고 제어합니다.

### 2.2 주요 탐색 및 조작 메서드

#### 1) 요소 탐색 (Element Selection)
* `document.getElementById(id)`: 지정한 `id` 속성을 가진 단일 요소를 선택합니다.
* `document.querySelector(selector)`: CSS 선택자와 일치하는 첫 번째 요소를 선택합니다.
* `document.querySelectorAll(selector)`: CSS 선택자와 일치하는 모든 요소를 `NodeList` 형태로 반환합니다.

#### 2) 요소 생성 및 추가 (Creation & Append)
* `document.createElement(tagName)`: 새로운 HTML 요소를 동적으로 생성합니다.
* `parentElement.appendChild(childElement)`: 지정한 자식 요소를 부모 요소의 마지막 자식으로 추가합니다.

#### 3) 내용 및 클래스 조작 (Content & Class Manipulation)
* `element.innerHTML`: 요소 내부의 HTML 구조를 읽거나 새 HTML 문자열로 교체합니다.
* `element.textContent`: 요소 내부의 순수 텍스트만 읽거나 변경합니다.
* `element.classList.add(className)`: 요소에 CSS 클래스를 추가합니다.
* `element.classList.remove(className)`: 요소에서 CSS 클래스를 제거합니다.

#### 4) 실시간 코드 활용 예시
```javascript
// DOM 요소 탐색
const cryptoList = document.getElementById('cryptoList');
const loading = document.getElementById('loading');
const cryptoTable = document.getElementById('cryptoTable');

// 새로운 테이블 행(tr) 동적 생성 및 데이터 렌더링
const row = document.createElement('tr');
row.innerHTML = `
    <td class="symbol">BTCUSDT</td>
    <td>95,000</td>
`;

// 생성한 요소를 DOM 트리에 추가
cryptoList.appendChild(row);

// 클래스 조작을 통한 화면 표시 전환
loading.classList.add('hidden');
cryptoTable.classList.remove('hidden');
```

---

## 3. Event API

### 3.1 Event API의 정의 및 역할
**Event API**는 사용자의 동작(클릭, 입력, 스크롤 등)이나 브라우저의 상태 변화(리로드, 로드 완료 등)를 감지하고, 해당 사건이 일어났을 때 특정 실행 코드(이벤트 핸들러 함수)를 호출하도록 연결해 주는 인터페이스입니다.

웹 애플리케이션의 상호작용성(Interactivity)을 구현하는 핵심 요소입니다.

### 3.2 주요 이벤트 종류 및 핸들러 등록

#### 1) 주요 이벤트 종류
* **마우스 이벤트**: `click` (클릭), `dblclick` (더블클릭), `mouseover` (마우스 올림)
* **폼/입력 이벤트**: `input` (입력값 변경 시 즉시 발생), `change` (포커스 이동 후 변경 시 발생), `submit` (양식 제출)
* **키보드 이벤트**: `keydown` (키 누름), `keyup` (키 뗌)
* **뷰/문서 이벤트**: `DOMContentLoaded` (HTML 로드 완료), `resize` (창 크기 변경)

#### 2) 이벤트 리스너 등록 메서드 (`addEventListener`)
* 구문: `target.addEventListener(type, listener)`
* 첫 번째 인수로 이벤트 타입을 전달하고, 두 번째 인수로 이벤트 발생 시 실행될 콜백 함수를 전달합니다.

#### 3) 실시간 코드 활용 예시
```javascript
const searchInput = document.getElementById('searchInput');
const allTab = document.getElementById('allTab');
const favoritesTab = document.getElementById('favoritesTab');

// 1. 검색창 입력 이벤트 (input 이벤트)
searchInput.addEventListener('input', () => {
    filterAndRender();
});

// 2. 탭 클릭 이벤트 (click 이벤트)
allTab.addEventListener('click', () => {
    currentTab = 'all';
    allTab.classList.add('active');
    favoritesTab.classList.remove('active');
    filterAndRender();
});

favoritesTab.addEventListener('click', () => {
    currentTab = 'favorites';
    favoritesTab.classList.add('active');
    allTab.classList.remove('active');
    filterAndRender();
});
```

---

## 4. Timer API

### 4.1 Timer API의 정의 및 역할
**Timer API**는 지정한 시간이 지난 후에 코드를 실행하거나, 특정 시간 간격으로 코드를 반복적으로 실행하도록 스케줄링하는 인터페이스입니다.

브라우저의 비동기 작업 처리를 가능하게 하며, 타이머 식별자(ID)를 통해 실행 중인 타이머를 취소할 수도 있습니다.

### 4.2 주요 메서드

#### 1) `setInterval(callback, delay)`
* 지정한 시간 간격(`delay`, 밀리초 단위)마다 `callback` 함수를 주기적으로 계속 실행합니다.
* 취소 메서드: `clearInterval(timerId)`

#### 2) `setTimeout(callback, delay)`
* 지정한 시간(`delay`, 밀리초 단위)이 지난 후 `callback` 함수를 딱 한 번 실행합니다.
* 취소 메서드: `clearTimeout(timerId)`

#### 3) 실시간 코드 활용 예시
```javascript
// 초기 데이터 1회 로드
fetchCryptoData();

// 1초(1000ms)마다 실시간으로 API 요청을 재호출하여 시세 데이터 갱신
const timerId = setInterval(fetchCryptoData, 1000);

// 특정 조건 시 타이머 멈춤 예시
// clearInterval(timerId);
```

---

## 5. Storage API

### 5.1 Storage API의 정의 및 역할
**Storage API**는 웹 브라우저 내부에서 키-값(Key-Value) 쌍 형태로 데이터를 보관할 수 있게 해주는 메커니즘입니다. 쿠키(Cookie)보다 더 큰 저장 용량(약 5MB)을 제공하며, 서버로 매 요청마다 자동 전송되지 않으므로 보안 및 성능 면에서 유리합니다.

### 5.2 LocalStorage vs SessionStorage

| 구분 | LocalStorage | SessionStorage |
| :--- | :--- | :--- |
| **데이터 영구성** | 브라우저를 닫아도 삭제되지 않고 영구 보관 | 탭이나 브라우저를 닫으면 데이터 자동 삭제 |
| **사용 목적** | 사용자의 설정값, 관심목록(즐겨찾기), 자동 로그인 토큰 등 | 일회성 폼 데이터, 탭 전용 임시 데이터 |
| **데이터 형태** | 문자열(String) 타입만 저장 가능 | 문자열(String) 타입만 저장 가능 |

* 객체나 배열을 저장할 때에는 `JSON.stringify()`를 통해 문자열로 변환하고, 읽어올 때에는 `JSON.parse()`로 객체화합니다.

### 5.3 주요 메서드 및 활용 예시

* `localStorage.setItem(key, value)`: 데이터 저장
* `localStorage.getItem(key)`: 데이터 조회
* `localStorage.removeItem(key)`: 특정 키 데이터 삭제
* `localStorage.clear()`: 저장소 전체 초기화

#### 실시간 코드 활용 예시
```javascript
// 1. LocalStorage에서 저장된 관심목록 배열 불러오기 (없을 경우 빈 배열)
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// 2. 관심항목 추가/제거 토글 및 저장
function toggleFavorite(symbol) {
    const index = favorites.indexOf(symbol);
    if (index > -1) {
        favorites.splice(index, 1); // 목록에서 제거
    } else {
        favorites.push(symbol); // 목록에 추가
    }
    
    // LocalStorage에 JSON 문자열로 변환하여 영구 저장
    localStorage.setItem('favorites', JSON.stringify(favorites));
    filterAndRender();
}
```

---

## 6. Fetch API

### 6.1 Fetch API의 정의 및 비동기 통신
**Fetch API**는 네트워크 자원을 비동기(Asynchronous) 방식으로 요청하고 응답받을 수 있는 최신 JavaScript 표준 인터페이스입니다. 기존의 `XMLHttpRequest`보다 직관적이며 프로미스(`Promise`) 기반으로 작동하여 복잡한 비동기 로직을 깔끔하게 작성할 수 있습니다.

### 6.2 async / await와 네트워크 요청 처리
`fetch()` 함수는 요청 성공 시 `Response` 객체로 이행되는 `Promise`를 반환합니다. `async/await` 문법과 `try...catch` 블록을 함께 사용하면 네트워크 에러 처리 및 데이터 가공이 더욱 용이해집니다.

#### 실시간 코드 활용 예시
```javascript
// Binance API에서 24시간 시세 데이터를 가져오는 비동기 함수
async function fetchCryptoData() {
    try {
        // 1. GET 요청을 통해 서버에 데이터 요청
        const response = await fetch('https://api4.binance.com/api/v3/ticker/24hr');
        
        // 2. 응답 상태가 정상인지 확인 (200 OK)
        if (!response.ok) {
            throw new Error('데이터를 불러오는데 실패했습니다.');
        }
        
        // 3. 응답 스트림을 JSON 객체로 파싱
        const data = await response.json();
        
        // 4. 받아온 데이터 가공 (USDT 항목만 필터링)
        allCryptoData = data.filter(item => item.symbol.endsWith('USDT') && parseFloat(item.lastPrice) !== 0);
        
        // 5. 화면 렌더링 함수 호출
        filterAndRender();
    } catch (error) {
        console.error('Error:', error);
        loading.textContent = '데이터를 불러오는 중 오류가 발생했습니다.';
    }
}
```

---

## 7. 요약 및 정리

자바스크립트 기반 웹 개발은 **DOM API**로 화면을 구성하고, **Event API**로 사용자 입력을 받아들이며, **Fetch API**로 서버 데이터와 통신하고, **Storage API**로 사용자 상태를 보존하며, **Timer API**를 통해 실시간 업데이트를 지속하는 방식으로 유기적으로 연동되어 작동합니다.
