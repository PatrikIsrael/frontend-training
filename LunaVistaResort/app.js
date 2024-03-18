document.getElementById('reservaForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio do formulário

    // Coleta dos dados do formulário
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const dataEntrada = document.getElementById('date-entrada').value;
    const dataSaida = document.getElementById('date-saida').value;
    const adultos = document.getElementById('adulto').value;
    const criancas = document.getElementById('criancas').value;
    const pets = document.getElementById('pet').value;

    // Verifica se todos os campos foram preenchidos
    if (nome && email && dataEntrada && dataSaida && adultos && criancas && pets) {
        // Registro da reserva no console
        console.log('Reserva enviada para avaliação:');
        console.log('Nome:', nome);
        console.log('E-mail:', email);
        console.log('Data de Entrada:', dataEntrada);
        console.log('Data de Saída:', dataSaida);
        console.log('Número de Adultos:', adultos);
        console.log('Número de Crianças:', criancas);
        console.log('Quantidade de Pets:', pets);

        // Exibe mensagem de confirmação
        alert('Reserva enviada com sucesso!');
        // Recarrega a página após 2 segundos (2000 milissegundos)
        setTimeout(function() {
            window.location.reload();
        }, 1000);
    } else {
        // Se algum campo estiver vazio, exibe mensagem de erro
        alert('Por favor, preencha todos os campos do formulário.');
    }
});
