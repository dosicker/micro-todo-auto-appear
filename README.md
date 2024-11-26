**简体中文** | [English](./README-en_US.md)

## 这是什么？

**Micro todo auto appear**是一个基于[Plasmo](https://docs.plasmo.com/)而成的浏览器扩展（插件）。

## 能做什么？

<video controls="true" autoplay="false" name="media"><source src="./demo/video/What it can do.mp4" type="video/mp4"></video>

<!-- https://github.com/user-attachments/assets/c3136d8a-9c68-47b6-96a9-616e2a92ccf1 -->

<!-- https://raw.githubusercontent.com/dosicker/micro-todo-auto-appear/main/demo/video/What%20it%20can%20do.mp4 -->

在使用[Microsoft To Do](https://to-do.live.com)时，它能支持日/夜间模式的自动切换（因为**沙雕微软只做到支持切换，并未支持跟随系统外观模式来切换**）。

- [x] ✅自动跟随系统外观模式
- [x] ✅工具栏扩展程序面板快捷切换
- [x] ✅非自编样式适应，跟随官方原生日/夜间模式
- [ ] 更多浏览器支持
- [ ] 多语言支持
- [ ] 其他Web支持，如：[Google Gemini](https://gemini.google.com/app) 等...
- [ ] 更完整的，丰富式使用~

## 环境（浏览器）支持

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari |
| --------- | --------- | --------- | --------- |
| ❌| ❌| ✅last 2 versions| ❌

## 使用

1、进入 [Releases](https://github.com/dosicker/micro-todo-auto-appear/releases/latest) 页下载最新版，或👉[直接点我前往](https://github.com/dosicker/micro-todo-auto-appear/releases/latest)；
> Chrome对应主包，其他浏览器需根据对应的浏览器名后缀来下载使用，如：xxx-edge（Microsoft Edge浏览器）、xxx-Firefox（火狐浏览器），其他以此类推。

2、下载对应的扩展包之后，解压至单独文件夹内，打开对应的浏览器，如Chrome：
> 右上角“扩展程序” > “管理扩展程序” > 打开右上角的“开发者模式”开关 > 点击左上角处的“加载已解压的扩展程序”，选择刚刚解压出来的单独文件夹即可 Enjoy it~

根据上述文字仍存有疑问或操作不明白，可以跟着上面的视频结合文字一起来，还不行？看看这个文章（其他浏览器未兼容到的未进行测试，如果有兴趣，也可以看看）：[油小猴工具箱 · 如何安装浏览器扩展？](https://www.youxiaohou.com/zh-cn/crx.html)

> [!CAUTION]
> 请注意对应你自己的浏览器版本！

**在使用过程中如果遇到问题，可以前往 [issues](https://github.com/dosicker/micro-todo-auto-appear/issues) 提出你的问题情况，按照以下规范：**

> 例：<br />
> 你的系统设备是？
> Windows 10 22H2<br />
> 你的浏览器是？
> Google Chrome<br />
> 浏览器版本号是？
> 119.0.6045.200<br />
> 你的问题是？
> 安装扩展后，且开启了跟随系统外观，但是页面不会自动切换日/夜间模式。（尽量详细每一个步骤）

## 开发指南

本项目基于 [Plasmo](https://docs.plasmo.com/) 而成，请确保对该文档所提到的技术栈使用有一定的掌握，另外还需要你能对[浏览器扩展程序相关开发](https://developer.chrome.com/docs/extensions/get-started)也有一定的了解。

其外只需要根据文档食用即可：

- Chrome Manifest API
- Chrome Manifest V3/V2
- Chrome Manifest Permissions
- Plasmo：
  - typescript@5.3.3
  - react@18.2.0
  - unocss@0.64.1
  - @plasmohq/storage@1.13.0
- 环境工具：
  - Node.js v16+（推荐）
  - pnpm@8+（推荐）
  - Visual Studio Code（推荐）

### 项目结构

```
micro-todo-auto-appear
├── assets  # 静态资源
├── background  # 扩展后台服务程序
├── build  # 编译输出文件夹
├── contents  # 网页所执行的脚本
├── popup  # 扩展栏弹窗页面
├── postcss.config.mjs  # PostCSS配置（与UnoCSS结合）
├── uno.config.ts  # UnoCSS的配置文件
└── utils  # 常用工具函数和外观模式控制器
```

### 一起来完善
```bash
# 1、依赖
pnpm install

# 2、查看或配置对应的环境变量
.env.xxx

# 3、启动！
pnpm  dev

# 4、对应目录在浏览器管理扩展中 > 打开开发者模式 > 点击“加载已解压的扩展程序”
选择到当前目录下：build > chrome-mv3-dev

# 打包使用
pnpm build
# or
pnpm build --zip
# 针对特殊浏览器环境打包
# 例：plasmo build --target=firefox-mv2
# 其他版本构建详细可看：https://docs.plasmo.com/framework/workflows/build
```


## 支持项目

它能给你带来便利的话，考虑请开发者喝杯咖啡吗？

<p>
  <img src="./demo/assets/donation/wechatpay_donate.jpg" alt="微信打赏" width="350" />
  <img src="./demo/assets/donation/alipay_donate.jpg" alt="支付宝打赏" width="350" />
</p>

谢谢！！！

## 其他

感谢Star！欢迎PR！