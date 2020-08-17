const { app, BrowserWindow } = require('electron')
var path = require('path')
let win=null;
function createWindow() {
    win = new BrowserWindow({
        titleBarStyle: 'hidden',
        width: 800,
        height: 600,
        backgroundColor: '#ffffff',
        // icon: `file://${__dirname}/dist/assets/icons/win/logo.ico`
    })

    win.loadFile(`file://${__dirname}/dist/index.html`);

    //dev tools
    win.webContents.openDevTools();

    //when window is closed
    win.on('closed', function () {
        win = null;
    })
}

//create app on electron initialization
app.when('ready', createWindow);

//quit when all windows are closed
app.on('window-all-closed', function () {
    // On macOS specific close process  
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
app.on('activate', function () {
    // macOS specific close process  
    if (win === null) {
        createWindow()
    }
})  