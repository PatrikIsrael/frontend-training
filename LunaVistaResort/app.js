document.getElementById('reservaForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const formData = new FormData(this); // Captura os dados do formulário

    // Converte os dados do formulário para um objeto JSON
    const reserva = {};
    formData.forEach(function(value, key) {
        reserva[key] = value;
    });

    // Envia os dados para o servidor usando fetch API
    fetch('http://localhost:3000/reservas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(reserva)
    })
    .then(function(response) {
        if (response.ok) {
            console.log('Reserva enviada com sucesso!');
            // Após o envio bem-sucedido, chama a função para buscar e exibir todas as reservas
            carregarReservas();
        } else {
            console.error('Erro ao enviar reserva');
        }
    })
    .catch(function(error) {
        console.error('Erro ao enviar reserva:', error);
    });
});

// Função para carregar as reservas e preencher a tabela
function carregarReservas() {
    fetch('http://localhost:3000/reservas')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao carregar as reservas');
            }
            return response.json();
        })
        .then(reservas => {
            preencherTabelaReservas(reservas);
        })
        .catch(error => {
            console.error('Erro ao carregar as reservas:', error);
        });
}

// Função para preencher a tabela com os dados das reservas
function preencherTabelaReservas(reservas) {
    const tabelaReservas = document.getElementById('tabelaReservas');
    tabelaReservas.innerHTML = ''; // Limpa o conteúdo atual da tabela

    reservas.forEach(reserva => {
        const newRow = tabelaReservas.insertRow();
        newRow.innerHTML = `
            <td>${reserva.nome}</td>
            <td>${reserva.email}</td>
            <td>${reserva.dataEntrada}</td>
            <td>${reserva.dataSaida}</td>
            <td>${reserva.adultos}</td>
            <td>${reserva.criancas}</td>
            <td>${reserva.pets}</td>
        `;
    });
}

// Função para ampliar a imagem quando clicada
function ampliarImagem(imagem) {
    // Cria um modal para exibir a imagem ampliada
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-overlay" onclick="fecharModal()"></div>
        <img src="${imagem.src}" class="modal-img">
    `;
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden'; 
}

// Função para fechar o modal
function fecharModal() {
    const modal = document.querySelector('.modal');
    modal.remove();
    document.body.style.overflow = '';
}

// Chama a função para carregar as reservas quando a página carregar
window.onload = () => {
    carregarReservas();
};
