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
        if (display.value.trim() === "") return;

        // Evita eval quebrado
        const result = eval(display.value);                 // "eval()" permite executar uma string como código

        if (result === Infinity || isNaN(result)) {         // Soluciona casos de erro
            display.value = "Erro";
        } else {
            display.value = result;
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