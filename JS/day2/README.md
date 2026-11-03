# 📚 JavaScript 기초 핵심 문법 정리 (Day 2 선택 과제)

JavaScript의 기본 자료형, 변수 선언, 연산자, 제어문, 배열 및 객체 다루기에 대한 핵심 내용을 수록한 학습 가이드 문서입니다.

---

## 1. JavaScript의 자료형 (Data Types)

JavaScript의 기본 (원시) 자료형은 값 자체를 변수에 저장하는 형태를 띱니다.

| 자료형 | 설명 | 예시 |
| :--- | :--- | :--- |
| **`number`** | 정수 및 실수를 구별하지 않고 다루는 수치형 | `10`, `3.14`, `-5` |
| **`string`** | 텍스트 데이터를 표현하는 문자열 | `"Hello"`, `'JavaScript'` |
| **`boolean`** | 참과 거짓을 나타내는 논리형 | `true`, `false` |
| **`null`** | 의도적으로 **"값이 없음"**을 명시할 때 사용하는 값 | `let item = null;` |
| **`undefined`** | 변수가 선언되었으나 **값이 할당되지 않은 초기 상태** | `let x;` (`x`는 `undefined`) |

---

## 2. JavaScript의 변수 선언 (`let`, `const`)

JavaScript에서는 ES6 이후 `var` 대신 **`let`**과 **`const`** 사용을 권장합니다.

*   **`let`**: **재할당이 가능한** 블록 스코프 변수를 선언할 때 사용합니다.
    ```javascript
    let score = 100;
    score = 200; // 재할당 가능
    ```
*   **`const`**: **재할당이 불가능한** 상수를 선언할 때 사용하며, 선언과 동시에 값을 초기화해야 합니다.
    ```javascript
    const MAX_VAL = 500;
    // MAX_VAL = 600; // TypeError: Assignment to constant variable.
    ```

---

## 3. JavaScript의 연산 방법

### 3.1 산술 연산자
- **`+` (더하기)**: 두 피연산자를 더합니다.
- **`-` (빼기)**: 왼쪽 피연산자에서 오른쪽 피연산자를 뺍니다.
- **`*` (곱하기)**: 두 피연산자를 곱합니다.
- **`/` (나누기)**: 왼쪽 피연산자를 오른쪽 피연산자로 나눕니다 (실수 단위까지 계산).
- **`%` (나머지 연산)**: 나누기 후 남은 나머지를 구합니다. (예: `7 % 3` $\rightarrow$ `1`)

### 3.2 `Math` 내장 객체
수학적 계산을 처리하기 위한 내장 객체입니다.

```javascript
Math.floor(3.8); // 3 (소수점 내림)
Math.ceil(3.2);  // 4 (소수점 올림)
Math.round(3.5); // 4 (반올림)
Math.abs(-10);   // 10 (절대값)
Math.max(10, 20, 5); // 20 (최대값)
Math.min(10, 20, 5); // 5 (최소값)
```

---

## 4. JavaScript의 비교 연산 및 타입 확인

### 4.1 비교 연산자
- **대소 비교 (`<`, `>`, `<=`, `>=`)**: 값의 크기를 비교하여 `boolean` 값을 반환합니다.
- **`==` (동등 연산자)**: 비교 대상의 타입이 다르면 자동으로 타입을 통일(암묵적 형변환)한 후 **값만 비교**합니다.
  ```javascript
  5 == "5"; // true
  ```
- **`===` (일치 연산자)**: **값과 자료형(타입)을 모두 엄격하게 비교**합니다.
  ```javascript
  5 === "5"; // false (number와 string 타입이 다름)
  ```

### 4.2 타입 확인 (`typeof`)
피연산자의 자료형을 문자열 형태로 반환합니다.

```javascript
typeof 42;          // "number"
typeof "JavaScript"; // "string"
typeof true;        // "boolean"
typeof undefined;   // "undefined"
typeof null;        // "object" (JavaScript의 오래된 알려진 특성)
```

---

## 5. JavaScript의 논리 연산자

- **`&&` (AND 연산자)**: 모든 조건이 `true`일 때만 `true`를 반환합니다.
  ```javascript
  true && true;  // true
  true && false; // false
  ```
- **`||` (OR 연산자)**: 조건 중 하나만 `true`여도 `true`를 반환합니다.
  ```javascript
  true || false; // true
  false || false; // false
  ```
- **`!` (NOT 연산자)**: 참/거짓 논리 상태를 반전시킵니다.
  ```javascript
  !true;  // false
  !false; // true
  ```

---

## 6. JavaScript의 문자열 연산

### 6.1 `+` 이어붙이기 및 템플릿 리터럴
*   **`+` 연산자**: 문자열 끼리 결합합니다.
    ```javascript
    "Hello " + "World"; // "Hello World"
    ```
*   **템플릿 리터럴**: 백틱(`` ` ``)을 사용하며, `${변수명}` 문법을 통해 문자열 내에 변수나 표현식을 삽입할 수 있습니다.
    ```javascript
    const name = "민수";
    const age = 20;
    console.log(`안녕하세요, 제 이름은 ${name}이고 나이는 ${age}살입니다.`);
    ```

### 6.2 `number + string` 연산 시 Python과의 차이점
*   **JavaScript**: 숫자와 문자열을 `+` 연산하면 숫자가 자동으로 문자열로 **암묵적 형변환(Implicit Coercion)**되어 결합됩니다.
    ```javascript
    console.log(10 + "20"); // "1020" (문자열 결합)
    ```
*   **Python**: 숫자형(int/float)과 문자열(str) 간의 `+` 연산 시 타입 불일치로 **`TypeError`가 발생**합니다.
    ```python
    # Python 코드
    10 + "20" # TypeError: unsupported operand type(s) for +: 'int' and 'str'
    # Python에서는 str(10) + "20" 으로 명시적 형변환을 해야 함
    ```

---

## 7. JavaScript의 조건문

조건문은 주어진 조건식의 결과(`true`/`false`)에 따라 다른 코드 블록을 실행합니다. (Python의 `elif` 대신 JavaScript에서는 **`else if`** 구문을 사용합니다.)

```javascript
let score = 85;

if (score >= 90) {
    console.log("A 등급");
} else if (score >= 80) { // Python의 elif 역할
    console.log("B 등급");
} else {
    console.log("C 등급");
}
```

---

## 8. JavaScript의 반복문

### 8.1 `for` 문
반복 횟수가 명확할 때 사용합니다.

```javascript
for (let i = 0; i < 5; i++) {
    console.log(`반복 횟수: ${i}`);
}
```

### 8.2 `while` 문
조건식이 `true`인 동안 계속해서 블록을 실행합니다.

```javascript
let count = 0;
while (count < 3) {
    console.log(`현재 카운트: ${count}`);
    count++;
}
```

---

## 9. JavaScript의 배열 (Array)

순서가 있는 데이터의 집합으로, 다양한 타입의 요소를 하나의 변수에 담을 수 있습니다.

### 9.1 배열 생성 및 요소 접근
```javascript
// 배열 선언
const fruits = ["사과", "바나나", "체리"];

// 인덱스를 이용한 접근 (0부터 시작)
console.log(fruits[0]); // "사과"
console.log(fruits.length); // 3 (배열의 길이)
```

### 9.2 배열의 주요 메서드 활용
```javascript
const colors = ["빨강", "초록"];

// 1. 요소 추가 (배열 끝)
colors.push("파랑"); // ["빨강", "초록", "파랑"]

// 2. 요소 제거 (배열 끝)
colors.pop(); // "파랑" 제거됨

// 3. 순회 (forEach)
colors.forEach((color, index) => {
    console.log(`${index}: ${color}`);
});
```

---

## 10. JavaScript의 객체 (Object)

키(Key)와 값(Value)의 쌍으로 이루어진 복합 데이터 구조입니다.

### 10.1 객체 선언 방법
```javascript
const user = {
    name: "철수",
    age: 25,
    isStudent: true
};
```

### 10.2 객체 다루기

#### 1) 속성 읽기 (Read)
점 표기법(`.` ) 또는 대괄호 표기법(`[]`)을 사용합니다.
```javascript
console.log(user.name);    // "철수"
console.log(user["age"]);  // 25
```

#### 2) 속성 추가하기 (Create)
새로운 키에 값을 할당합니다.
```javascript
user.email = "chulsoo@example.com";
console.log(user.email); // "chulsoo@example.com"
```

#### 3) 속성 수정하기 (Update)
기존 키에 새로운 값을 할당합니다.
```javascript
user.age = 26;
console.log(user.age); // 26
```

#### 4) 속성 제거하기 (Delete)
`delete` 연산자를 사용합니다.
```javascript
delete user.isStudent;
console.log(user.isStudent); // undefined
```

#### 5) 속성 존재 여부 확인 (`in`)
`in` 연산자를 이용해 객체 내 특정 키가 존재하는지 검사합니다 (`true`/`false` 반환).
```javascript
console.log("name" in user);    // true
console.log("isStudent" in user); // false (위에서 제거됨)
```
