<div align="center">

# Edison

![NodeJs Version](https://img.shields.io/badge/NodeJs-18-blue)

基于 [koishi](../../../../koishijs/koishi) 和 Kbot 的 [QQ](../../../../Mrs4s/go-cqhttp) 机器人

</div>

---

- **koishi-plugin-edison**
  - [功能](#功能)
  - [安装](#安装)
  - [使用方法](#使用方法)
  - [Todo](#todo)
  - [感谢](#感谢)

## 功能

- 基础功能:

  <details>

    <summary> 推特订阅相关功能</summary>

    **订阅/删除**: 订阅/删除推特博主

    **查看最新动态**: 查看推特博主最新动态

    **查看订阅列表**: 查看订阅的推特博主列表
  </details>

## 安装

1. 下载插件运行平台 [Koishi](https://koishi.chat/)
2. 在插件平台的 **`插件市场`** 中搜索 **`edison`** 并安装

## 使用方法

1. 首先需要获取Twitter Api使用权限：
 - 申请开发者账号
 - 创建一个新的应用
 - 如果是富豪，请使用这个方法：
   - 氪金开通Basic Access以上的包月套餐并按照官网正常流程获取Bearer Key
 - 但如果你很穷，使用临时方法：
   - 打开[Twitter API Playground](https://oauth-playground.glitch.me/?id=usersIdTweets&params=%28%27id%21%27114514%27%29_)
   - 点击Run并跳转到授权页面，点击 **授权应用** 按钮
   - 返回到API Playground页面，点击右边的 **Details** 按钮（图标显示3个小点）
   - 打开 **Include access token** 开关，并复制 **cURL** 一栏中 **Bearer** 后的token

注意使用临时方法的话每两小时token就会过期，之后会想办法解决这个问题。

2. 在群聊中使用推特订阅功能

    - 订阅: `twitter -a <userId>`
      - 参数说明: `userId` 为必填参数, 为 `博主` 的 **@后的字符串**
      - 例如:
        - `twitter -a xxx` 订阅 **twitterId** 为 `@xxx` 的 `博主`
    - 删除: `twitter -r <userId>`
      - 参数说明: `userId` 为必填参数, 为 `博主` 的 **@后的字符串**
      - 例如:
        - `twitter -r xxx` 删除 **twitterId** 为 `@xxx` 的 `博主`
    - 查看最新动态: `twitter -s <userId>`
      - 参数说明: `userId` 为必填参数, 为 `博主` 的 **@后的字符串**
      - 例如:
        - `twitter -s xxx` 查看 **twitterId** 为 `@xxx` 的 `博主` 的最新动态
    - 查看订阅列表: `twitter -l`
      - 参数说明: 无

## Todo

- [ ] 自动化爬取 API Playground 的 token
- [ ] 抓取推文图片和视频

## 感谢

- [koishi-plugin-kbot](https://github.com/Kabuda-czh/koishi-plugin-kbot): 本插件在kbot基础上修改而来