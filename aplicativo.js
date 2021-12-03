'use strict';
/* Nesse projeto usamos as Class para css e Id para javascript*/

/*Banco de dados usando o local storage*/
/*Criamos uma funão para pegar informação do meu banco - LocalStorage*/
const pegarBanco = () => JSON.parse( localStorage.getItem("todoList")) ?? [];
/**Iremos criar um banco */
const fixarBanco = (banco) => localStorage.setItem('todoList',JSON.stringify(banco))

/*Criar tarefa da lista
    - Recebe o parametro tarefa e este indica qual texxto esta dentro da div no html
*/
const criarItem = (tarefa,estado='',indice) => {
    const item = document.createElement('lab') /*Crio uma label*/
    item.classList.add("item_todo")/*Dentro da label eu adiciono a classe item_todo */
    /* O innerHtml me permite criar uma estrutura dinamica html dentro do javascript*/
    item.innerHTML = `
        <input class="teste" type="checkbox" ${estado} data-indice = ${indice}>  
        <div >${tarefa}</div>
        <input type="button" value="X"  data-indice = ${indice}>`
        /*1 - checkbox*/
        /**/
    document.getElementById('todoList').appendChild(item);
}

const contadorQuantidade = () => {
    const banco = pegarBanco()
    const tamanho = banco.length
    const contador = document.createElement("p") /*Crio paragrafo*/
    contador.classList.add('contador_todo')
    contador.innerHTML = `
    ${tamanho} tarefa(s)
    `
    document.getElementById('contadorTodo').appendChild(contador)
}

/* Antes de atualizar a tela eu preciso limpar as tarefas*/
const limparTarefas = () => {
    /*Chamo o id todoList*/
    const todoList = document.getElementById('todoList');
    /*Vai excluir o ultimo elemento ate que nao tenha mais filhos*/
    while (todoList.firstChild){
        todoList.removeChild(todoList.lastChild);
    }
}

const limparContador = () => {
    const contadorTodo = document.getElementById("contadorTodo")
    while(contadorTodo.firstChild){
        contadorTodo.removeChild(contadorTodo.lastChild)
    }
}

const atualizarContador = () => {
    limparContador();
    const banco = pegarBanco()
    contadorQuantidade()
}

/* Precisamos atualizar a tela para criar itens na tela e reproduzir eles*/
const atualizarTela = () => {
    /*Limpo as tarefas */
    limparTarefas()
    const banco = pegarBanco()
    /*Busco o que tem no banco de dados e cria um item para cada elemento do vetor,mostrando sempre a tarefa e o estado dela*/
    banco.forEach((item,indice) => criarItem(item.tarefa,item.estado,indice));
    atualizarContador();
}

/*Capturo o  evento do teclado e adiciono no banco*/
const inserirTarefa = (evento) => {
    const tecla = evento.key; 
    const texto = evento.target.value;
    if (tecla === "Enter"){
        const banco = pegarBanco();
        banco.push({'tarefa':texto,'estado':''})
        fixarBanco(banco);
        atualizarTela()
        evento.target.value = '' /*Ja limpa a caixa de texto*/
    }
    atualizarTela();
}
/* Remover tarefas*/
const removerTarefa = (indice) => {
    const banco = pegarBanco()
    banco.splice(indice,1) /*Removo a partir dele mesmo*/
    fixarBanco(banco)
    atualizarTela();
}
/*Atualizando os estado */
const atualizarEstado = (indice) => {
    const banco = pegarBanco()
    /*Verifico primeiro se esta marcado ou nao */
    if(banco[indice].estado === ''){
        banco[indice].estado = 'checked';
    }else{
        banco[indice].estado = '';
    }
    fixarBanco(banco)
    atualizarTela();
}

const clickItem = (evento) => {
    const elementoHtml = evento.target;
    if (elementoHtml.type == 'button'){
        const indice = elementoHtml.dataset.indice;
        removerTarefa(indice);
    }
    if(elementoHtml.type === 'checkbox'){
        const indice = elementoHtml.dataset.indice;
        atualizarEstado(indice);
    }
}
document.getElementById('novoItem').addEventListener('keypress',inserirTarefa);
document.getElementById('todoList').addEventListener('click',clickItem)
/*document.getElementById('funcoes').addEventListener('click',clickFuncao);*/
atualizarTela();