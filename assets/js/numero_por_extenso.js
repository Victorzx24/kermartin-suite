// Cria referência ao elemento de "<input>" do número por extenso
const entrada_extenso =
    document.getElementById("num_extenso");

// Cria referência ao elemento "<div>" para exibir o resultado
const resultado_extenso =
    document.getElementById("resultado_extenso_minusculas");

// Cria uma escuta ao elemento de "<input>" para formatá-lo em Real durante a digitação do usuário
entrada_extenso.addEventListener("input", () => {
    let v = entrada_extenso.value.replace(/\D/g, "");

    if (!v) {
        resultado_extenso.innerText = "";
        return;
    }

    // Converte para centavos
    v = (parseInt(v, 10) / 100).toFixed(2);


    // Formata para padrão brasileiro
    const formatado = Number(v).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    entrada_extenso.value = formatado;

    // Converte para extenso
    const valorNumerico = parseFloat(v);
    resultado_extenso.innerText =
        "Minúsculas: " + extenso(valorNumerico, { mode: "currency" });

});