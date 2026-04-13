/**
 * KERMARTIN SUITE - Módulo de Prazos
 */

// 1. Diferença entre duas datas (Dias Corridos)
function calcularDiferenca(dataInicial, dataFinal) {
    const d1 = new Date(dataInicial);
    const d2 = new Date(dataFinal);

    // Calcula a diferença em milissegundos e converte para dias
    const diferencaEmMs = Math.abs(d2 - d1);
    const diferencaEmDias = Math.ceil(diferencaEmMs / (1000 * 60 * 60 * 24));

    return diferencaEmDias;
}

// 2. Somar dias a uma data (Útil para prazos de contestação, recurso, etc.)
function somarDias(data, dias, apenasDiasUteis = false) {
    let dataResultado = new Date(data);
    let diasContados = 0;

    while (diasContados < dias) {
        dataResultado.setDate(dataResultado.getDate() + 1);

        if (apenasDiasUteis) {
            const diaDaSemana = dataResultado.getDay();
            // 0 = Domingo, 6 = Sábado
            if (diaDaSemana !== 0 && diaDaSemana !== 6) {
                diasContados++;
            }
        } else {
            diasContados++;
        }
    }
    return dataResultado.toLocaleDateString('pt-BR');
}


function executarCalculoPrazo() {
    const dataInput = document.getElementById('data_inicio').value; // Vem AAAA-MM-DD
    const diasPrazo = parseInt(document.getElementById('prazo_dias').value);
    const display = document.getElementById('resultado_prazo');

    if (dataInput && !isNaN(diasPrazo)) {
        // Corrigindo fuso horário: substitui hifens por barras para o JS não retroceder um dia
        const dataFormatada = dataInput.replace(/-/g, '\/');
        const dataInicio = new Date(dataFormatada);

        // Chama a função de somar dias (que criamos antes)
        const dataFinal = somarDias(dataInicio, diasPrazo, true);

        // O resultado já sai em PT-BR porque usamos .toLocaleDateString('pt-BR') na função somarDias
        display.innerHTML = `Vencimento: <strong>${dataFinal}</strong>`;
    }
}