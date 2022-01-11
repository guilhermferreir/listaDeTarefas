const botao = document.querySelector(".btn-tarefa");
const input = document.querySelector(".input-tarefa");
const ul = document.querySelector(".tarefas");

const criarTarefa = (valorInput) => {
    const li = document.createElement("li");
    li.innerText = valorInput;
    criarBotaoApagar(li);
    ul.appendChild(li);
    apagarInput();
    salvarTarefas();
}

const criarBotaoApagar = (li) => {
    li.innerText += " ";
    const botaoApagar = document.createElement("button");
    botaoApagar.innerHTML = "apagar";
    botaoApagar.setAttribute("class", "apagar");
    li.appendChild(botaoApagar);
}

const apagarInput = ()=>{
    input.value = " ";
    input.focus();
}

const salvarTarefas = () => {
    const liTarefas = ul.querySelectorAll("li");
    const listaDeTarefas = [];
    for(let tarefa of liTarefas){
        let tarefasTexto = tarefa.innerText;
        tarefasTexto = tarefasTexto.replace("apagar", "").trim();
        listaDeTarefas.push(tarefasTexto);
    }
    const tarefasJson = JSON.stringify(listaDeTarefas);
    localStorage.setItem("tarefas", tarefasJson);
}

botao.addEventListener("click", ()=>{
    if(!input.value)return;
    criarTarefa(input.value);
})

input.addEventListener("keypress", (e)=>{
    if(e.keyCode === 13){
        if(!input.value)return;
        criarTarefa(input.value); 
    }
})

document.addEventListener("click", (e)=>{
    const alvo = e.target;
    if(alvo.classList.contains("apagar")){
        const paiDoAlvo = alvo.parentElement;
        paiDoAlvo.remove();
        salvarTarefas();
    }
})

const recuperaTarefas = () => {
    const tarefasSalvas = localStorage.getItem("tarefas");
    const tarefas = JSON.parse(tarefasSalvas);
    for(let tarefa of tarefas){
        criarTarefa(tarefa);
    }
}

recuperaTarefas();