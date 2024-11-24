import type { PlasmoCSConfig } from "plasmo";
import { Storage } from "@plasmohq/storage"
import { syncThemeWithDevice, toggleAppear } from "~utils/theme-manager";

const storage = new Storage();
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

export const config: PlasmoCSConfig = {
  matches: ["https://to-do.live.com/*"]
}

if (process.env.NODE_ENV === "development") {
  console.log("This is a development build")
}

// 初始化并同步外观模式
const initialize = async () => {
  const autoAppear = await storage.get('AutoSystemAppearFlag')
  console.log("🚀 ~ file: index.ts:19 ~ initialize ~ autoAppear:", autoAppear)
  if (autoAppear) {
    syncThemeWithDevice();
    mediaQuery.addEventListener('change', syncThemeWithDevice);
  }

  chrome.runtime.onMessage.addListener((message: any, sender, sendResponse) => {
    console.log(message);

    const { AppearMsg } = message

    sendResponse("接收到了你的值：" + message)

    if (AppearMsg === 'toggle') toggleAppear()
    else if (AppearMsg === true) initialize()
    else mediaQuery.removeEventListener('change', syncThemeWithDevice)
  })
}

// initialize()
window.addEventListener('load', initialize)