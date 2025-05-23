const columns = document.querySelectorAll(".column__cards");
const limbo = document.getElementById("limbo"); // Seleciona o "limbo"
let draggedCard = null; // Card atualmente arrastado

const dragStart = (event) => {
    draggedCard = event.target; // Armazena o card arrastado
    event.dataTransfer.effectAllowed = "move";
    setTimeout(() => draggedCard.classList.add("dragging"), 0); // Adiciona feedback visual
};

const dragEnd = () => {
    if (draggedCard) draggedCard.classList.remove("dragging"); // Remove feedback visual
    draggedCard = null;
};

const dragOver = (event) => {
    event.preventDefault(); // Permite o drop
};

const dragEnter = ({ target }) => {
    if (target.classList.contains("column__cards") || target.id === "limbo") {
        target.classList.add("column--highlight");
    }
};

const dragLeave = ({ target }) => {
    target.classList.remove("column--highlight")
    if (draggedCard) draggedCard.classList.remove("dragging"); // Remove feedback visual
    //draggedCard = null;
};

const drop = ({ target }) => {
    event.preventDefault(); // Evita comportamento padrão

    if (target.id === "limbo" && draggedCard) {
        draggedCard.remove(); // Remove o card do DOM ao soltar no "limbo"
        target.classList.remove("column--highlight")
    } else if (target.classList.contains("column__cards")) {
        target.classList.remove("column--highlight");
        target.appendChild(draggedCard); // Move o card para a nova coluna
    }

    draggedCard = null; // Reseta a referência
};

const createCard = ({ target }) => {
    if (!target.classList.contains("column__cards")) return;

    const card = document.createElement("section");
    card.className = "card";
    card.draggable = "true";
    card.contentEditable = "true";
    //card.content.focus(); // Foco automático para digitação

    // const content = document.createElement("div");
    // content.className = "card-content";
    // content.contentEditable = true;
    //content.textContent = "Digite aqui...";

    // const deleteButton = document.createElement("button");
    // deleteButton.className = "delete-btn";
    // deleteButton.innerHTML = "🗑";

    // deleteButton.addEventListener("click", (event) => {
    //     event.stopPropagation(); // Impede conflito com outros eventos
    //     card.remove();
    // });

    //card.append(content, deleteButton);
    card.addEventListener("focusout", () => {
        card.contentEditable = "false";
        if (!card.textContent) card.remove();
    });
    target.appendChild(card);
    

    card.addEventListener("dragstart", dragStart);
    card.addEventListener("dragend", dragEnd);
    //content.focus(); // Foco automático para digitação
    salvarTarefas()
    
};

// Adiciona os eventos nas colunas e no "limbo"
columns.forEach((column) => {
    column.addEventListener("dragover", dragOver);
    column.addEventListener("dragenter", dragEnter);
    column.addEventListener("dragleave", dragLeave);
    column.addEventListener("drop", drop);
    column.addEventListener("dblclick", createCard);
});

limbo.addEventListener("dragover", dragOver); // Permitir drop no "limbo"
limbo.addEventListener("dragenter", dragEnter);
limbo.addEventListener("dragleave", dragLeave);
limbo.addEventListener("drop", drop);

// Carrega as tarefas ao iniciar a aplicação
window.addEventListener('DOMContentLoaded', async () => {
    const tarefas = await window.api.carregarTarefas();
    preencherTarefas(tarefas);
});

// Função para preencher as colunas com tarefas
function preencherTarefas(tarefas) {
    tarefas.forEach(({ coluna, conteudo }) => {
        const card = criarCard(conteudo);
        document.querySelector(`.column__cards[data-coluna="${coluna}"]`).appendChild(card);
    });
}



// Salvar tarefas ao sair da aplicação
window.addEventListener('beforeunload', salvarTarefas);

function salvarTarefas() {
    const tarefas = Array.from(columns).flatMap((column) => {
        const coluna = column.getAttribute('data-coluna');
        return Array.from(column.children).map((card) => ({
            coluna,
            conteudo: card.querySelector('.card-content').textContent,
        }));
    });

    window.api.salvarTarefas(tarefas);
}
