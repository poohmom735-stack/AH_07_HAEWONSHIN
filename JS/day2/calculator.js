/**
 * 웹 브라우저 콘솔용 사칙연산 계산기
 * HTML 페이지의 start() 호출과 연동됩니다.
 */

function calculate(expression) {
    // 1. 공백 제거 및 토큰화
    const tokens = expression.replace(/\s+/g, '').match(/\d+(\.\d+)?|[+\-*/()]/g);
    
    if (!tokens) {
        throw new Error("올바른 계산식을 입력해주세요.");
    }

    // 연산자 우선순위 정의 (*, / : 2순위 | +, - : 1순위)
    const precedence = {
        '*': 2,
        '/': 2,
        '+': 1,
        '-': 1
    };

    const values = [];    // 피연산자 스택
    const operators = []; // 연산자 스택

    function applyOp() {
        const op = operators.pop();
        const b = values.pop();
        const a = values.pop();

        switch (op) {
            case '+': values.push(a + b); break;
            case '-': values.push(a - b); break;
            case '*': values.push(a * b); break;
            case '/': 
                if (b === 0) throw new Error("0으로 나눌 수 없습니다.");
                values.push(a / b); 
                break;
        }
    }

    // 2. 토큰 순회 및 연산
    for (let token of tokens) {
        if (!isNaN(token)) {
            values.push(parseFloat(token));
        } else if (token === '(') {
            operators.push(token);
        } else if (token === ')') {
            while (operators.length > 0 && operators[operators.length - 1] !== '(') {
                applyOp();
            }
            operators.pop();
        } else if (token in precedence) {
            while (
                operators.length > 0 &&
                operators[operators.length - 1] !== '(' &&
                precedence[operators[operators.length - 1]] >= precedence[token]
            ) {
                applyOp();
            }
            operators.push(token);
        }
    }

    while (operators.length > 0) {
        applyOp();
    }

    return values[0];
}

// 3. HTML 콘솔 안내문용 실행 함수 (start)
function start() {
    const input = prompt("계산할 식을 입력하세요 (예: 10 + 20 * 3 - 5):");
    if (!input) return;

    try {
        const result = calculate(input);
        console.log("====================================");
        console.log(`입력식: ${input}`);
        console.log(`계산 결과: ${result}`);
        console.log("====================================");
        alert(`계산 결과: ${result}`);
    } catch (error) {
        console.error(`[오류] ${error.message}`);
        alert(`오류: ${error.message}`);
    }
}
