// Calcula a data final de um prazo em dias úteis pulando fins de semana e feriados

async function calcularPrazoDiasUteis(dataInicioTexto, diasPrazo) {
    // "T12:00:00" força o JavaScript a ler a data do input ignorando o fuso horário local e formatos visuais (M-D-Y)
    let dataTramite = new Date(dataInicioTexto + "T12:00:00");
    const anoAtual = dataTramite.getFullYear();
    
    // Busca a lista de feriados nacionais no brasil_api.js
    const datasFeriados = await buscarFeriadosNacionais(anoAtual);
    
    let diasContados = 0;

    // Regra Processual: Exclui o dia do começo (a contagem começa no dia seguinte)
    while (diasContados < diasPrazo) {
        dataTramite.setDate(dataTramite.getDate() + 1); // Avança 1 dia

        const diaSemana = dataTramite.getDay(); // 0 = Domingo, 6 = Sábado
        
        // Formata a data atual do laço para o padrão "AAAA-MM-DD" para comparar com a API
        const anoF = dataTramite.getFullYear();
        const mesF = String(dataTramite.getMonth() + 1).padStart(2, '0');
        const diaF = String(dataTramite.getDate()).padStart(2, '0');
        const dataFormatada = `${anoF}-${mesF}-${diaF}`;

        const ehFimDeSemana = (diaSemana === 0 || diaSemana === 6);
        const ehFeriado = datasFeriados.includes(dataFormatada);

        // Se NÃO for fim de semana E NÃO for feriado, contamos como dia útil
        if (!ehFimDeSemana && !ehFeriado) {
            diasContados++;
        }
    }

    return dataTramite;
}

// Exibição do resultado a caixa de respota com a formatação 
async function executarCalculoPrazo() {
    const inputData = document.getElementById("data_inicio");
    const inputDias = document.getElementById("prazo_dias");
    const divResultado = document.getElementById("resultado_prazo");

    // Limpa a tela antes de um novo cálculo
    divResultado.textContent = "";

    // Validação de campos vazios
    if (!inputData.value || !inputDias.value) {
        const aviso = document.createElement("p");
        aviso.textContent = "Por favor, preencha todos os campos.";
        divResultado.appendChild(aviso);
        return;
    }

    try {
        // Mensagem visual de carregamento
        divResultado.textContent = "Consultando feriados e calculando...";

        // Dispara o cálculo real
        const dataFinal = await calcularPrazoDiasUteis(inputData.value, parseInt(inputDias.value));

        // Formata para o padrão visual brasileiro (DD/MM/AAAA)
        const dataFormatadaBR = dataFinal.toLocaleDateString('pt-BR');

        // Traduz o dia e o ano usando a biblioteca do Vendor (extenso.js)
        const diaExtenso = extenso(dataFinal.getDate(), { number: { gender: 'm' } });
        const anoExtenso = extenso(dataFinal.getFullYear(), { number: { gender: 'm' } });
        const meses = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
        const mesExtenso = meses[dataFinal.getMonth()];
        const textoPorExtenso = `(${diaExtenso} de ${mesExtenso} de ${anoExtenso})`;

        // Limpa o texto de carregamento
        divResultado.textContent = "";

        // Elementos exibidos na caixa de resultado
        const caixaResultado = document.createElement("div");
        caixaResultado.style.marginTop = "15px";
        caixaResultado.style.padding = "15px";
        caixaResultado.style.backgroundColor = "#e9ecef";
        caixaResultado.style.borderLeft = "5px solid #1a2a40";
        caixaResultado.style.borderRadius = "4px";

        const tituloResultado = document.createElement("p");
        tituloResultado.textContent = "Data de Vencimento:";
        tituloResultado.style.margin = "0";
        tituloResultado.style.color = "#6c757d";

        const dataDestaque = document.createElement("strong");
        dataDestaque.textContent = dataFormatadaBR;
        dataDestaque.style.fontSize = "1.5rem";
        dataDestaque.style.display = "block";

        const legendaExtenso = document.createElement("p");
        legendaExtenso.textContent = textoPorExtenso;
        legendaExtenso.style.margin = "5px 0 0 0";
        legendaExtenso.style.fontStyle = "italic";
        legendaExtenso.style.textTransform = "lowercase";


        // Exibe os resultados na div de resultado
        caixaResultado.appendChild(tituloResultado);
        caixaResultado.appendChild(dataDestaque);
        caixaResultado.appendChild(legendaExtenso);
        divResultado.appendChild(caixaResultado);

    } catch (erro) {
        divResultado.textContent = "Erro ao calcular o prazo. Verifique a API.";
        console.error(erro);
    }
}

console.log(
    "%cATENÇÃO!",
    "color: #d9534f; font-size: 40px; font-weight: bold; font-family: sans-serif;"
);

console.log(
    "%cEsta é uma ferramenta de inspeção do navegador destinada a desenvolvedores. %c\n\nNão copie e cole nada neste local. Feche esta aba e continue utilizando a ferramenta normalmente!",
    "font-size: 15px; color: #d9534f; font-weight: bold; font-family: sans-serif;",
    "font-size: 15px; color: #777; font-weight: normal; font-family: sans-serif;"
);