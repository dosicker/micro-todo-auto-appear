import { Storage } from "@plasmohq/storage"
import { handleForwardTodo } from "~utils/index"

console.log("HELLO WORLD FROM BGSCRIPTS")

class Context {
  localStorageData: string = "default"
  storage: any = new Storage()
  constructor() {
    // TODO：安装扩展后即刻触发
    this.init()
    this.relodPage()
  }
  init() {
    chrome.runtime.onInstalled.addListener(async () => {
      handleForwardTodo()
      // this.func()
    })
    chrome.runtime.onUpdateAvailable.addListener(
      function () {
        chrome.runtime.reload()
      }
    )
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      sendResponse("background message：" + message)
    })
  }
  relodPage() {
    chrome.tabs.query({}, (tabs) => {
      const targetUrl = process.env.PLASMO_PUBLIC_SITE_URL
      for (const tab of tabs) {
        try {
          if (tab.url?.indexOf(targetUrl) > -1) {
            chrome.tabs.reload(tab.id)
            break;
          }
        } catch (e) {
          console.log("error", e)
        }
      }
    })
  }
  // private func() { }
}

new Context()