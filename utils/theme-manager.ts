import { Storage } from "@plasmohq/storage"
import { getCurrentSystemAppear, getCurrentActiveTab } from "./index"

const storage = new Storage();

// step 1：设置根节点主题色
const settingDomTheme = (theme: string | "default") => {
  document.documentElement.setAttribute("data-theme", theme)
}

// step 2&3：请求主题配置
function fetchConfigTheme(theme: string) {
  const auth = JSON.parse(localStorage.getItem("todo-auth-context"))
  console.log("🚀 ~ file: theme-manager.ts:9 ~ fetchConfigTheme ~ auth:", auth)

  fetch('https://substrate.office.com/todob2/api/v1/settings/DarkMode', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + auth.syncToken
    },
    body: JSON.stringify({
      Key: 'DarkMode',
      Value: theme == 'dark'
    }),
    credentials: "include"
  }).then(response => {
    if (!response.ok) {
      console.error('Network response was not ok');
      return;
    }
    return response.json();
  }).then(data => {
    console.log('Success:', data);
    // step 3：
    // 动态加载并执行脚本
    // const script = document.createElement('script');
    // script.src = 'https://res-1.cdn.office.net/shellux/suiteux.shell.themeplus.f43620619108ace403e1.js';
    // document.body.appendChild(script);
  }).catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });
}

// step 4：上报当前主题模式
function fetchReportConfigTheme(theme: string) {
  fetch('https://consumer.suite.office.com/api/settings/darkmode', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
      Key: 'IsDarkmode',
      Value: theme == 'dark'
    }),
    credentials: "include"
  }).then(response => {
    if (!response.ok) {
      console.error('Network response was not ok');
      return;
    }
    return response.json();
  }).then(data => {
    console.log('Success:', data);
  }).catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });
}


/**
 * 根据设备模式切换深色/浅色主题
 */
export const syncThemeWithDevice = async () => {
  console.log("跟随系统外观啦~");

  const sysAppear = getCurrentSystemAppear();
  const webAppear = await storage.get("WebAppear")
  if (sysAppear != webAppear) {
    settingDomTheme(sysAppear);
    await fetchConfigTheme(sysAppear);
    storage.set("WebAppear", sysAppear)
    // await fetchReportConfigTheme(sysAppear);
  }
}

// 手动切换外观主题
export const toggleAppear = async () => {
  console.log("手动切换外观啦~");
  // const appear = getCurrentSystemAppear() == 'default' ? 'dark' : 'default'
  const appear = await storage.get("WebAppear")
  settingDomTheme(appear);
  await fetchConfigTheme(appear);
}

// export const swichTheme = async () => {
//   const activeTab = await getCurrentActiveTab();

//   chrome.scripting.executeScript({
//     target: { tabId: activeTab.id },
//     func: mainTheme
//   })
// }