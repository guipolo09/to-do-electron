const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
    salvarTarefas: (tarefas) => ipcRenderer.send('salvar-tarefas', tarefas),
    carregarTarefas: () => ipcRenderer.invoke('carregar-tarefas'),
});