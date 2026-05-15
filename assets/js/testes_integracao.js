/**
 * Teste de Integração: Valida se a comunicação com a Brasil API
 * está ativa e se o cálculo de prazos processa os dados corretamente.
 */
async function rodarTesteIntegracaoAPI() {
    console.log("[TESTE] Iniciando validação da Brasil API...");
    
    try {
        // Cenário de Teste: 01 de Maio de 2026 (Dia do Trabalhador - Feriado Nacional)
        // Se pedirmos 1 dia útil a partir do dia 30/04/2026 (Quinta-feira):
        // - 01/05 (Sexta) é feriado -> Pula
        // - 02/05 (Sábado) -> Pula
        // - 03/05 (Domingo) -> Pula
        // O resultado esperado obrigatoriamente deve ser 04/05/2026 (Segunda-feira)
        
        const dataInicio = "2026-04-30";
        const diasPrazo = 1;
        const esperado = "2026-05-04";
        
        // Executa a função que consome a API externa
        const resultadoData = await calcularPrazoDiasUteis(dataInicio, diasPrazo);
        const resultadoFormatado = resultadoData.toISOString().split('T')[0];
        
        if (resultadoFormatado === esperado) {
            console.log("[PASSOU] Teste de Integração: Brasil API respondeu corretamente e o prazo pulou o feriado!");
            return true;
        } else {
            console.error(`[FALHOU] Teste de Integração: Esperava ${esperado}, mas o sistema calculou ${resultadoFormatado}`);
            return false;
        }
        
    } catch (erro) {
        console.error("[ERRO CRÍTICO] Teste de Integração falhou. A API pode estar offline ou o código possui erros:", erro);
        return false;
    }
}