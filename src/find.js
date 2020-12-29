// 引入模块
import { remote, ipcRenderer } from 'electron'
import { FindInPage } from 'electron-find'
 
// 使用默认配置来创建实例
// let findInPage = new FindInPage(remote.getCurrentWebContents())
// findInPage.openFindWindow()
 
// 开启预加载选项，创建实例的时候会同时加载查找窗口相关dom
// let findInPage = new FindInPage(remote.getCurrentWebContents(), {
//   preload: true
// })
// findInPage.openFindWindow()
 
// 配置父节点元素, 默认为 document.body
// let findInPage = new FindInPage(remote.getCurrentWebContents(), {
//   parentElement: document.querySelector('//id')
// })
// findInPage.openFindWindow()
 
// 配置查找窗口显示或隐藏的过渡周期, 默认为 300 (ms)
// let findInPage = new FindInPage(remote.getCurrentWebContents(), {
//   duration: 200
// })
// findInPage.openFindWindow()
// 配置查找窗口相对于父级定位节点的偏移量
let findInPage = new FindInPage(remote.getCurrentWebContents(), {
    offsetTop: 20,
    offsetRight: 10000
})
findInPage.openFindWindow()
 
// 自定义UI界面颜色
// let findInPage = new FindInPage(remote.getCurrentWebContents(), {
//   boxBgColor: '//333',
//   boxShadowColor: '//000',
//   inputColor: '//aaa',
//   inputBgColor: '//222',
//   inputFocusColor: '//555',
//   textColor: '//aaa',
//   textHoverBgColor: '//555',
//   caseSelectedColor: '//555'
// })
// findInPage.openFindWindow()
