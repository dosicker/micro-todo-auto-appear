import { useState } from "react"
import { handleForwardTodo } from "~content/index";
import "./index.css"

function IndexPopup() {
  const [data, setData] = useState("")

  return (
    <div className="container">
      <div>
        <a style={{ whiteSpace: "nowrap" }} href={process.env.PLASMO_PUBLIC_SITE_URL} target="_blank"
          rel="noopener noreferrer" onClick={e => handleForwardTodo(e)}>Go My Todo</a>
          <ul className="list-none">
            <li>切换夜间模式</li>
          </ul>
      </div>
      {/* <input onChange={(e) => setData(e.target.value)} value={data} />
      <a href="https://docs.plasmo.com" target="_blank">
        View Docs
      </a> */}
    </div>
  )
}

export default IndexPopup
