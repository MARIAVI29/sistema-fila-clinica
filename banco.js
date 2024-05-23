


const formCliente = document.querySelector("#formCliente");
const listaFila = document.querySelector("#listaFila");
const totalClientes = document.querySelector("#totalClientes");
const clienteAtual = document.querySelector("#clienteAtual");
const botaoProximoCliente = document.querySelector("#botaoProximoCliente");


const mostrarFila = () => {
    const fila = JSON.parse(localStorage.getItem("filaAtendimento")) || [];
    listaFila.innerHTML = '';

    fila.forEach(cliente => {
        const li = document.createElement("li");
        li.textContent = `${cliente.nome} (CPF: ${cliente.cpf})`;
        if (cliente.prioridade !== "nenhuma") {
            li.classList.add("prioridade");
            li.textContent += ` - ${cliente.prioridade}`;
        }
        listaFila.appendChild(li);
    });

    totalClientes.textContent = fila.length;
};


formCliente.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const nome = formCliente.nome.value;
    const cpf = formCliente.cpf.value;
    const prioridade = formCliente.prioridade.value;

    const novoCliente = { nome, cpf, prioridade };
    let fila = JSON.parse(localStorage.getItem("filaAtendimento")) || [];
    
    fila.push(novoCliente);
    fila.sort((a, b) => {
        const prioridades = ["deficiencia", "gravida", "idoso", "nenhuma"];
        return prioridades.indexOf(a.prioridade) - prioridades.indexOf(b.prioridade);
    });

    localStorage.setItem("filaAtendimento", JSON.stringify(fila));

    mostrarFila();
    formCliente.reset();
});


botaoProximoCliente.addEventListener("click", () => {
    let fila = JSON.parse(localStorage.getItem("filaAtendimento")) || [];

    if (fila.length === 0) {
        alert("Não há clientes na fila para atendimento.");
        clienteAtual.textContent = "Nenhum cliente em atendimento";
        return;
    }

    const cliente = fila.shift();
    clienteAtual.textContent = `${cliente.nome} (CPF: ${cliente.cpf}) - ${cliente.prioridade !== "nenhuma" ? cliente.prioridade : "Sem prioridade"}`;

    localStorage.setItem("filaAtendimento", JSON.stringify(fila));
    mostrarFila();
});


window.addEventListener("load", mostrarFila);
