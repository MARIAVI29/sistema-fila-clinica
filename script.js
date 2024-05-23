// Dados de login pré-cadastrados
const usuarioValido = 'admin';
const senhaValida = '1234';


document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;

    if (usuario === usuarioValido && senha === senhaValida) {
        window.location.href = 'cadastro.html';
    } else {
        alert('Usuário ou senha inválidos!');
    }
});


function onSignIn(googleUser) {
    const profile = googleUser.getBasicProfile();
    if (profile) {
        window.location.href = 'cadastro.html';
    }
}


function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, ''); 
    if (cpf.length !== 11) return false;
    if (/^(\d)\1+$/.test(cpf)) return false; 

    let soma = 0, resto;
    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf.substring(10, 11));
}


document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const cpfInput = document.getElementById('cpf').value;
    if (!validarCPF(cpfInput)) {
        alert('CPF inválido!');
        return;
    }

    const paciente = {
        nome: document.getElementById('nomeCompleto').value,
        endereco: document.getElementById('endereco').value,
        cpf: document.getElementById('cpf').value,
        plano: document.getElementById('plano').value,
        prioridade: document.getElementById('prioridade').value
    };

    adicionarPacienteNaFila(paciente);
    document.getElementById('registerForm').reset(); 
});


let fila = [];

function adicionarPacienteNaFila(paciente) {
    fila.push(paciente);
    atualizarFila();
}

function atualizarFila() {
    fila.sort((a, b) => {
        const prioridades = { 'Vermelho': 1, 'Amarelo': 2, 'Verde': 3 };
        return prioridades[a.prioridade] - prioridades[b.prioridade];
    });
    const filaElement = document.getElementById('fila');
    filaElement.innerHTML = fila.map(paciente =>
        `<div>Nome: ${paciente.nome} - Prioridade: ${paciente.prioridade} - Plano: ${paciente.plano}</div>`
    ).join('');
}

document.getElementById('botaoAtender').addEventListener('click', function () {
    if (fila.length === 0) {
        alert('Nenhum paciente na fila.');
        return;
    }
    const proximoPaciente = fila.shift();
    document.getElementById('pacienteAtual').innerHTML = `Atendendo: ${proximoPaciente.nome} - Prioridade: ${proximoPaciente.prioridade} - Plano: ${proximoPaciente.plano}`;
    atualizarFila();
});



let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}


function onSignIn(googleUser) {
   
    window.location.href = 'cadastro.html';
}

function handleCrentialResponse(response){
    console.log("Encoded JWT ID token:" + response.credential);

}
window.onload = function (){
    google.accounts.id.initialize({
        cliente_id:"YOUR_GOOGLE_CLIENT_ID" 
        callback: handleCredentialResponse


});

google.accounts.id.renderButton(
    document.getElementById("buttonDiv"),
    { theme:"outline", size: "large"}
);

 google.accounts.id.prompt();

}