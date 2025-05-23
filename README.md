# 📝 To-Do List com Electron

Este é um aplicativo de To-Do List desenvolvido com **Electron** e **JavaScript**, focado em produtividade e organização visual de tarefas através de colunas.

---

## 🧠 Visão Geral

A aplicação permite organizar suas tarefas em diferentes estágios de execução, usando colunas estilo _Kanban_. A interface é simples, intuitiva e focada em fluxo de trabalho.

### 🔹 Colunas disponíveis:

- **To Do**: Tarefas a serem iniciadas.
- **In Progress**: Tarefas em andamento.
- **To Review**: Tarefas aguardando revisão.
- **Done**: Tarefas concluídas.
- **Limbo**: Uma "lixeira" para tarefas descartadas.

---

## 🚀 Funcionalidades

- ✅ **Criar uma nova tarefa com duplo clique** em qualquer coluna.
- 🧩 **Arrastar e soltar tarefas** entre as colunas para atualizar o status.
- 🕓 **Tarefas não preenchidas são automaticamente descartadas**.
- 🗑️ **Tarefas arrastadas para o Limbo são excluídas permanentemente**.
- ✨ Interface moderna e leve.

---

## 🛠️ Como rodar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Iniciar o app

```bash
npm start
```

> Certifique-se de ter o Node.js instalado.

---

## 📁 Estrutura do Projeto

```bash
├── index.js             # Processo principal do Electron
├── package.json
├── index.html          # Interface principal
├── preload.js         # Lógica da interface
├── script.js         # Lógica da aplicação
├── style.css           # Estilos do app
├── .gitignore
└── README.md
```

---

## 📦 Tecnologias Utilizadas

- [Electron](https://www.electronjs.org/)
- HTML5 + CSS3
- JavaScript (vanilla)
- Node.js

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

## 🙋‍♀️ Contribuindo

Contribuições são bem-vindas! Sinta-se livre para abrir uma issue ou enviar um pull request. 🚀
