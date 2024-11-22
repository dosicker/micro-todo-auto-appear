import type { PlasmoCSConfig } from "plasmo";

export const config: PlasmoCSConfig = {
  matches: ["$PLASMO_PUBLIC_SITE_URL/"]
}

if (process.env.NODE_ENV === "development") {
  console.log("This is a development build")
}

export function handleForwardTodo(e: React.MouseEvent<Element, MouseEvent>) {
  console.log(chrome.tabs);
  chrome.tabs.query({ currentWindow: true }, tabs => {
    console.log("🚀 ~ file: popup.tsx:29 ~ IndexPopup ~ tab:", tabs)
    const targetUrl = process.env.PLASMO_PUBLIC_SITE_URL
    for (const tab of tabs) {
      if (tab.url?.indexOf(targetUrl) > -1) {
        chrome.tabs.update(tab.id, { active: true }, () => {
          avtiveTodoPage(tab.id)
        })
        break;
      }
    }
  })
  e.preventDefault()
}

export function settingTheme() {
  // const xhr = new XMLHttpRequest()
  // xhr.open("PATCH", "https://substrate.office.com/todob2/api/v1/settings/DarkMode", true)
  // xhr.setRequestHeader('Conten-Type', 'application/x-www-form-urlencoded')
  // xhr.send(JSON.stringify({ Key: "DarkMode", Value: "true" }))
  // xhr.onreadystatechange = () => {
  //   console.log(xhr);
  // }
}

function avtiveTodoPage(tabId: number) {
  chrome.scripting.executeScript({
    target: { tabId },
    func: ContentScript
  })
}

// 主逻辑入口
function ContentScript() {
  const appearDarkThemeFlag = window.matchMedia('(prefers-color-scheme: dark)').matches
  const htmlElement = document.documentElement

  if (appearDarkThemeFlag) htmlElement.setAttribute("data-theme", "dark")
  else htmlElement.setAttribute("data-theme", "default")

  // const storage = new Storage()
  // const auth = await storage.get('todo-auth-context')
  const auth = JSON.parse(localStorage.getItem("todo-auth-context"))
  console.log("🚀 ~ file: index.ts:45 ~ ContentScript ~ auth:", auth)

  // step 2：
  fetch('https://substrate.office.com/todob2/api/v1/settings/DarkMode', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + auth.syncToken
    },
    body: JSON.stringify({
      Key: 'DarkMode',
      Value: true
    })
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
    const script = document.createElement('script');
    script.src = 'https://res-1.cdn.office.net/shellux/suiteux.shell.themeplus.f43620619108ace403e1.js';
    document.body.appendChild(script);
  }).catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
  });

  fetch('https://consumer.suite.office.com/api/settings/darkmode', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify({
      Key: 'IsDarkmode',
      Value: true
    })
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

  console.log('当前页是微软待办页哦~~~');
}