[简体中文](./README.md) | **English**

## What is this?

**Micro todo auto appear** is a browser extension (plug-in) based on [Plasmo](https://docs.plasmo.com/).

## What can it do?

https://github.com/user-attachments/assets/c3136d8a-9c68-47b6-96a9-616e2a92ccf1

When using [Microsoft To Do](https://to-do.live.com), it can support automatic switching of day/night mode (because **Microsoft only supports switching, but does not support switching according to the system appearance mode**).

- [x] ✅Automatically follow the system appearance mode
- [x] ✅Toolbar extension panel quick switch
- [x] ✅Non-self-edited style adaptation, follow the official native day/night mode
- [ ] More browser support
- [ ] Multi-language support
- [ ] Other web support, such as: [Google Gemini](https://gemini.google.com/app) etc...
- [ ] More complete, rich use~

## Environment (browser) support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari |
| --------- | --------- | --------- | --------- |
| ❌| ❌| ✅last 2 versions| ❌

## Usage

1. Go to the [Releases](https://github.com/dosicker/micro-todo-auto-appear/releases/latest) page to download the latest version, or 👉[Click me directly](https://github.com/dosicker/micro-todo-auto-appear/releases/latest);
> Chrome corresponds to the main package, and other browsers need to be downloaded and used according to the corresponding browser name suffix, such as: xxx-edge (Microsoft Edge browser), xxx-Firefox (Firefox browser), and so on.

2. After downloading the corresponding extension package, unzip it to a separate folder and open the corresponding browser, such as Chrome:
> "Extensions" in the upper right corner > "Manage Extensions" > Turn on the "Developer Mode" switch in the upper right corner > Click "Load Unzipped Extensions" in the upper left corner, select the separate folder you just unzipped and enjoy it~

If you still have questions or don't understand the operation based on the above text, you can follow the video above in combination with the text. Still not enough? Check out this article (other browsers that are not compatible have not been tested, if you are interested, you can also take a look): [Oil Monkey Toolbox · How to install browser extensions? ](https://www.youxiaohou.com/zh-cn/crx.html)

> [!WARNING]
> Please pay attention to your own browser version!

<br />

**If you encounter problems during use, you can go to [issues](https://github.com/dosicker/micro-todo-auto-appear/issues) to raise your problem, according to the following specifications:**

> Example:<br />
> What is your system device?
> Windows 10 22H2<br />
> What is your browser?
> Google Chrome<br />
> What is the browser version number?
> 119.0.6045.200<br />
> What is your problem?
> After installing the extension and turning on the system appearance, the page will not automatically switch to day/night mode. (Try to be as detailed as possible for each step)

## Development Guide

This project is based on [Plasmo](https://docs.plasmo.com/). Please make sure that you have a certain grasp of the technology stack mentioned in the document. In addition, you need to have a certain understanding of [browser extension related development](https://developer.chrome.com/docs/extensions/get-started).

Other than that, you only need to follow the documentation:

- Chrome Manifest API
- Chrome Manifest V3/V2
- Chrome Manifest Permissions
- Plasmo:
  - typescript@5.3.3
  - react@18.2.0
  - unocss@0.64.1
  - @plasmohq/storage@1.13.0
- Environment tools:
  - Node.js v16+ (recommended)
  - pnpm@8+ (recommended)
  - Visual Studio Code (recommended)

### Project structure

```
micro-todo-auto-appear
├── assets # static resources
├── background # extension background service program
├── build # compilation output folder
├── contents # scripts executed by the web page
├── popup # extension bar pop-up page
├── postcss.config.mjs # PostCSS configuration (combined with UnoCSS)
├── uno.config.ts # UnoCSS configuration file
└── utils # Common tool functions and appearance mode controllers
```

### Let's improve together
```bash
# 1. Dependencies
pnpm install

# 2. View or configure the corresponding environment variables
.env.xxx

# 3. Start!
pnpm dev

# 4. The corresponding directory is in the browser management extension > Open developer mode > Click "Load unzipped extension"
Select the current directory: build > chrome-mv3-dev

# Package use
pnpm build
# or
pnpm build --zip
# Package for special browser environments
# Example: plasmo build --target=firefox-mv2
# For details on other versions of the build, see: https://docs.plasmo.com/framework/workflows/build
```

## Support projects

If it brings you convenience, would you consider buying the developer a cup of coffee?

<p>
<img src="./demo/assets/donation/wechatpay_donate.jpg" alt="WeChat Reward" width="350" />
<img src="./demo/assets/donation/alipay_donate.jpg" alt="Alipay Reward" width="350" />
</p>

Thank you! ! !

## Others

Thanks for Star! PR is welcome!