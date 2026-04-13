function pesquisarGlossario() {
    // 1. Pega o valor digitado e converte para minúsculo para ignorar o "Case Sensitive"
    let input = document.getElementById('filtro-glossario');
    let filter = input.value.toLowerCase();
    
    // 2. Seleciona todos os itens do glossário
    let lista = document.getElementById("lista-termos");
    let itens = lista.getElementsByClassName('termo-item');
    let encontrouAlgo = false;

    // 3. Loop por todos os itens para esconder os que não batem com a busca
    for (let i = 0; i < itens.length; i++) {
        let termo = itens[i].getElementsByTagName("dt")[0];
        let definicao = itens[i].getElementsByTagName("dd")[0];
        
        if (termo || definicao) {
            let textoTermo = termo.textContent || termo.innerText;
            let textoDefinicao = definicao.textContent || definicao.innerText;

            // Verifica se o que foi digitado está no título OU na descrição
            if (textoTermo.toLowerCase().indexOf(filter) > -1 || 
                textoDefinicao.toLowerCase().indexOf(filter) > -1) {
                itens[i].style.display = ""; // Mostra o item
                encontrouAlgo = true;
            } else {
                itens[i].style.display = "none"; // Esconde o item
            }
        }
    }

    // 4. Mostra mensagem de erro se nada for encontrado
    let msgErro = document.getElementById("no-results");
    msgErro.style.display = encontrouAlgo ? "none" : "block";
}