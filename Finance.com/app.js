// Função para mostrar o modal correspondente à opção selecionada
function mostrarModal() {
    var opcaoSelecionada = document.getElementById("opcaoEmprestimo").value;
    setTimeout(function () {
        window.location.href = "simulacao.html";
    }, 2000);

    // Oculta todos os modais
    fecharModal();

    // Exibe o modal correspondente
    document.getElementById("modal" + opcaoSelecionada).style.display = "block";
}

// Função para simular o empréstimo
function simularEmprestimo() {
    var valorEmprestimo = parseFloat(document.getElementById("valorEmprestimo").value);
    var numeroMeses = parseFloat(document.getElementById("numeroMeses").value);

    // Adicionando valores pré-programados para facilitar a visualização
    if (isNaN(valorEmprestimo)) {
        valorEmprestimo = 1000; // Valor padrão: R$ 1000,00
        document.getElementById("valorEmprestimo").value = valorEmprestimo;
    }

    if (isNaN(numeroMeses)) {
        numeroMeses = 12; 
        document.getElementById("numeroMeses").value = numeroMeses;
    }

 
    var opcaoSelecionada = document.getElementById("opcaoEmprestimo").value;
    var taxaJuros = (opcaoSelecionada === "Pessoal") ? 0.11 : 0.02;

    var totalJuros = valorEmprestimo * taxaJuros * numeroMeses;
    var valorTotal = valorEmprestimo + totalJuros;

    // Exibe os resultados na div "resultado"
    document.getElementById("resultado").innerHTML = `
        <h3>Simulação de Empréstimo (${opcaoSelecionada})</h3>
        <p>Valor do Empréstimo: R$ ${valorEmprestimo.toFixed(2)}</p>
        <p>Número de Meses: ${numeroMeses}</p>
        <p>Total de Juros: R$ ${totalJuros.toFixed(2)}</p>
        <p>Valor Total a Pagar: R$ ${valorTotal.toFixed(2)}</p>
    `;
}

// Função para fechar todos os modais
function fecharModal() {
    var modais = document.querySelectorAll(".modal");

    // Oculta todos os modais
    modais.forEach(function (modal) {
        modal.style.display = "none";
    });
}

// Função auxiliar para obter o tipo de empréstimo selecionado
function obterTipoEmprestimo() {
    return document.getElementById("opcaoEmprestimo").value;
}

// Função auxiliar para obter a taxa de juros correspondente ao tipo de empréstimo
function obterTaxaJuros(tipoEmprestimo) {
    return (tipoEmprestimo === "EmprestimoPessoal") ? 0.11 : 0.02;
}

// Função chamada da página de cadastro
function cadastrarCliente() {
    // Simulação de cadastro bem-sucedido
    var mensagemCadastro = "Cadastro realizado com sucesso!";

    // Exibe a mensagem de cadastro
    alert(mensagemCadastro);

    // Redireciona para a página de simulação após 1 segundo
    setTimeout(function () {
        window.location.href = "simulacao.html";
    }, 1000);
}

// Função chamada da página home
function paginaEmprestimo() {
    // Redireciona para a página de simulação após 1 segundo
    setTimeout(function() {
        window.location.href = "simulacao.html";
    }, 1000);
}



