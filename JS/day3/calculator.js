// DOM 요소 선택
const display = document.getElementById('display');
const onOffBtn = document.querySelector('.on-off');
const clearBtn = document.querySelector('.clear');
const enterBtn = document.querySelector('.enter');
const numberBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');

let currentFormula = "";
let isPowerOn = true;
let isCalculated = false;

// 페이지 로드 시 초기 상태 설정
window.onload = function() {
    onOffBtn.classList.add('on');
};

// 전원 토글 기능
function togglePower() {
    isPowerOn = !isPowerOn;
    const buttons = document.querySelectorAll('button:not(.on-off)');

    if (isPowerOn) {
        display.value = "0";
        display.style.backgroundColor = "#222";
        onOffBtn.classList.add('on');
        buttons.forEach(btn => btn.disabled = false);
    } else {
        display.value = "";
        display.style.backgroundColor = "#111";
        onOffBtn.classList.remove('on');
        buttons.forEach(btn => btn.disabled = true);
        currentFormula = "";
        isCalculated = false;
    }
}

// 사칙연산 기초 함수
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { return a / b; }

// 숫자 입력 추가
function appendNumber(number) {
    if (!isPowerOn) return;
    
    if (isCalculated) {
        display.value = "";
        currentFormula = "";
        isCalculated = false;
    }

    if (display.value === "0" || display.value === "Error" || display.value === "DivBy0") {
        display.value = number;
        currentFormula = number;
    } else {
        display.value += number;
        currentFormula += number;
    }
}

// 연산자 추가
function appendOperator(operator) {
    if (!isPowerOn) return;
    if (display.value === "Error" || display.value === "DivBy0") return;
    
    if (isCalculated) {
        isCalculated = false;
    }

    if (currentFormula === "") {
        currentFormula = "0";
    }

    if (currentFormula.endsWith(" ")) {
        currentFormula = currentFormula.slice(0, -3);
    }
    
    currentFormula += " " + operator + " ";
    display.value = currentFormula;
}

// 화면 초기화
function clearDisplay() {
    if (!isPowerOn) return;
    display.value = "0";
    currentFormula = "";
    isCalculated = false;
}

// 연산 계산 로직 (사칙연산 우선순위 적용)
function calculate(formula) {
    const tokens = formula.trim().split(/\s+/);
    if (tokens.length < 3 || tokens.length % 2 === 0) {
        return "Error";
    }

    // 1단계: 곱셈과 나눗셈 먼저 처리
    const intermediateTokens = [];
    let i = 0;
    while (i < tokens.length) {
        const token = tokens[i];
        if (token === "*" || token === "/") {
            const left = Number(intermediateTokens.pop());
            const operator = token;
            const right = Number(tokens[i + 1]);

            if (isNaN(left) || isNaN(right)) return "Error";

            let res;
            if (operator === "*") {
                res = multiply(left, right);
            } else {
                if (right === 0) return "DivBy0";
                res = divide(left, right);
            }
            intermediateTokens.push(res);
            i += 2;
        } else {
            intermediateTokens.push(token);
            i++;
        }
    }

    // 2단계: 덧셈과 뺄셈 처리
    let result = Number(intermediateTokens);
    if (isNaN(result)) return "Error";

    for (let j = 1; j < intermediateTokens.length; j += 2) {
        const operator = intermediateTokens[j];
        const nextValue = Number(intermediateTokens[j + 1]);

        if (isNaN(nextValue)) return "Error";

        if (operator === "+") {
            result = add(result, nextValue);
        } else if (operator === "-") {
            result = subtract(result, nextValue);
        } else {
            return "Error";
        }
    }
    return result;
}

// 계산 실행 및 디스플레이 업데이트
function performCalculate() {
    if (!isPowerOn || !currentFormula) return;
    
    if (currentFormula.endsWith(" ")) {
        currentFormula = currentFormula.trim();
    }

    const result = calculate(currentFormula);
    display.value = result;
    isCalculated = true;
    
    if (result === "Error" || result === "DivBy0") {
        currentFormula = "";
    } else {
        currentFormula = result.toString();
    }
}

// EventListener를 활용한 이벤트 등록
onOffBtn.addEventListener('click', togglePower);
clearBtn.addEventListener('click', clearDisplay);
enterBtn.addEventListener('click', performCalculate);

numberBtns.forEach(btn => {
    btn.addEventListener('click', () => appendNumber(btn.textContent));
});

operatorBtns.forEach(btn => {
    btn.addEventListener('click', () => appendOperator(btn.textContent));
});
