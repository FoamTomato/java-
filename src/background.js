'use strict'

import { app, protocol, BrowserWindow,ipcMain,BrowserView } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
// import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    frame: false,
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      webviewTag:true,
      enableRemoteModule: true
    }
  })

  win.setBackgroundColor("#fff")
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
  ipcMain.on('close',()=>{
    // 退出应用程序
    app.exit()
  })

  const defaultSize = { x: 130, y: 30, width: 894, height: 770}

  var view = null
  var view2 = null
  var view3 = null
  var view4 = null
  var view5 = null

  ipcMain.on('five',()=>{
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    if(view==null){
      view= new BrowserView()   //new出对象
      view.setAutoResize({ width: true, height: true})
      view.webContents.loadURL('https://www.j-platpat.inpit.go.jp/')
    }
    defaultSize["width"]=win.getSize()[0]-130
    defaultSize["height"]=win.getSize()[1]-50
    view.setBounds(defaultSize)
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    win.setBrowserView(view)
  })
  
  ipcMain.on('six',()=>{
    
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    if(view2==null){
      view2 = new BrowserView()   //new出对象
      view2.setAutoResize({ width: true, height: true})
      view2.webContents.loadURL('https://euipo.europa.eu/eSearch/#basic')
    }
    defaultSize["width"]=win.getSize()[0]-130
    defaultSize["height"]=win.getSize()[1]-50
    view2.setBounds(defaultSize)
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    win.setBrowserView(view2)
  })
  ipcMain.on('seven',()=>{
  
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    if(view3==null){
      view3 = new BrowserView()   //new出对象
      view3.setAutoResize({ width: true, height: true})
      view3.webContents.loadURL('https://trademarks.ipo.gov.uk/ipo-tmtext')
    }
    defaultSize["width"]=win.getSize()[0]-130
    defaultSize["height"]=win.getSize()[1]-50
    view3.setBounds(defaultSize)
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    win.setBrowserView(view3)
  })

  ipcMain.on('eight',()=>{
  
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    if(view4==null){
      view4 = new BrowserView()   //new出对象
      view4.setAutoResize({ width: true, height: true})
      view4.webContents.loadURL('http://151.207.240.78:80/bin/gate.exe?f=login&p_lang=english&p_d=trmk',{userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36',httpReferrer:"http://151.207.240.78"})
    }
    defaultSize["width"]=win.getSize()[0]-130
    defaultSize["height"]=win.getSize()[1]-50
    view4.setBounds(defaultSize)
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    win.setBrowserView(view4)
  })

  ipcMain.on('nine',()=>{
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    if(view5==null){
      view5 = new BrowserView()   //new出对象
      view5.setAutoResize({ width: true, height: true})
      view5.webContents.loadURL('http://www.ic.gc.ca/app/opic-cipo/trdmrks/srch/home?lang=eng')
    }
    defaultSize["width"]=win.getSize()[0]-130
    defaultSize["height"]=win.getSize()[1]-50
    view5.setBounds(defaultSize)
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    win.setBrowserView(view5)
  })

  ipcMain.on('closeView',()=>{
    win.setBrowserView(null)
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
const os = require("os");
const isWin7 = os.release().startsWith('6.1');
if(isWin7) {
  //win7下 ，关闭硬件加速
  app.disableHardwareAcceleration();
}
app.on('ready', async () => {
  // if (isDevelopment && !process.env.IS_TEST) {
  //   // Install Vue Devtools
  //   try {
  //     await installExtension(VUEJS_DEVTOOLS)
  //   } catch (e) {
  //     console.error('Vue Devtools failed to install:', e.toString())
  //   }
  // }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
