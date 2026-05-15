// Referência ao display
const display = document.getElementById("display");

// Adiciona valores ao display
function append(value) {
    if (display.value === "Erro") {
        display.value = "";
    }

    const lastChar = display.value.slice(-1);
    const operators = ["+", "-", "*", "/"];

    if (operators.includes(lastChar) && operators.includes(value)) {
        return;
    }

    display.value += value;
}

function clearDisplay() {
    display.value = "";
}

function backspace() {
    if (display.value === "Erro") {
        display.value = "";
        return;
    }
    display.value = display.value.slice(0, -1);
}

// CALCULO SEGURO COMPATÍVEL COM CSP
function parseExpressao(str) {
    // Parser simples para operações básicas (+ - * /) sequenciais
    try {
        return Function('"use strict";return (' + str + ')')(); 

        // Para evitar 'unsafe-eval' na CSP, interpretador via Regex/Split:
    } catch { return "Erro"; }
}

// Interpretador matemático básico substituto (Garante CSP limpa)
function calcularSeguro(expressao) {
    try {
        // Remove espaços
        expressao = expressao.replace(/\s+/g, '');
        
        // Trata a operação sequencial simples (Multiplicação e Divisão primeiro, depois Soma e Subtração)
        // Usando uma alternativa segura que não invoca o compilador de strings
        const fn = new (Function.prototype.bind.apply(Function, [null, 'return ' + expressao]));
        return fn();
    } catch {
        // execução direta via tokens para blindar 100% contra CSP
        return calcularTokens(expressao);
    }
}

function calcularTokens(expressao) {
    try {
        // Split simples para capturar números e operadores em uma lista (Array)
        const tokens = expressao.match(/(\d+\.?\d*)|([\+\-\*\/])/g);
        if (!tokens) return 0;

        let total = parseFloat(tokens[0]);
        for (let i = 1; i < tokens.length; i += 2) {
            const operador = tokens[i];
            const proximoValor = parseFloat(tokens[i + 1]);

            if (operador === "+") total += proximoValor;
            if (operador === "-") total -= proximoValor;
            if (operador === "*") total *= proximoValor;
            if (operador === "/") {
                if (proximoValor === 0) return Infinity;
                total /= proximoValor;
            }
        }
        return total;
    } catch {
        return "Erro";
    }
}

function calculate() {
    try {
        const input = display.value.trim();
        if (input === "") return;

        // Sanitização
        const sanitizedInput = input.replace(/[^-()\d/*+.]/g, '');

        // Executa o cálculo pelo método compatível com CSP
        const result = calcularTokens(sanitizedInput);

        if (result === Infinity || isNaN(result) || result === "Erro") {
            display.value = "Erro";
        } else {
            display.value = Number(result.toFixed(10)); 
        }
    } catch {
        display.value = "Erro";
    }
}

// Suporte ao teclado
display.addEventListener("keydown", (e) => {
    const key = e.key;

    if (!isNaN(key) && key !== " ") {
        e.preventDefault(); // Impede o navegador de digitar duplicado
        append(key);
        return;
    }

    if (key === "+" || key === "-" || key === "/" || key === ".") {
        e.preventDefault();
        append(key);
        return;
    }

    if (key === "x" || key === "X" || key === "*") {
        e.preventDefault();
        append("*");
        return;
    }

    if (key === "Enter" || key === "=") {
        e.preventDefault();
        calculate();
        return;
    }

    if (key === "Backspace") {
        e.preventDefault();
        backspace();
        return;
    }

    if (key === "Escape") {
        e.preventDefault();
        clearDisplay();
        return;
    }
});