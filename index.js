const { app, BrowserWindow, ipcMain } = require(`electron`)
const path = require('path')
const fs = require('fs')

const filePath = path.join(__dirname, './tarefas.txt')

let mainWindow

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
          preload: path.join(__dirname, 'preload.js'), // Comunicação segura
          contextIsolation: true,
          enableRemoteModule: false,
      },
  });

  mainWindow.loadFile('index.html');
});

// Lê as tarefas do arquivo e envia para o frontend
ipcMain.handle('carregar-tarefas', async () => {
  try {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
  } catch (error) {
      console.error('Erro ao ler o arquivo:', error);
      return []; // Retorna uma lista vazia se houver erro
  }
});

// Salva as tarefas recebidas do frontend
ipcMain.on('salvar-tarefas', (event, tarefas) => {
  try {
      fs.writeFileSync(filePath, JSON.stringify(tarefas, null, 2));
      console.log('Tarefas salvas com sucesso!');
  } catch (error) {
      console.error('Erro ao salvar as tarefas:', error);
  }
});
