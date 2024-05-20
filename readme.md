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
  - [注意事项](#注意事项)
  - [Todo](#todo)
  - [感谢](#感谢)
  - [借鉴](#借鉴)
  - [License](#license)

## 功能

- 基础功能:

  <details>

    <summary>KBotTwitter 推特订阅相关功能</summary>

    **订阅/删除**: 订阅/删除推特博主

    **查看最新动态**: 查看推特博主最新动态

    **查看订阅列表**: 查看订阅的推特博主列表
  </details>

## 安装

1. 下载插件运行平台 [Koishi](https://koishi.chat/)
2. 在插件平台的 **`插件市场`** 中搜索 **`edison`** 并安装

## 使用方法


1. 推特订阅功能

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

## 感谢

- [koishi-plugin-kbot](https://github.com/Kabuda-czh/koishi-plugin-kbot)

## 赞助

- [爱发电](https://afdian.net/a/kbd-dev)