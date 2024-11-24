import { useState, useEffect } from "react"
// import { Storage } from "@plasmohq/storage"
import { useStorage } from "@plasmohq/storage/hook"
import { getWebAppear, handleForwardTodo, getCurrentActiveTab, getActiveTabMatchFlag } from "~utils/index"
// import { swichTheme } from "~utils/theme-manager";
import "./index.css"

function IndexPopup() {
  const [activeTabFlag, setActiveTabFlag] = useState(false)
  // const [autoFollowSystemFlag, setAutoFollowSystemFlag] = useState(false)
  const [autoFollowSystemFlag, setAutoFollowSystemFlag] = useStorage("AutoSystemAppearFlag", false)

  const [webAppear, setWebAppear] = useStorage("WebAppear", getWebAppear())

  // const storage = new Storage()

  useEffect(() => {
    const effectActiveTabFlag = async () => {
      const flag = await getActiveTabMatchFlag() as boolean
      setActiveTabFlag(flag)
    }

    effectActiveTabFlag()
  }, [])

  useEffect(() => {
    console.log("🚀 ~ file: index.tsx:26 ~ useEffect ~ autoFollowSystemFlag:", autoFollowSystemFlag)
  }, [autoFollowSystemFlag])

  // 开启/关闭“跟随系统外观”切换主题
  const handleAutoFollowAppear = async e => {
    const flag = e.target.checked
    console.log("🚀 ~ file: index.tsx:27 ~ handleAutoFollowAppear ~ flag:", flag)

    setAutoFollowSystemFlag(flag)
    // PS: 这里存在一个问题就是如果使用了useStorage的hook去setStorage
    // 然后紧接着就想打印查看这个hook提供的值的话，是存在一个异步更新的问题，它会以上一次的值返回并显示出来
    // console.log(autoFollowSystemFlag);

    // 而这里直接去使用非hook形式的获取方式则可以获取到当前已更新的最新值
    // 那么在这里可以判断hook方法内部的值（在获取层面getter）更新是存在问题
    // console.log(await storage.get("autoFollowSystemAppear"));

    const currentTab = await getCurrentActiveTab()
    console.log("🚀 ~ file: index.tsx:45 ~ handleAutoFollowAppear ~ currentTab:", currentTab)

    chrome.tabs.sendMessage(currentTab.id, { AppearMsg: flag }, e => {
      console.log("🚀 ~ file: index.tsx:48 ~ handleAutoFollowAppear ~ e:", e)
      // setWebAppear(getWebAppear())
    })
  }

  const handleSwitchAppear = async e => {
    if (autoFollowSystemFlag) return

    console.log("🚀 ~ file: index.tsx:57 ~ handleSwitchAppear ~ webAppear:", webAppear)

    setWebAppear(webAppear == 'default' ? 'dark' : 'default')

    const currentTab = await getCurrentActiveTab()
    chrome.tabs.sendMessage(currentTab.id, { AppearMsg: 'toggle' }, e => {
      console.log("🚀 ~ file: index.tsx:63 ~ handleSwitchAppear ~ e:", e)
    })
  }

  return (
    <div className="container min-w-36 bg-[rgba(223, 222, 222, .75)]">
      {/* <div> */}
      <ul className="w-full list-none p-0 m-0 font-medium cursor-pointer">
        {
          activeTabFlag ? (
            <>
              <li className="w-full px-4 py-2 hover:bg-sky-100 flex items-center">
                <label className="relative inline-flex cursor-pointer items-center mr-1">
                  <input id="switch" type="checkbox" className="peer sr-only" checked={autoFollowSystemFlag} onChange={e => handleAutoFollowAppear(e)} />
                  <label htmlFor="switch" className="hidden"></label>
                  <div className="peer h-4 w-8 rounded-full border bg-slate-200 after:absolute after:left-[3px] after:top-0.5 after:h-3 after:w-3 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-slate-800 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-green-300"></div>
                </label>
                跟随系统外观
              </li>
              <li className={`w-full px-4 py-2 ${autoFollowSystemFlag ? 'text-gray-500 cursor-not-allowed' : 'hover:bg-sky-100'}`}
                onClick={handleSwitchAppear}>切换{webAppear == 'dark' ? '日' : '夜'}间模式</li>
            </>
          ) : (
            <li className="w-full p-4" onClick={e => handleForwardTodo(e)}>前往Todo（Go My Todo）</li>
          )
        }
      </ul>
      {/* </div> */}
    </div>
  )
}

export default IndexPopup
