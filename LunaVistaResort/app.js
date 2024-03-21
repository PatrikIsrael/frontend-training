document.addEventListener('DOMContentLoaded', function() {
    // Adiciona um listener de evento de envio para o formulário de reserva
    const reservaForm = document.getElementById('reservaForm');
    if (reservaForm) {
        reservaForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Impede o envio padrão do formulário
            const formData = new FormData(this); // Captura os dados do formulário
            const reserva = {};
            formData.forEach(function(value, key) {
                reserva[key] = value;
            });
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
                    carregarReservas(); // Carrega as reservas após o envio bem-sucedido
                } else {
                    console.error('Erro ao enviar reserva');
                }
            })
            .catch(function(error) {
                console.error('Erro ao enviar reserva:', error);
            });
        });
    }

    // Adiciona um listener de evento de entrada para o campo de busca
    const campoBusca = document.getElementById('campoBusca');
    if (campoBusca) {
        campoBusca.addEventListener('input', function() {
            document.getElementById('botaoBuscar').disabled = this.value.trim() === '';
        });
    }

    // Adiciona um listener para o botão de busca
    const botaoBuscar = document.getElementById('botaoBuscar');
    if (botaoBuscar) {
        botaoBuscar.addEventListener('click', function() {
            buscarReservas(); // Executa a função de busca quando o botão for clicado
        });
    }

    // Função para buscar as reservas com base no nome ou email
    function buscarReservas() {
        const termoBusca = document.getElementById('campoBusca').value.trim().toLowerCase();
        fetch('http://localhost:3000/reservas')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao carregar as reservas');
                }
                return response.json();
            })
            .then(reservas => {
                // Filtra as reservas com base no termo de busca
                const reservasFiltradas = reservas.filter(reserva => 
                    reserva.nome.toLowerCase().includes(termoBusca) ||
                    reserva.email.toLowerCase().includes(termoBusca)
                );
                preencherTabelaReservas(reservasFiltradas); // Preenche a tabela com as reservas filtradas
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
                <td>${reserva.nome || 0}</td>
                <td>${reserva.email || 0}</td>
                <td>${reserva.dataEntrada || 0}</td>
                <td>${reserva.dataSaida || 0}</td>
                <td>${reserva.adulto || 0}</td>
                <td>${reserva.criancas || 0}</td>
                <td>${reserva.pet || 0}</td>
            `;
        });
    }
});



// Função para ampliar a imagem quando clicada
function ampliarImagem(imagem) {
   
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

