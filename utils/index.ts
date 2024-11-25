import { useRef } from "react";
import { Storage } from "@plasmohq/storage"

const storage = new Storage()

/**
 * 获取当前活动聚焦的Tab页对象
 * @returns promise {tab}
 */
interface Tab {
  id?: number,
  url?: string
}
export function getCurrentActiveTab(): Promise<Tab> {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      resolve(tabs[0])
    })
  })
}

/**
 * 查询当前活动聚焦的Tab页是否为微软待办（Todo）
 * @returns promise {true：微软待办页；false：其他页面}
 */
export async function getActiveTabMatchFlag(): Promise<boolean> {
  const activeTab = await getCurrentActiveTab();
  const targetUrl = process.env.PLASMO_PUBLIC_SITE_URL
  console.log("🚀 ~ file: index.ts:29 ~ getActiveTabMatchFlag ~ activeTab:", activeTab)

  return activeTab.url?.indexOf(targetUrl) > -1

  // return new Promise((resolve, reject) => {
  //   chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
  //     const activeTab = tabs[0];
  //     const targetUrl = process.env.PLASMO_PUBLIC_SITE_URL

  //     resolve()
  //   })
  // })
}

/**
 * 获取当前页面的外观模式
 * @returns {string} "dark"：夜间模式；""或"default"：正常（日间）模式
 */
export const getWebAppear = () => {
  const appearMode = document.documentElement.getAttribute("data-theme")

  return appearMode ? appearMode : 'default'
}

/**
 * 获取当前设备的外观模式
 * @returns promise {dark：夜间模式；default：日间模式}
 */
export function getCurrentSystemAppear(): string {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'default'
}

/**
 * TODO：
 * 1、加多一个callback参数，以支持回调函数传入执行
 * 2、需判断当前浏览器是否已打开 https://to-do.live.com tab页，是：跳转；否：基于该链接打开新标签页面
 * @param e 
 */
export function handleForwardTodo(e?: React.MouseEvent<Element, MouseEvent>) {
  console.log(chrome.tabs);
  chrome.tabs.query({ currentWindow: true }, tabs => {
    console.log("🚀 ~ file: popup.tsx:29 ~ IndexPopup ~ tab:", tabs)
    const targetUrl = process.env.PLASMO_PUBLIC_SITE_URL
    for (const tab of tabs) {
      if (tab.url?.indexOf(targetUrl) > -1) {
        chrome.tabs.update(tab.id, { active: true }, () => {
          console.log('跳转到微软待办页啦！！！');

          // avtiveTodoPage()
        })
        break;
      }
    }
  })
  e && e.preventDefault()
}

// export async function avtiveTodoPage() {
//   const currentTab = await getCurrentActiveTab()
//   console.log(document.documentElement);

//   console.log("🚀 ~ file: index.ts:101 ~ avtiveTodoPage ~ currentTab:", currentTab)

//   chrome.scripting.executeScript({
//     target: { tabId: currentTab.id },
//     func: ContentScript
//   })
// }

/**
 * 函数防抖
 * @param fn 功能函数（需要进行防抖的函数）
 * @param delay 防抖延迟时长（ms）
 * @param immediate 是否立即执行
 * @returns 
 */
interface Debounce {
  fn: Function,
  timer: null | NodeJS.Timeout
}
export const useDebounce = (fn, delay = 500, immediate = false) => {
  const { current } = useRef<Debounce>({ fn, timer: null })
  return function () {
    const _this = this
    const args = arguments
    if (current.timer) {
      clearTimeout(current.timer)
      current.timer = null
    }
    if (immediate) {
      let callNow = !current
      current.timer = setTimeout(() => {
        current.timer = null
      }, delay)
      callNow && current.fn.apply(_this, args)
    } else {
      current.timer = setTimeout(() => {
        current.fn.apply(_this, args)
      }, delay)
    }
  }
}

/**
 * 获取是否已开启“跟随系统外观”
 * @returns {promise} undefined或true：已开启；false：未开启
 */
export const getStorageAutoSystemAppear = async (): Promise<boolean> => {
  const val = await storage.get("AutoSystemAppearFlag") as boolean

  return val === void 0 ? true : val
}