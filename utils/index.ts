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
export async function getActiveTabMatchFlag() {
  const activeTab = await getCurrentActiveTab();
  const targetUrl = process.env.PLASMO_PUBLIC_SITE_URL

  return activeTab.url.indexOf(targetUrl) > -1

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

export function handleForwardTodo(e: React.MouseEvent<Element, MouseEvent>) {
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
  e.preventDefault()
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