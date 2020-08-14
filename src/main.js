const { app, BrowserWindow } = require('electron')

let win;

function createWindow() {
    win = new BrowserWindow({
        minWidth: 500,
        minHeight: 500,
        backgroundColor: '#ffffff',
        icon: `file://${__dirname}/dist/assets/logo.png`
    });

    win.loadURL(`file://${__dirname}/dist/index.html`);

    //dev tools
    //win.webContents.openDevTools();

    //when window is closed
    win.on('closed', function () {
        win = null;
    });
}

//create app on electron initialization
app.on('ready', createWindow);

//quit when all windows are closed
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {//ios
        app.quit();
    }
});

app.on('activate', function () {
    if (win === null) {
        createWindow();
    }
});