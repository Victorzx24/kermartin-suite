// Referência ao display
const display = document.getElementById("display");

// Adiciona valores ao display
function append(value) {
    // Evita continuar digitando após erro
    if (display.value === "Erro") {
        display.value = "";
    }

    // Evita operadores duplicados
    const lastChar = display.value.slice(-1);
    const operators = ["+", "-", "*", "/"];

    if (operators.includes(lastChar) && operators.includes(value)) {
        return;
    }

    display.value += value;
}

// Limpa tudo
function clearDisplay() {
    display.value = "";
}

// Apaga último caractere
function backspace() {
    if (display.value === "Erro") {
        display.value = "";
        return;
    }
    display.value = display.value.slice(0, -1);
}

// Calcula a expressão
function calculate() {
    try {
        const input = display.value.trim();
        if (input === "") return;

        // Remove TUDO que não for: números, operadores (+-*/.), parênteses ou espaços.
        const sanitizedInput = input.replace(/[^-()\d/*+.]/g, '');

        // SUBSTITUIÇÃO DO EVAL: Usando o construtor Function

        const result = new Function(`"use strict"; return (${sanitizedInput})`)();

        //  VALIDAÇÃO DE RESULTADO
        if (result === Infinity || isNaN(result)) {
            display.value = "Erro";
        } else {
            // Arredonda para evitar problemas de precisão flutuante (ex: 0.1 + 0.2)
            display.value = Number(result.toFixed(10)); 
        }
    } catch {
        display.value = "Erro";
    }
}

// Suporte ao teclado
display.addEventListener("keydown", (e) => {
    const key = e.key;

    // Números
    if (!isNaN(key)) {
        append(key);
        return;
    }

    // Operadores
    if (key === "+" || key === "-") {
        append(key);
        return;
    }

    // Multiplicação (x ou *)
    if (key === "x" || key === "X" || key === "*") {
        append("*");
        return;
    }

    // Divisão
    if (key === "/") {
        append("/");
        return;
    }

    // Ponto decimal
    if (key === ".") {
        append(".");
        return;
    }

    // Enter ou =
    if (key === "Enter" || key === "=") {
        e.preventDefault();
        calculate();
        return;
    }

    // Backspace
    if (key === "Backspace") {
        backspace();
        return;
    }

    // ESC limpa tudo
    if (key === "Escape") {
        clearDisplay();
        return;
    }
});