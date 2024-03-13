// Função para alternar o Método de Pagamento
function togglePaymentMethod() {
    const metodoPagamento = document.getElementById("metodoPagamento").value;
    const pixPanel = document.getElementById("pixPanel");
    const cartaoPanel = document.getElementById("cartaoPanel");
    const resumoPagamento = document.getElementById("resumoPagamento");
    const efetuarPagamentoButton = document.getElementById("efetuarPagamentoButton");

    pixPanel.style.display = metodoPagamento === "pix" ? "block" : "none";
    cartaoPanel.style.display = metodoPagamento === "cartao" ? "block" : "none";
    efetuarPagamentoButton.style.display = "none";
    resumoPagamento.style.display = "none";
}

// Função para alternar as Opções do Pix
function togglePixOptions() {
    const formaPix = document.getElementById("formaPix").value;
    const cpfPanel = document.getElementById("cpfPanel");
    const qrCodePanel = document.getElementById("qrCodePanel");

    cpfPanel.style.display = formaPix === "cpf" ? "block" : "none";
    qrCodePanel.style.display = formaPix === "qrCode" ? "block" : "none";
}



// Função para verificar o Número do Cartão
function checkCardNumber() {
    const numeroCartao = document.getElementById("numeroCartao").value;
    const bandeiraIcons = document.getElementById("bandeiraIcons");

    bandeiraIcons.innerHTML = "";

    if (numeroCartao.startsWith("1234")) {
        bandeiraIcons.innerHTML = "<img src='assets/img/logo_mastercard.png' alt='Bandeira Mastercard'>";
    } else if (numeroCartao.startsWith("4321")) {
        bandeiraIcons.innerHTML = "<img src='assets/img/logo_visa.png' alt='Bandeira Visa'>";
    }
}

// Função para verificar se todos os campos estão preenchidos
function validarCampos() {
    const metodoPagamento = document.getElementById("metodoPagamento").value;

    if (metodoPagamento === "pix") {
        const formaPix = document.getElementById("formaPix").value;
        if (formaPix === "cpf") {
            const cpf = document.getElementById("cpf").value;
            return cpf !== "";
        } else if (formaPix === "qrCode") {
            // Verificar se há validação específica para QR Code Pix, se necessário
            return true;
        }
    } else if (metodoPagamento === "cartao") {
        const numeroCartao = document.getElementById("numeroCartao").value;
        const nomeTitular = document.getElementById("nomeTitular").value;
        const codigoSeguranca = document.getElementById("codigoSeguranca").value;
        const vencimento = document.getElementById("vencimento").value;

        return numeroCartao !== "" && nomeTitular !== "" && codigoSeguranca !== "" && vencimento !== "";
    }

    return false;
}


// Função para gerar o Pagamento
function generatePayment() {
    if (!validarCampos()) {
        document.getElementById("mensagemAlerta").innerHTML = "Preencha todos os campos antes de gerar o pagamento.";
        return;
    }

    document.getElementById("mensagemAlerta").innerHTML = "";

    const metodoPagamento = document.getElementById("metodoPagamento").value;

    if (metodoPagamento === "pix") {
        generatePixPayment();
    } else if (metodoPagamento === "cartao") {
        generateCardPayment();
    }
}

// Função para gerar o Pagamento Pix
function generatePixPayment() {
    const formaPix = document.getElementById("formaPix").value;
    const cpf = document.getElementById("cpf").value;
    const totalValor = parseFloat(document.getElementById("valor").value) || 0;
    const detalhesPagamento = document.getElementById("detalhesPagamento");

    if (formaPix === "cpf") {
        detalhesPagamento.innerHTML = `Pagamento Pix com CPF: ${cpf}<br>Valor com Desconto (10%): R$ ${(totalValor * 0.9).toFixed(2)}`;
    } else if (formaPix === "qrCode") {
        detalhesPagamento.innerHTML = `Pagamento Pix com QR Code<br>Valor com Desconto (10%): R$ ${(totalValor * 0.9).toFixed(2)}`;
    }

    resumoPagamento.style.display = "block";
}

// Função para gerar o Pagamento Cartão
function generateCardPayment() {
    const numeroCartao = document.getElementById("numeroCartao").value;
    const nomeTitular = document.getElementById("nomeTitular").value;
    const codigoSeguranca = document.getElementById("codigoSeguranca").value;
    const vencimento = document.getElementById("vencimento").value;
    const parcelas = document.getElementById("parcelas").value;
    const bandeiraIcons = document.getElementById("bandeiraIcons");
    const totalValor = parseFloat(document.getElementById("valor").value) || 0;
    const detalhesPagamento = document.getElementById("detalhesPagamento");
    const resumoPagamento = document.getElementById("resumoPagamento");
    const efetuarPagamentoButton = document.getElementById("efetuarPagamentoButton");

    bandeiraIcons.innerHTML = "";

    if (numeroCartao.startsWith("1234")) {
        bandeiraIcons.innerHTML = "<img src='assets/img/logo_mastercard.png' alt='Mastercard'>";
    } else if (numeroCartao.startsWith("4321")) {
        bandeiraIcons.innerHTML = "<img src='assets/img/logo_visa.png' alt='Visa'>";
    } else {
        alert("Número de cartão inválido");
        return;
    }

    const acrescimo = calculateInterest(parcelas);
    const valorComAcrescimo = totalValor * (1 + acrescimo);
    const valorParcela = valorComAcrescimo / parcelas;

    let detalhes = `Pagamento com cartão de crédito\nNúmero do Cartão: ${numeroCartao}\nNome do Titular: ${nomeTitular}\nCódigo de Segurança: ${codigoSeguranca}\nVencimento das Parcelas: ${vencimento}\nParcelas: ${parcelas}x`;

    if (acrescimo > 0) {
        detalhes += `\nAcréscimo de ${acrescimo * 100}% no pagamento`;
    }

    if (acrescimo > 0) {
        detalhes += `\nValor Total com Acréscimo: R$ ${valorComAcrescimo.toFixed(2)}\nValor por Parcela: R$ ${valorParcela.toFixed(2)}`;
    } else {
        detalhes += `\nValor Total: R$ ${totalValor.toFixed(2)}\nValor por Parcela: R$ ${valorParcela.toFixed(2)}`;
    }

    detalhesPagamento.innerHTML = detalhes;
    resumoPagamento.style.display = "block";
    efetuarPagamentoButton.style.display = "block";
}

// Função para calcular o acréscimo com base no número de parcelas
function calculateInterest(parcelas) {
    if (parcelas == 4) {
        return 0.05; // 5% de acréscimo para 4 parcelas
    } else if (parcelas == 5) {
        return 0.1; // 10% de acréscimo para 5 parcelas
    } else {
        return 0;
    }
}

// Função para confirmar o Pagamento
function confirmPayment() {
    alert("Pagamento confirmado com sucesso!");
    location.reload();
}
