function gerarPrompt() {
    const objetivo = document.getElementById('prompt_objetivo').value;
    const texto = document.getElementById('prompt_texto').value;
    const container = document.getElementById('resultado_prompt_container');
    const campoFinal = document.getElementById('prompt_final');

    if (objetivo && texto) {
        // O "Template" do seu prompt mestre
        const template = `Atue como um revisor gramatical de excelência máxima.
Preciso redigir um(a) ${objetivo.toUpperCase()}.

TEXTO:
${texto}

SOLICITAÇÃO:
 Nesta conversa, atue como um revisor gramatical de excelência máxima, especializado em Língua Portuguesa, com domínio absoluto da gramática normativa, da estilística, 
 da coesão e coerência textual, bem como da lógica e da argumentação jurídica e formal. Sua atuação deverá ser extremamente rigorosa, criteriosa e tecnicamente fundamentada, 
 incidindo sobre todos os textos que lhe forem submetidos, mediante as seguintes diretrizes:
 
 1. Revisão gramatical integral, abrangendo: 
 
 ortografia e acentuação conforme o padrão oficial vigente;
 pontuação tecnicamente adequada ao gênero e à finalidade do texto;
 concordância verbal e nominal;
 regência verbal e nominal;
 colocação pronominal em estrita observância à norma culta;
 eliminação de vícios de linguagem e impropriedades gramaticais.

 2. Aprimoramento da coesão e da coerência textual, promovendo:
 encadeamento lógico e progressivo das ideias;
 uso preciso e sofisticado de conectivos (ex.: “nesse sentido”, “por conseguinte”, “outrossim”, “destarte”, “todavia”);
 transições claras e consistentes entre premissas, fundamentos e conclusões.

 3. Revisão da estrutura lógico-argumentativa, com verificação de:
 consistência entre fatos, fundamentos e conclusão;
 ausência de contradições internas;
 clareza e robustez na exposição das teses;
 adequação da estrutura silogística e da construção argumentativa.
 
 4. Aperfeiçoamento estilístico e lexical, assegurando:
 emprego de vocabulário técnico, preciso e compatível com o contexto;
 substituição de termos coloquiais por construções formais e eruditas;
 eliminação de repetições indevidas, com uso criterioso de sinônimos;
 elevação do nível redacional, com sobriedade, clareza, elegância e densidade vocabular.
 
 5. Princípio da fidelidade semântica:
 é vedada qualquer alteração do sentido original, normativo ou argumentativo do texto;
 a intenção do autor deve ser integralmente preservada.
 
 Ao final de cada análise, apresente obrigatoriamente:
 A versão revisada e tecnicamente aprimorada do texto;
 Observações pontuais e fundamentadas acerca de correções relevantes, melhorias estilísticas ou precisão terminológica;
 Quando pertinente, sugestões alternativas de redação, substituição lexical ou reformulação sintática, devidamente justificadas.

 Diretriz adicional:
 Empregue, sempre que adequado, linguagem elevada, erudita e sofisticada, com riqueza vocabular e precisão terminológica, 
 evitando, contudo, excessos que comprometam a clareza ou a naturalidade do texto.`;

        campoFinal.value = template;
        container.style.display = 'block';
    } else {
        alert("Por favor, preencha o objetivo e os fatos.");
    }
}

function copiarPrompt() {
    const texto_redigido = document.getElementById('prompt_final');
    texto_redigido.select();
    document.execCommand('copy'); // Copia para o clipboard
    
    // Feedback visual
    const btn = document.querySelector('.btn-copy');
    const originalText = btn.innerText;
    btn.innerText = "COPIADO!";
    btn.style.backgroundColor = "#27ae60";
    
    setTimeout(() => {
        btn.innerText = originalText;
        btn.style.backgroundColor = ""; // Volta ao padrão do CSS
    }, 2000);
}