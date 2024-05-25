
function mostrarEstoque() {
    var estoque = {
        'BG16F': {'Rocadeira': 17, 'Sprador': 10, 'Motopoda': 1, 'motosserra': 0},
        'BG16J': {'Rocadeira': 17, 'Soprador': 10, 'Motopoda': 1, 'motosserra': 0},
        'BG24B': {'Rocadeira': 31, 'Soprador': 11, 'Motopoda': 1, 'motosserra': 0},
        'BG24R': {'Rocadeira': 29, 'Soprador': 11, 'Motopoda': 1, 'motosserra': 0},
        'BGE': {'Rocadeira': 20, 'Soprador': 18, 'Motopoda': 1, 'motosserra': 6}
    };
    var select = document.getElementById("gerencia-select");
    var gerencia = select.options[select.selectedIndex].value;
    var gerencia_estoque = estoque[gerencia];
    var table = "<table class='table'>";
    table += "<thead><tr><th>Equipamento</th><th>Cota</th><th>Oficina</th><th>Quebrado na Gerência</th><th>Disponível na Gerência</th></tr></thead>";
    table += "<tbody>";
    for (var equipamento in gerencia_estoque) {
        table += "<tr><td>" + equipamento + "</td><td>" + gerencia_estoque[equipamento] + "</td>";
        table += "<td><input type='Number' id='oficina-" + equipamento + "'></td>";
        table += "<td><input type='Number' id='Quebrado-na-Gerência-" + equipamento + "'></td>";
        table += "<td><input type='Number' id='Disponível-" + equipamento + "'></td></tr>";
    }
    table += "</tbody></table>";
    document.getElementById("estoque").innerHTML = table;
  }
  
  function adicionarLinha(containerId) {
    const container = document.getElementById(containerId);
    const novaLinha = document.createElement("span");
    novaLinha.className = "turno-field";
    novaLinha.innerHTML = `
        <p>
            <label for="${containerId}_logradouro">Logradouro:</label>
            <input type="text" id="${containerId}_logradouro" name="${containerId}_logradouro" placeholder="Nome do Logradouro">
            <input type="number" id="${containerId}_qtd_Rocadeiras" name="${containerId}_qtd_Rocadeiras" placeholder="Qtd de Roçadeiras">
            <input type="number" id="${containerId}_qtd_soprador" name="${containerId}_qtd_soprador" placeholder="Qtd de Sopradores">
            <input type="number" id="${containerId}_qtd_motopoda" name="${containerId}_qtd_motopoda" placeholder="Qtd de Motopodas">
            <input type="number" id="${containerId}_qtd_motoserra" name="${containerId}_qtd_motoserra" placeholder="Qtd de Motosserras">
            <!-- Botão de remoção -->
            <button type="button" class="remove-logradouro-btn">-</button>
        <p>
    `;
    container.appendChild(novaLinha);
  }
  
  function adicionarListenersBotoes(idContainer) {
      const container = document.getElementById(idContainer);
  
      const btnAdicao = container.querySelector(".add-logradouro-btn");
      btnAdicao.addEventListener("click", function() {
          adicionarLinha(idContainer);
          adicionarListenersBotoes(idContainer); // Adiciona novamente os listeners para os novos botões de remoção
      });
  
      container.addEventListener("click", function(event) {
          if (event.target.classList.contains("remove-logradouro-btn")) {
              if (container.querySelectorAll(".turno-field").length > 1) {
                  event.target.parentElement.remove(); // Remove o elemento pai do botão clicado
              } else {
                  alert("Não é possível remover a primeira linha.");
              }
          }
      });
  }

  
// Função para carregar logradouros de um arquivo JSON e inicializar o autocomplete
async function carregarLogradouros() {
    try {
        const response = await fetch('logradouros.json'); // Caminho para o arquivo JSON
        const logradouros = await response.json();

        // Inicializar o autocomplete do jQuery UI
        $("#logradouro").autocomplete({
            source: logradouros
        });
    } catch (error) {
        console.error('Erro ao carregar logradouros:', error);
    }
}

// Chama a função ao carregar a página
document.addEventListener('DOMContentLoaded', carregarLogradouros);
        
    