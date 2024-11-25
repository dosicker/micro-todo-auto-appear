import type { PlasmoCSConfig } from "plasmo";
// import { Storage } from "@plasmohq/storage"
import { syncThemeWithDevice, toggleAppear } from "~utils/theme-manager";
import { getStorageAutoSystemAppear } from "~utils/index";

// const storage = new Storage();
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

export const config: PlasmoCSConfig = {
  matches: ["https://to-do.live.com/*"]
}

if (process.env.NODE_ENV === "development") {
  console.log("This is a development build")
}

// 初始化并同步外观模式
const initialize = async () => {
  const autoAppear = await getStorageAutoSystemAppear()
  console.log("🚀 ~ file: index.ts:20 ~ initialize ~ autoAppear:", autoAppear)
  if (autoAppear) {
    syncThemeWithDevice();
    mediaQuery.addEventListener('change', syncThemeWithDevice);
  }
}

// const handleBrowserMessage = () => {
chrome.runtime.onMessage.addListener((message: any, sender, sendResponse) => {
  console.log(message);

  const { AppearMsg } = message

  sendResponse("接收到了你的值：" + message)

  if (AppearMsg === 'toggle') toggleAppear()
  else if (AppearMsg === true) initialize()
  else mediaQuery.removeEventListener('change', syncThemeWithDevice)
})
// }

// 脚本初始化加载生效
// document.addEventListener('DOMContentLoaded', () => {
//   initialize()
//   handleBrowserMessage()
// })
window.addEventListener('load', () => {
  initialize()
  // handleBrowserMessage()
})