/**
    Comunicação com a Brasil API para busca de feriados nacionais.
 */
async function buscarFeriadosNacionais(ano) {
    const url = `https://brasilapi.com.br/api/feriados/v1/${ano}`;
    
    try {
        const resposta = await fetch(url);
        
        if (!resposta.ok) {
            throw new Error(`Erro na requisição: Status ${resposta.status}`);
        }
        
        const feriados = await resposta.json();
        
        // Retorna apenas um Array com as strings das datas.
        return feriados.map(feriado => feriado.date);
    
    } catch (erro) {
        console.error("Falha ao consumir a Brasil API:", erro);
        throw erro;
        // Repassa o erro para o teste ou para a UI tratarem
    }
}