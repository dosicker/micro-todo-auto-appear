import { useState } from "react"

function IndexPopup() {
  const [data, setData] = useState("")

  return (
    <div>
      <div>
        <a style={{ whiteSpace: "nowrap" }} href="https://to-do.live.com/tasks/myday" target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            console.log(chrome.tabs);
            chrome.tabs.query({ currentWindow: true }, tabs => {
              console.log("🚀 ~ file: popup.tsx:29 ~ IndexPopup ~ tab:", tabs)
              const targetUrl = 'to-do.live.com'
              for (const tab of tabs) {
                if (tab.url?.indexOf(targetUrl) > -1) {
                  chrome.tabs.update(tab.id, { active: true })
                  break;
                }
              }
            })
            e.preventDefault()
          }}>Go My Todo</a>
      </div>
      {/* <input onChange={(e) => setData(e.target.value)} value={data} />
      <a href="https://docs.plasmo.com" target="_blank">
        View Docs
      </a> */}
    </div>
  )
}

export default IndexPopup
