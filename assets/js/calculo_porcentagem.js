// Cria referência ao input do valor monetário
const entrada_real = document.getElementById("valor_em_real")

// Cria uma escuta ao elemento de "<input>" para formatá-lo em Real durante a digitação do usuário
entrada_real.addEventListener("input", () => {
    let v = entrada_real.value.replace(/\D/g, "");

    if (!v) {
        resultado.innerText = "";
        return;
    }

    // Converte para centavos
    v = (parseInt(v, 10) / 100).toFixed(2);


    // Formata para padrão brasileiro
    const formatado = Number(v).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    entrada_real.value = formatado;
})


// Cria referência ao elemento "<div>" para exibir o resultado da porcentagem
const resultado_porcentagem = document.getElementById("resultado_porcentagem")

// Cria referência ao form HTML
const form_porcentagem = document.querySelector("form")

// Função para formatar o número para legibilidade ao JS
function limparNumero(porcentagem_real) {
    return Number(
        porcentagem_real
            .replace(/\./g, "")   // remove separador de milhar
            .replace(",", ".")    // troca vírgula por ponto
            .replace(/[^\d.-]/g, "") // remove R$, %, espaços etc
    );
}

// Adiciona uma escuta ao submit: "calcular" para exibir os resultados da porcentagem
form_porcentagem.addEventListener("submit", (e) => {
  e.preventDefault(); // impede o reload logo no início

  // Limpa o número, extrai apenas o valor númerico
  const porcentagem = limparNumero(
    form_porcentagem.valor_porcentagem.value
);

  // Limpa o número, extrai apenas o valor númerico
  const porcentagem_real = limparNumero(
    form_porcentagem.valor_em_real.value
  );

  // Tratamento de erro
  if (isNaN(porcentagem) || isNaN(porcentagem_real)) {
    resultado_porcentagem.innerText = "Valores inválidos";
    return;
  }

  const calculo = (porcentagem_real * porcentagem) / 100;

  // Exibe o resultado formatado na "<div>"
  resultado_porcentagem.innerText = `Resultado: ${calculo.toLocaleString(
    "pt-BR",
    {
      style: "currency",
      currency: "BRL"
    }
  )}`;
});